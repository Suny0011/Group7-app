# VividForge — Digital media for business (MVP)

A Next.js web app + installable PWA where small businesses brief a campaign and
get AI-drafted social media (headline, caption, hashtags, video script).
Built to deploy on Vercel with the AI key kept safely server-side.


## Run locally
```bash
npm install
cp .env.example .env.local      # then paste the Gemini key
npm run dev                     # http://localhost:3000
```

## Get a free AI key
1. Go to https://aistudio.google.com/apikey and create a key (free tier, no card).
2. Put it in `.env.local` as `GEMINI_API_KEY=...`

## Deploy on Vercel
1. Push this folder to your GitHub repository.
2. On vercel.com → **Add New → Project** → import the repo (Vercel auto-detects Next.js).
3. In **Settings → Environment Variables**, add `GEMINI_API_KEY` (and optionally
   `GEMINI_MODEL`). Redeploy.
4. Open the live URL.

## Install as a mobile app (PWA)
- **iPhone (Safari):** Share → *Add to Home Screen*.
- **Android (Chrome):** menu → *Install app* / *Add to Home screen*.
The app then opens full-screen with its own icon and works offline for the shell.

## Make it App Store / Play Store ready (optional next step)
Wrap this web app with **Capacitor** to produce native iOS/Android builds without
rewriting the UI:
```bash
npm install @capacitor/core @capacitor/cli
npx cap init VividForge com.vividforge.app
# point webDir at your build output, then: npx cap add ios / android
```

## Where to go from here
- Replace the localStorage demo auth/store in `lib/store.js` with **Supabase**
  (real accounts + database).
- Add image generation and a human-creator handoff.
- Run a security review — AI-scaffolded code should be audited before real users.

## Notes
- The Gemini model defaults to `gemini-2.0-flash`. If Google changes model names,
  set `GEMINI_MODEL` in your env vars.
- All AI calls go through `/api/generate` so the key never reaches the browser.

