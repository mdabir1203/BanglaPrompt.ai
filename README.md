# Prompt Bangla AI

> Bangladesh's first bilingual prompt marketplace for creators, enterprises, and buyers who need culturally relevant AI workflows.

## Table of contents
- [Overview](#overview)
- [Core experiences](#core-experiences)
- [Architecture](#architecture)
- [Data model & Supabase setup](#data-model--supabase-setup)
- [Edge & background services](#edge--background-services)
- [Performance, security & compliance](#performance-security--compliance)
- [Local development](#local-development)
- [Quality checks](#quality-checks)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Community & support](#community--support)

## Overview
Prompt Bangla AI is a production-ready Vite + React application that operates as a Bangla-first AI prompt marketplace. The experience ships with bilingual storytelling, creator monetisation tooling, enterprise procurement workflows, Supabase-powered analytics, and ad-driven revenue experiments. The interface highlights a creator-first go-to-market with live bidding, storefront packaging, and enterprise localisation guidance that speaks simultaneously to English and Bangla audiences.【F:src/components/Hero.tsx†L6-L136】【F:src/pages/Index.tsx†L1-L92】

Key pillars:
- **Bilingual UX** – persistent language context with local storage persistence drives an inclusive, toggleable Bangla/English interface across every surface.【F:src/contexts/LanguageContext.tsx†L1-L39】
- **Creator revenue focus** – hero blocks, CTA flows, and marketplace navigation make it simple to publish prompt bundles, launch storefronts, and reach global buyers.【F:src/components/Hero.tsx†L6-L166】
- **Enterprise trust** – compliance messaging, pricing transparency, and live bidding telemetry connect procurement teams to vetted creators with data-backed confidence.【F:src/components/Hero.tsx†L115-L166】【F:supabase/migrations/20250721090000-pricing-transparency.sql†L1-L88】
- **Monetisation mix** – built-in Google AdSense slots, ad exchanges, and newsletter conversions generate diversified revenue streams alongside marketplace sales.【F:src/App.tsx†L1-L87】【F:src/components/LazyComponents.tsx†L1-L26】

## Core experiences
- **Marketplace discovery** – landing page routes guide visitors toward marketplace listings, live exchange dashboards, creator onboarding, enterprise localisation, pricing, and insights in both languages.【F:src/pages/Index.tsx†L11-L92】
- **Creator storefront toolkit** – highlight cards position upload, licensing, analytics, and payouts with 72-hour SLA as the default onboarding path.【F:src/components/Hero.tsx†L6-L108】
- **Enterprise localisation suite** – Supabase-backed pricing audiences and feature toggles let you manage enterprise messaging, compliance checklists, and CTA links without redeploying the app.【F:supabase/migrations/20250721090000-pricing-transparency.sql†L1-L139】
- **Live bidding exchange** – navigation emphasises real-time liquidity signals for verified buyers, reinforcing the differentiator for high-frequency prompt trading.【F:src/components/Hero.tsx†L25-L108】
- **Community growth loops** – newsletter and Medium subscription popups are lazy-loaded to protect initial paint while capturing engaged traffic later in the session.【F:src/App.tsx†L13-L87】【F:src/components/LazyComponents.tsx†L9-L26】
- **Global impact narrative** – hero storytelling codifies rankings, revenue uplift targets, and inclusive sectors (education, fintech, climate, creative) as part of the brand voice.【F:src/components/Hero.tsx†L108-L166】

## Architecture
The front end is a modular React 18 application with route-level code splitting, suspense fallbacks, and analytics instrumentation designed to scale past 1,000 concurrent users.【F:src/App.tsx†L1-L87】【F:SCALING_SUMMARY.md†L5-L49】

- **Routing & layout** – React Router v6 with lazy-loaded routes, shared layout primitives, skip links, and tooltip providers keep the UI accessible and responsive.【F:src/App.tsx†L1-L87】
- **Design system** – Tailwind CSS + shadcn/ui supply composable UI primitives, while lucide-react icons, cva utilities, and custom gradients maintain brand consistency.【F:package.json†L14-L68】
- **State & data** – TanStack Query handles Supabase data fetching with tuned cache, retry, and garbage collection windows to minimise chattiness while supporting realtime-ready workloads.【F:src/App.tsx†L33-L53】
- **Analytics pipeline** – a resilient analytics tracker batches page views, scroll depth, and time-on-page events into Supabase with offline persistence, retry logic, and storage fallbacks for edge runtimes.【F:src/hooks/useAnalytics.ts†L1-L189】
- **Internationalisation** – lightweight context avoids heavy i18n frameworks while still syncing document language, persisting preferences, and exposing hooks to child components.【F:src/contexts/LanguageContext.tsx†L1-L39】

## Data model & Supabase setup
Supabase drives authentication, marketplace storage, analytics, and consent logs using row-level security (RLS) and PostgreSQL functions.

Highlighted schema:
- **Marketplace prompts & sales** – prompt listings, royalty splits, and purchase tracking ship with indexes, commission calculations, and seller-facing RLS policies.【F:supabase/migrations/20250720093000-add-marketplace-prompts.sql†L1-L141】
- **Pricing transparency** – dynamic audience toggles, feature grids, and highlight cards are stored in Supabase for CMS-like control with service-role management policies.【F:supabase/migrations/20250721090000-pricing-transparency.sql†L1-L139】
- **Analytics events** – batched `user_analytics` inserts accept session metadata, device stats, and engagement metrics collected from the custom hook.【F:src/hooks/useAnalytics.ts†L1-L189】
- **Contact pipeline** – the `contacts` table (seeded in earlier migrations) integrates with an edge function that validates, rate-limits, stores, and emails submissions using Resend.【F:supabase/functions/send-contact-email/index.ts†L1-L183】

Supabase CLI workflow:
```bash
yarn dlx supabase@latest login
yarn dlx supabase db push  # applies the SQL migrations in supabase/migrations
```
Ensure you supply `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` when running migrations remotely.

## Edge & background services
- **Cloudflare Pages Functions middleware** injects runtime environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) into the browser at request time so the client can hydrate on the edge without bundling secrets.【F:functions/_middleware.ts†L1-L62】
- **Supabase Edge Function** `send-contact-email` handles contact form submissions with strict schema validation (Zod), rate limiting, sanitisation, database persistence, and bilingual autoresponder emails via Resend.【F:supabase/functions/send-contact-email/index.ts†L1-L183】

## Performance, security & compliance
The application is pre-tuned for high-traffic scenarios, with detailed tracking in `SCALING_SUMMARY.md` outlining the improvements made for the 1,000+ concurrent user benchmark.【F:SCALING_SUMMARY.md†L1-L68】

- **Code splitting & lazy loading** – route-level `React.lazy`, suspense boundaries, and targeted preloading reduce the first bundle by ~60%.【F:src/App.tsx†L1-L87】【F:src/components/LazyComponents.tsx†L1-L26】【F:SCALING_SUMMARY.md†L9-L21】
- **Service worker & resource hints** – runtime optimizer adds DNS prefetch, preconnect, service worker caching, lazy image loading, and Web Vitals instrumentation for proactive monitoring.【F:src/components/PerformanceOptimizer.tsx†L1-L135】【F:SCALING_SUMMARY.md†L23-L33】
- **Security headers** – CSP, XSS, frame, referrer, permissions, and HSTS headers are injected via Helmet to satisfy enterprise trust requirements.【F:src/components/SecurityHeaders.tsx†L1-L71】
- **Cookie consent** – GDPR-aligned banner records granular preferences, defers analytics initialisation until approval, and offers policy links in Bangla.【F:src/components/CookieConsent.tsx†L1-L104】
- **Environment diagnostics** – a development-only environment debugger surfaces runtime env, storage access, and Supabase configuration health for faster troubleshooting.【F:src/components/EnvironmentDebug.tsx†L1-L63】

## Local development
1. **Install prerequisites**
   - Node.js 18+
   - Yarn 4 (Berry) – this repository already pins `yarn@4.9.4` in `.yarnrc.yml` and `package.json`.
2. **Install dependencies**
   ```bash
   yarn install
   ```
3. **Configure environment variables**
   - Duplicate `.env.local` and populate with your Supabase project keys using the `VITE_` prefixes.
   - Update `wrangler.toml` with matching `SUPABASE_URL` and `SUPABASE_ANON_KEY` values for Cloudflare Pages deployments.【F:src/integrations/supabase/client.ts†L210-L266】【F:wrangler.toml†L1-L10】
4. **Start the dev server**
   ```bash
   yarn dev
   ```
   Visit http://localhost:5173 and use the language toggle in the header components (see `RootLayout`) to switch between Bangla and English copy.

## Quality checks
- **Linting** – runs ESLint across the entire codebase with the Vite + React + TypeScript configuration.
  ```bash
  yarn lint
  ```
- **Type checking** – Vite and the TypeScript compiler run automatically during builds; use `yarn build` locally to validate production bundles.

## Deployment
- **Static assets** – `yarn build` outputs to `dist/` with all routes ready for Cloudflare Pages hosting.
- **Cloudflare Pages** – `wrangler pages deploy dist` ships the latest build, injecting Supabase environment variables via Pages Functions middleware.【F:package.json†L7-L13】【F:functions/_middleware.ts†L1-L62】
- **Supabase Edge Function** – deploy `send-contact-email` through `supabase functions deploy send-contact-email --no-verify-jwt` after setting `RESEND_API_KEY`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY` secrets.【F:supabase/functions/send-contact-email/index.ts†L1-L183】

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
