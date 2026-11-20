# Lumière Store

A minimal ecommerce storefront built with Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL (Drizzle ORM) and Better Auth.

## Getting started

You need Node 20.12 or newer and a [Neon](https://neon.tech) Postgres database (the free plan is enough).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root with both connection strings from the Neon console, plus the Better Auth settings. The pooled connection string (its host contains `-pooler`) is used by the app; the direct one is used for migrations and seeding:

   ```
   DATABASE_URL=<pooled connection string>
   DATABASE_URL_UNPOOLED=<direct connection string>
   BETTER_AUTH_SECRET=<output of: openssl rand -base64 32>
   BETTER_AUTH_URL=http://localhost:3000
   ```

   `BETTER_AUTH_SECRET` signs session cookies: keep it secret, and keep it the same, or everyone is signed out. `BETTER_AUTH_URL` is the site's own address; set it to the real domain in production.

3. Create the tables (catalog and accounts) and load the sample catalog:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

Open http://localhost:3000.

`npm run build` also needs `.env.local` and a network connection, because product pages are prerendered from the database.

## Scripts

| Script                               | Description                              |
| ------------------------------------ | ---------------------------------------- |
| `npm run dev`                        | Start the dev server                     |
| `npm run build`                      | Production build                         |
| `npm run start`                      | Serve the production build               |
| `npm run lint`                       | Run ESLint                               |
| `npm run typecheck`                  | Generate route types and run `tsc`       |
| `npm run format`                     | Format with Prettier                     |
| `npm run format:check`               | Check formatting                         |
| `npm run db:generate`                | Write a SQL migration from the schema    |
| `npm run db:migrate`                 | Apply pending migrations                 |
| `npm run db:seed`                    | Load the sample catalog (safe to re-run) |
| `npm run auth:make-admin -- <email>` | Give an existing account the admin role  |

## Structure

```
drizzle/                SQL migrations (generated, committed)
src/
  app/                  Routes (shop, collections, search, sign-in/up, /account, /admin, /api/auth)
  components/
    admin/              Admin page controls
    auth/               Sign-in and sign-up forms, sign-out button
    home/               Hero, campaign panel
    layout/             Header, footer
    product/            Product card, grid, gallery, stock status
    ui/                 Button, container, section
  db/                   Drizzle schemas (catalog, auth), database client, seed, make-admin
  lib/                  Data access, auth config and session helpers, stock state, utilities
  proxy.ts              Redirects signed-out visitors away from /account and /admin
  types/                Shared TypeScript types
```

## Database

Two tables: `categories` and `products`.

- A product belongs to one category. A category that still has products cannot be deleted.
- Prices are stored as whole cents (`price_cents`) with a currency code.
- Each product stores its current unit count in `products.stock`, which can't go below zero. The storefront derives "In stock", "Only N left" (5 or fewer) and "Sold out" from it.
- Pages read the catalog through `src/lib/products.ts` and `src/lib/collections.ts`. Results are cached for about a minute, so a price or stock change appears within roughly a minute.

To change the schema, edit `src/db/schema.ts`, run `npm run db:generate`, review the SQL written to `drizzle/`, then run `npm run db:migrate`.

## Accounts

Email-and-password accounts use [Better Auth](https://better-auth.com) on the same database, in four tables: `users`, `sessions`, `accounts` (password hashes) and `verifications`.

- Sign up at `/sign-up`, sign in at `/sign-in`, and sign out from `/account`. Sessions last 7 days and are extended daily while in use.
- `/account` needs a signed-in user. `/admin` needs the `admin` role; anyone else signed in gets the 404 page.
- Everyone who signs up is a customer. To make an admin, sign up with that email, then run `npm run auth:make-admin -- you@example.com`. It applies on their next request.
- The admin page can refresh the catalog cache, so database edits show straight away instead of within a minute.
- Social login, password reset, email verification and two-factor authentication are not set up.
