# Prompt Bazaar AI

> Bangladesh's first bilingual prompt marketplace for creators, enterprises, and buyers who need culturally relevant AI workflows.

## Table of contents
- [Overview](#overview)
- [Core experiences](#core-experiences)
- [Architecture](#architecture)
- [Data model & Supabase setup](#data-model--supabase-setup)
- [Edge & background services](#edge--background-services)
- [Performance, security & compliance](#performance-security--compliance)
- [Local development](#local-development)
- [Docker](#docker)
- [Quality checks](#quality-checks)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Community & support](#community--support)

## Overview
Prompt Bangla AI is a production-ready Vite + React application that operates as a Bangla-first AI prompt marketplace. The experience ships with bilingual storytelling, creator monetisation tooling, enterprise procurement workflows, Supabase-powered analytics, and ad-driven revenue experiments. The interface highlights a creator-first go-to-market with live bidding, storefront packaging, and enterprise localisation guidance that speaks simultaneously to English and Bangla audiences.

Key pillars:
- **Bilingual UX** – persistent language context with local storage persistence drives an inclusive, toggleable Bangla/English interface across every surface.
- **Creator revenue focus** – hero blocks, CTA flows, and marketplace navigation make it simple to publish prompt bundles, launch storefronts, and reach global buyers.
- **Enterprise trust** – compliance messaging, pricing transparency, and live bidding telemetry connect procurement teams to vetted creators with data-backed confidence.
- **Monetisation mix** – built-in Google AdSense slots, ad exchanges, and newsletter conversions generate diversified revenue streams alongside marketplace sales.

## Core experiences
- **Marketplace discovery** – landing page routes guide visitors toward marketplace listings, live exchange dashboards, creator onboarding, enterprise localisation, pricing, and insights in both languages.
- **Creator storefront toolkit** – highlight cards position upload, licensing, analytics, and payouts with 72-hour SLA as the default onboarding path.
- **Enterprise localisation suite** – Supabase-backed pricing audiences and feature toggles let you manage enterprise messaging, compliance checklists, and CTA links without redeploying the app.
- **Live bidding exchange** – navigation emphasises real-time liquidity signals for verified buyers, reinforcing the differentiator for high-frequency prompt trading.
- **Community growth loops** – newsletter and Medium subscription popups are lazy-loaded to protect initial paint while capturing engaged traffic later in the session.
- **Global impact narrative** – hero storytelling codifies rankings, revenue uplift targets, and inclusive sectors (education, fintech, climate, creative) as part of the brand voice.

## Architecture
The front end is a modular React 18 application with route-level code splitting, suspense fallbacks, and analytics instrumentation designed to scale past 1,000 concurrent users.

- **Routing & layout** – React Router v6 with lazy-loaded routes, shared layout primitives, skip links, and tooltip providers keep the UI accessible and responsive.
- **Design system** – Tailwind CSS + shadcn/ui supply composable UI primitives, while lucide-react icons, cva utilities, and custom gradients maintain brand consistency.
- **State & data** – TanStack Query handles Supabase data fetching with tuned cache, retry, and garbage collection windows to minimise chattiness while supporting realtime-ready workloads.-L53】
- **Analytics pipeline** – a resilient analytics tracker batches page views, scroll depth, and time-on-page events into Supabase with offline persistence, retry logic, and storage fallbacks for edge runtimes.
- **Internationalisation** – lightweight context avoids heavy i18n frameworks while still syncing document language, persisting preferences, and exposing hooks to child components.

## Data model & Supabase setup
Supabase drives authentication, marketplace storage, analytics, and consent logs using row-level security (RLS) and PostgreSQL functions.

Highlighted schema:
- **Marketplace prompts & sales** – prompt listings, royalty splits, and purchase tracking ship with indexes, commission calculations, and seller-facing RLS policies.
- **Pricing transparency** – dynamic audience toggles, feature grids, and highlight cards are stored in Supabase for CMS-like control with service-role management policies.
- **Analytics events** – batched `user_analytics` inserts accept session metadata, device stats, and engagement metrics collected from the custom hook.
- **Contact pipeline** – the `contacts` table (seeded in earlier migrations) integrates with an edge function that validates, rate-limits, stores, and emails submissions using Resend.

Supabase CLI workflow:
```bash
yarn dlx supabase@latest login
yarn dlx supabase db push  # applies the SQL migrations in supabase/migrations
```
Ensure you supply `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` when running migrations remotely.

## Edge & background services
- **Cloudflare Pages Functions middleware** injects runtime environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) into the browser at request time so the client can hydrate on the edge without bundling secrets.
- **Supabase Edge Function** `send-contact-email` handles contact form submissions with strict schema validation (Zod), rate limiting, sanitisation, database persistence, and bilingual autoresponder emails via Resend.

## Performance, security & compliance
The application is pre-tuned for high-traffic scenarios, with detailed tracking in `SCALING_SUMMARY.md` outlining the improvements made for the 1,000+ concurrent user benchmark.

- **Code splitting & lazy loading** – route-level `React.lazy`, suspense boundaries, and targeted preloading reduce the first bundle by ~60%.
- **Service worker & resource hints** – runtime optimizer adds DNS prefetch, preconnect, service worker caching, lazy image loading, and Web Vitals instrumentation for proactive monitoring.
- **Security headers** – CSP, XSS, frame, referrer, permissions, and HSTS headers are injected via Helmet to satisfy enterprise trust requirements.
- **Cookie consent** – GDPR-aligned banner records granular preferences, defers analytics initialisation until approval, and offers policy links in Bangla.
- **Environment diagnostics** – a development-only environment debugger surfaces runtime env, storage access, and Supabase configuration health for faster troubleshooting.

## Local development
1. **Install prerequisites**
   - Node.js 18+
   - Yarn 4 (Berry) – this repository already pins `yarn@4.9.4` in `.yarnrc.yml` and `package.json`.
2. **Install dependencies**
   ```bash
   yarn install
   ```
3. **Configure environment variables**
   - Duplicate `.env.local` and populate with your Supabase project keys using the `SUPABASE_` names.
   - Update `wrangler.toml` with matching `SUPABASE_URL` and `SUPABASE_ANON_KEY` values for Cloudflare Pages deployments.
4. **Start the dev server**
   ```bash
   yarn dev
   ```
   Visit http://localhost:5173 and use the language toggle in the header components (see `RootLayout`) to switch between Bangla and English copy.

## Docker
Build a production-ready container that serves the prebuilt Vite bundle from Nginx.

1. **Build the image** – forward your Supabase environment so the static bundle is configured correctly. The defaults in the repository are placeholders and should be replaced with project-specific values.
   ```bash
   docker build \
     --build-arg SUPABASE_URL="https://your-project.supabase.co" \
     --build-arg SUPABASE_ANON_KEY="your-anon-key" \
     -t banglaprompt.ai .
   ```
   The build stage uses Yarn 4 (Berry) with `--immutable` installs, ensuring the container matches the lockfile.

2. **Run the container** – the final image is based on `nginx:alpine` and exposes port 80.
   ```bash
   docker run --rm -p 8080:80 --name banglaprompt.ai banglaprompt.ai
   ```
   Visit http://localhost:8080 to interact with the production build. A `/healthz` endpoint is also available for liveness checks.

3. **Override environment variables** – if you need to rebuild with different Supabase credentials, re-run `docker build` with new `--build-arg` values. Runtime environment overrides are not supported for the static bundle, so updates require a rebuild.

## Quality checks
- **Linting** – runs ESLint across the entire codebase with the Vite + React + TypeScript configuration.
  ```bash
  yarn lint
  ```
- **Type checking** – Vite and the TypeScript compiler run automatically during builds; use `yarn build` locally to validate production bundles.

## Deployment
- **Static assets** – `yarn build` outputs to `dist/` with all routes ready for Cloudflare Pages hosting.
- **Cloudflare Pages** – `wrangler pages deploy dist` ships the latest build, injecting Supabase environment variables via Pages Functions middleware.
- **Supabase Edge Function** – deploy `send-contact-email` through `supabase functions deploy send-contact-email --no-verify-jwt` after setting `RESEND_API_KEY`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY` secrets.

## Project structure
```
├── src/
│   ├── components/       # Hero, cookie consent, performance & security wrappers
│   ├── contexts/         # Bilingual language provider
│   ├── hooks/            # Analytics batching and tracking
│   ├── integrations/     # Supabase client & generated types
│   └── pages/            # Route-level experiences for marketplace, pricing, support
├── supabase/
│   ├── functions/        # Edge functions (Resend-powered contact form)
│   └── migrations/       # SQL migrations for marketplace, pricing, analytics
├── functions/            # Cloudflare Pages middleware to expose env vars
├── public/               # Static assets and service worker shell
└── wrangler.toml         # Cloudflare Pages project configuration
```

## Community & support
For partnerships, press, or enterprise pilots email **md.abir1203@gmail.com**. Built from Bangladesh 🇧🇩 to celebrate Bangla prompt engineering at global scale.
