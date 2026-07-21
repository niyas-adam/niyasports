# NiyaSports 🏀👟

Full-stack e-commerce platform for premium sports gear and apparel.

**Live URL:** https://niyasports.vercel.app

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.2.10 (App Router) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 4.x |
| **Icons** | Lucide React 0.487.x |
| **Database** | Supabase PostgreSQL |
| **Auth** | Supabase Auth (Email + Password) |
| **ORM/Client** | @supabase/ssr 0.12.x, @supabase/supabase-js |
| **Deployment** | Vercel |
| **Version Control** | GitHub |

---

## Project Structure

```
niyasports/
├── .env.example          # Environment variable template
├── .env.local            # Local Supabase credentials
├── next.config.ts        # Next.js config
├── tsconfig.json         # TypeScript config
├── postcss.config.mjs    # PostCSS config (Tailwind)
├── package.json          # Dependencies
├── src/
│   ├── middleware.ts     # Next.js middleware (session refresh)
│   ├── lib/
│   │   ├── supabase.ts           # Browser Supabase client
│   │   ├── supabase-server.ts    # Server Supabase client
│   │   └── supabase-middleware.ts # Middleware Supabase client
│   ├── app/
│   │   ├── layout.tsx            # Root layout (Header, Footer, Cart)
│   │   ├── globals.css           # Tailwind + theme variables
│   │   ├── page.tsx              # Home page (hero, categories, products)
│   │   ├── login/page.tsx        # Email/password sign in
│   │   ├── register/page.tsx     # Registration with email verification
│   │   ├── auth/callback/route.ts # Auth callback (PKCE flow)
│   │   ├── dashboard/page.tsx    # Protected user dashboard
│   │   ├── cart/page.tsx         # Full cart + checkout
│   │   └── products/[id]/page.tsx # Product detail
│   └── components/
│       ├── Header.tsx            # Sticky nav, auth state, cart icon
│       ├── Footer.tsx            # Footer with links
│       ├── CartProvider.tsx      # React Context cart state
│       ├── CartDrawer.tsx        # Slide-out cart drawer
│       ├── AddToCartButton.tsx   # Add to cart (product page)
│       ├── ProductCard.tsx       # Product grid card
│       └── ProductGrid.tsx       # Async server component product grid
```

---

## Database Schema (Supabase PostgreSQL)

### Tables

| Table | RLS | Purpose |
|---|---|---|
| `profiles` | ✅ User can view/edit own | Linked to `auth.users(id)` |
| `products` | ✅ Public read | Product catalog (10 seeded items) |
| `orders` | ✅ User can view own | Order header with total + status |
| `order_items` | ✅ User can view own | Line items per order |

### Key Policies

- **profiles**: `USING (auth.uid() = id)` for SELECT/UPDATE/INSERT
- **products**: `TO anon, authenticated USING (true)` for public read
- **orders**: `USING (auth.uid() = user_id)` for SELECT/INSERT/UPDATE
- **order_items**: `USING (auth.uid() = (SELECT user_id FROM orders WHERE id = order_id))`

### Trigger

- `on_auth_user_created` — auto-creates profile row on user signup

---

## Authentication Flow

1. User registers via `/register` with email + password
2. Supabase sends confirmation email
3. User clicks link → `/auth/callback` exchanges code for session
4. Middleware (`src/middleware.ts`) refreshes session on every request
5. Protected routes (`/dashboard`) redirect to `/login` if unauthenticated

---

## Shopping Cart

- **State management**: React Context + `useReducer` (CartProvider)
- **Global drawer**: Slide-out from any page via header cart icon
- **Full cart page**: `/cart` with quantity controls, totals, checkout
- **Checkout**: Inserts order into Supabase (requires auth)

---

## Errors Encountered & Fixes

### 1. Playwright: Chromium not found
```
Error: Chromium distribution 'chrome' is not found at /opt/google/chrome/chrome
```
**Fix:** Created symlink from Playwright's chromium binary to expected path
```bash
ln -sf ~/.cache/ms-playwright/chromium-1228/chrome-linux/chrome /opt/google/chrome/chrome
```

### 2. TypeScript: Implicit `any` in cookie methods
```
Parameter 'cookiesToSet' implicitly has an 'any' type.
```
**Fix:** Imported `CookieOptions` type from `@supabase/ssr` and annotated parameters:
```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
setAll(
  cookiesToSet: { name: string; value: string; options: CookieOptions }[],
  headers: Record<string, string>
) { ... }
```

### 3. TypeScript: `sameSite` type incompatibility
```
Types of property 'sameSite' are incompatible. Type 'false' is not assignable to type '"lax" | "strict" | "none" | undefined'.
```
**Fix:** Removed manual type annotations and let TypeScript infer from `createServerClient` overloads, then re-added with the exact `CookieOptions` type from the package.

### 4. Vercel Build: Missing environment variables
```
Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!
```
**Fix:** Added `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel project settings via Vercel API.

### 5. Vercel Build: `tsconfig.json` overrides
```
We detected TypeScript in your project and reconfigured your tsconfig.json file for you.
```
Vercel overrides `jsx` to `react-jsx` and adds `.next/types` to `include`. This increased strictness compared to local builds.

### 6. npm: Package install timeouts
```
npm install timed out during create-next-app
```
**Fix:** Re-ran `npm install` separately after `node_modules` cleanup.

---

## MCP Servers Used

| MCP Server | Usage |
|---|---|
| **Supabase MCP** | Apply migrations (`initial_schema`), execute SQL for triggers & grants, list tables, run security advisors |
| **GitHub MCP** | Get user info, create repository (`niyasports`), push files, list commits |
| **Playwright MCP** | Verify deployment by navigating to live URL |
| **Context7** | Look up Supabase docs for cookie methods pattern |
| **WebFetch** | Check deployment URLs |

---

## APIs & Tools Used

| Tool | Purpose |
|---|---|
| **Supabase Management API** | Update Auth config (site URL, enable email, leaked password check) |
| **Vercel REST API** | Set environment variables, trigger deployment |
| **Supabase Auth** | Email/password sign-up, sign-in, PKCE callback |
| **Next.js App Router** | Server components, dynamic routes, middleware (proxy) |
| **Tailwind CSS v4** | Utility-first styling with `@theme` directive |

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://zdloschtczkghudnphff.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Deployment

Auto-deployed via Vercel (connected to GitHub `main` branch).
Production URL: https://niyasports.vercel.app
