# Prompt Bangla AI

A Bangla-first AI prompt engineering platform built with React, Vite and Supabase. The project showcases production-ready patterns for scaling, security and monetization while teaching prompt engineering in Bengali.


https://github.com/user-attachments/assets/8af407b6-86fe-437c-a91b-82882949769c


## Features

- **Prompt engineering guide in Bangla** – includes basic to advanced templates and best practices for writing effective prompts.
- **Supabase backend** for newsletter subscriptions, contact form emails and real-time user analytics.
- **Security & privacy tooling** such as strict Content Security Policy, XSS protection and GDPR‑style cookie consent.
- **Performance optimizations** with lazy loaded sections, service worker caching and resource hinting for fast global delivery.
- **Ad monetization** through Google AdSense and Adsterra placements.
- **Deployment check** through github actions for cloudflare

## Tech Stack

- React 18 + TypeScript
- Vite build system
- Tailwind CSS with shadcn/ui components
- Supabase database & edge functions
- Resend email API
- yarn package manager

## Deployment

The site is deployed on Cloudflare for fast global delivery.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [yarn v4](https://yarnpkg.com/migration/guide#update-your-configuration-to-the-new-settings)

### Installation

```bash
git clone <repo-url>
cd prompt-panda-bangla
yarn install
```

### Development server

```bash
yarn dev
```

The site will be available at `http://localhost:5173`.

### Linting

```bash
yarn lint
```

### Production build

```bash
yarn build
```

## Supabase & Email Setup

A Supabase project is required for storing newsletter signups, analytics and contact messages. An edge function (`send-contact-email`) uses [Resend](https://resend.com/) to send confirmation emails. Set the following environment variables when deploying the function:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SECRET`
- `RESEND_API_KEY`

### Cloudflare deployment notes

Cloudflare Pages exposes runtime environment variables through `context.env`. Following [Cloudflare's documentation](https://developers.cloudflare.com/pages/functions/bindings/#environment-variables), the app now injects the public Supabase keys directly into the HTML response so the browser bundle can hydrate them without relying on non-standard globals. Configure your project as follows:

1. **Public bindings** – Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` as standard environment variables in the Cloudflare Pages dashboard (or with `wrangler pages project env vars`). These values are injected into `window.__ENV__` by `functions/_middleware.ts` and are safe to expose to the client.
2. **Secret binding** – Store `SUPABASE_SECRET` with `wrangler secret put SUPABASE_SECRET` (or through the dashboard's encrypted secrets). The secret is **not** exposed to the browser; it remains available for Cloudflare Pages Functions or other server-side code that needs the Supabase service role key.
3. Redeploy the project so the new bindings are available in the runtime environment.

The Vite build still honours `import.meta.env` (including `VITE_*` aliases) and `process.env` for local development, so existing workflows continue to work while keeping Cloudflare's runtime as the source of truth in production.

## Project Structure

```
src/
  components/      # UI, ads and popups
  hooks/           # Analytics and other custom hooks
  integrations/    # Supabase client and types
  pages/           # React router pages
supabase/
  functions/       # Edge functions
  migrations/      # Database schema
```

## Contact

For collaboration or commercial inquiries, reach out at **md.abir1203@gmail.com**.

Built from Bangladesh 🇧🇩 for the world.
