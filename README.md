# Portfolio Website

My personal portfolio built with Next.js (App Router). It’s a single-page site with a fixed bio sidebar, scroll-based section reveals, project cards, and a contact form.

## What’s inside

- Smooth UI animations
- Project “Work” cards with hover video previews
- Spotify “top track” card (server-side fetch + embed)
- Contact form that sends emails via Resend
- Weather + live clock widgets

## Tech

Next.js 14, React 18, TypeScript, HLS.js.

## Run locally

1. Install dependencies: `npm install`
2. Create env file: copy `.env.example` to `.env.local` and fill in the values
3. Start dev server: `npm run dev`
4. Open `http://localhost:3000`

## Environment variables

These are server-side only (never commit your `.env.local`).

Spotify:
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

Resend (contact form):
- `RESEND_API_KEY`
- `RESEND_FROM` (example: `Portfolio <onboarding@resend.dev>`)
- `CONTACT_EMAIL` (where messages should be delivered)

## Scripts

- `npm run dev` – local development
- `npm run build` – production build
- `npm run start` – run the production build locally

## Edit content

- Main page: `src/app/page.tsx`
- Global styles: `src/app/globals.css`
- Images/icons/videos: `public/images/`

## Deploy

Because this site uses Next.js API routes (Spotify, weather, contact), deploy it to a platform that supports serverless/Node runtimes (Vercel is the simplest). Add the same env vars in your hosting dashboard.
