import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WEATHER_ENDPOINT =
  "https://api.open-meteo.com/v1/forecast?latitude=55.4428&longitude=11.7906&current=temperature_2m&temperature_unit=celsius&timezone=auto";

const buildResponse = (
  payload: Record<string, unknown>,
  status = 200,
  cacheControl = "s-maxage=600, stale-while-revalidate=3600"
) => {
  const response = NextResponse.json(payload, { status });
  response.headers.set("Cache-Control", cacheControl);
  return response;
};

const buildError = (message: string, status = 500) =>
  buildResponse({ error: message }, status, "no-store");

export const GET = async () => {
  try {
    const response = await fetch(WEATHER_ENDPOINT, { cache: "no-store" });

    if (!response.ok) {
      return buildError(`Weather fetch failed (${response.status} ${response.statusText}).`, 500);
    }

    const data = await response.json();
    const temperature = data?.current?.temperature_2m;

    if (typeof temperature !== "number") {
      return buildError("Temperature data is missing.", 500);
    }

    return buildResponse({ temperature, unit: "C", updatedAt: data?.current?.time ?? null });
  } catch (error) {
    return buildError("Weather fetch failed.", 500);
  }
};
