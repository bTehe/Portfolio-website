import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const sanitizeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const sanitizeHeader = (value: unknown) => sanitizeText(value).replace(/[\r\n]+/g, " ");
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
};

const rateLimitStore = (() => {
  const globalScope = globalThis as typeof globalThis & {
    __contactRateLimit?: Map<string, { count: number; resetAt: number }>;
  };
  if (!globalScope.__contactRateLimit) {
    globalScope.__contactRateLimit = new Map();
  }
  return globalScope.__contactRateLimit;
})();

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL ?? "alex04adamov@gmail.com";
  const clientIp = getClientIp(request);
  const now = Date.now();
  const rateEntry = rateLimitStore.get(clientIp);

  if (!rateEntry || now > rateEntry.resetAt) {
    rateLimitStore.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    rateEntry.count += 1;
    if (rateEntry.count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  if (!apiKey) {
    return NextResponse.json({ error: "Missing RESEND_API_KEY." }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const name = sanitizeHeader(body?.name);
  const email = sanitizeHeader(body?.email);
  const message = sanitizeText(body?.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill out all fields." }, { status: 400 });
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const subject = `Portfolio message from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 12px;">New portfolio message</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${safeMessage}</p>
    </div>
  `;

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      reply_to: email,
    }),
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    const payload = { error: "Failed to send message." };
    return NextResponse.json(
      process.env.NODE_ENV === "production" ? payload : { ...payload, details },
      { status: resendResponse.status }
    );
  }

  return NextResponse.json({ ok: true });
}
