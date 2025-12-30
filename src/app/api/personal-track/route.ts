import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1";
const TRACK_CACHE_TTL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 4000;
const TOKEN_EXPIRY_BUFFER_MS = 30 * 1000;

type SpotifyTokenResponse = {
  access_token?: string;
  expires_in?: number;
};

type CachedTrack = {
  payload: Record<string, unknown>;
  expiresAt: number;
};

type CachedToken = {
  token: string;
  expiresAt: number;
};

type TokenResult =
  | {
      accessToken: string;
    }
  | {
      error: string;
      status: number;
      details?: unknown;
    };

const buildResponse = (
  payload: Record<string, unknown>,
  status = 200,
  cacheControl = "s-maxage=3600, stale-while-revalidate=86400"
) => {
  const response = NextResponse.json(payload, { status });
  response.headers.set("Cache-Control", cacheControl);
  return response;
};

const buildError = (message: string, status = 500, details?: unknown) =>
  buildResponse(details ? { error: message, details } : { error: message }, status, "no-store");

const parseErrorBody = async (response: Response) => {
  try {
    const text = await response.text();
    if (!text) return undefined;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch {
    return undefined;
  }
};

const getCaches = () => {
  const globalScope = globalThis as typeof globalThis & {
    __spotifyTrackCache?: CachedTrack;
    __spotifyTokenCache?: CachedToken;
  };

  return globalScope;
};

const fetchWithTimeout = async (input: RequestInfo, init: RequestInit, timeoutMs: number) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

const getAccessToken = async (): Promise<TokenResult> => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const caches = getCaches();

  if (caches.__spotifyTokenCache) {
    const { token, expiresAt } = caches.__spotifyTokenCache;
    if (Date.now() + TOKEN_EXPIRY_BUFFER_MS < expiresAt) {
      return { accessToken: token };
    }
  }

  if (!clientId || !refreshToken) {
    return { error: "Missing Spotify credentials.", status: 500 };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (clientSecret) {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    headers.Authorization = `Basic ${basic}`;
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  body.set("client_id", clientId);

  let tokenRes: Response;
  try {
    tokenRes = await fetchWithTimeout(
      TOKEN_ENDPOINT,
      {
        method: "POST",
        headers,
        body,
        cache: "no-store",
      },
      REQUEST_TIMEOUT_MS
    );
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Spotify token request timed out."
        : "Spotify token request failed.";
    return { error: message, status: 504 };
  }

  if (!tokenRes.ok) {
    const details = await parseErrorBody(tokenRes);
    const code =
      details && typeof details === "object" && "error" in details ? ` (${(details as any).error})` : "";
    return {
      error: `Token refresh failed (${tokenRes.status} ${tokenRes.statusText}).${code}`,
      status: 500,
      ...(details ? { details } : {}),
    };
  }

  const tokenJson = (await tokenRes.json()) as SpotifyTokenResponse;
  if (!tokenJson.access_token) {
    return { error: "Missing access token.", status: 500 };
  }

  if (tokenJson.expires_in) {
    caches.__spotifyTokenCache = {
      token: tokenJson.access_token,
      expiresAt: Date.now() + tokenJson.expires_in * 1000,
    };
  }

  return { accessToken: tokenJson.access_token };
};

export const GET = async () => {
  const caches = getCaches();
  if (caches.__spotifyTrackCache && Date.now() < caches.__spotifyTrackCache.expiresAt) {
    return buildResponse(caches.__spotifyTrackCache.payload, 200, "s-maxage=300, stale-while-revalidate=1800");
  }

  const tokenResult = await getAccessToken();
  if ("error" in tokenResult) {
    if (caches.__spotifyTrackCache) {
      return buildResponse(caches.__spotifyTrackCache.payload, 200, "s-maxage=60, stale-while-revalidate=600");
    }
    return buildError(tokenResult.error, tokenResult.status, tokenResult.details);
  }

  let topRes: Response;
  try {
    topRes = await fetchWithTimeout(
      TOP_TRACKS_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${tokenResult.accessToken}`,
        },
        cache: "no-store",
      },
      REQUEST_TIMEOUT_MS
    );
  } catch (error) {
    if (caches.__spotifyTrackCache) {
      return buildResponse(caches.__spotifyTrackCache.payload, 200, "s-maxage=60, stale-while-revalidate=600");
    }
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Spotify request timed out."
        : "Spotify request failed.";
    return buildError(message, 504);
  }

  if (!topRes.ok) {
    const details = await parseErrorBody(topRes);
    const code =
      details && typeof details === "object" && "error" in details ? ` (${(details as any).error})` : "";
    if (caches.__spotifyTrackCache) {
      return buildResponse(caches.__spotifyTrackCache.payload, 200, "s-maxage=60, stale-while-revalidate=600");
    }
    return buildError(
      `Top tracks fetch failed (${topRes.status} ${topRes.statusText}).${code}`,
      500,
      details
    );
  }

  const topJson = await topRes.json();
  const track = topJson?.items?.[0];

  if (!track) {
    return buildResponse(
      { error: "No top track returned. You may need more listening data." },
      200,
      "no-store"
    );
  }

  const trackId: string = track.id;
  const trackUrl: string = track.external_urls?.spotify ?? "https://open.spotify.com";
  const imageUrl: string | undefined = track.album?.images?.[0]?.url;
  const title: string = track.name ?? "Unknown track";
  const artists: string = Array.isArray(track.artists)
    ? track.artists.map((artist: { name: string }) => artist.name).join(", ")
    : "Unknown artist";
  const album: string = track.album?.name ?? "";
  const embedUrl = trackId ? `https://open.spotify.com/embed/track/${trackId}` : "";

  const payload = {
    trackUrl,
    imageUrl,
    title,
    subtitle: album ? `${artists} - ${album}` : artists,
    embedUrl,
  };

  caches.__spotifyTrackCache = {
    payload,
    expiresAt: Date.now() + TRACK_CACHE_TTL_MS,
  };

  return buildResponse(payload);
};
