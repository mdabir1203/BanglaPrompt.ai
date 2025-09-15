# Prompt Shiksha

A Bangla-first AI prompt engineering platform built with React, Vite and Supabase. The project showcases production-ready patterns for scaling, security and monetization while teaching prompt engineering in Bengali.

![Prompt Shiksha screenshot](https://github.com/user-attachments/assets/b97d155b-d4f3-414f-9dc7-40dbf3c52b56)

## Features

- **Prompt engineering guide in Bangla** – includes basic to advanced templates and best practices for writing effective prompts.
- **Supabase backend** for newsletter subscriptions, contact form emails and real-time user analytics.
- **Security & privacy tooling** such as strict Content Security Policy, XSS protection and GDPR‑style cookie consent.
- **Performance optimizations** with lazy loaded sections, service worker caching and resource hinting for fast global delivery.
- **Ad monetization** through Google AdSense and Adsterra placements.

## Tech Stack

- React 18 + TypeScript
- Vite build system
- Tailwind CSS with shadcn/ui components
- Supabase database & edge functions
- Resend email API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm

### Installation

```bash
git clone <repo-url>
cd prompt-panda-bangla
npm install
```

### Development server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### Linting

```bash
npm run lint
```

### Production build

```bash
npm run build
```

## Supabase & Email Setup

A Supabase project is required for storing newsletter signups, analytics and contact messages. An edge function (`send-contact-email`) uses [Resend](https://resend.com/) to send confirmation emails. Set the following environment variables when deploying the function:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `RESEND_API_KEY`

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
