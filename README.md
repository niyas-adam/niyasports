# United Sports

Premium sports store website for Wadakkancherry, Thrissur. Built with Next.js (App Router), Tailwind CSS v4, and Supabase.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Auth & Database:** Supabase
- **Fonts:** Anton (headings), Inter (body)

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
  app/          — Pages (App Router)
  components/   — Shared components
  lib/          — Utilities, Supabase clients, content.ts
  middleware.ts — Auth session refresh
```

## Content Management

All editable copy (navigation, hero, categories, about, location, footer) is in `src/lib/content.ts`.
