# Lumière Store

A minimal ecommerce storefront built with Next.js (App Router), TypeScript, Tailwind CSS and PostgreSQL (Drizzle ORM).

## Getting started

You need Node 20.12 or newer and a [Neon](https://neon.tech) Postgres database (the free plan is enough).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root with both connection strings from the Neon console. The pooled one (its host contains `-pooler`) is used by the app; the direct one is used for migrations and seeding:

   ```
   DATABASE_URL=<pooled connection string>
   DATABASE_URL_UNPOOLED=<direct connection string>
   ```

3. Create the tables and load the sample catalog:

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

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the dev server                     |
| `npm run build`        | Production build                         |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Run ESLint                               |
| `npm run typecheck`    | Generate route types and run `tsc`       |
| `npm run format`       | Format with Prettier                     |
| `npm run format:check` | Check formatting                         |
| `npm run db:generate`  | Write a SQL migration from the schema    |
| `npm run db:migrate`   | Apply pending migrations                 |
| `npm run db:seed`      | Load the sample catalog (safe to re-run) |

## Structure

```
drizzle/                SQL migrations (generated, committed)
src/
  app/                  Routes (home, /products, /products/[slug], not-found)
  components/
    home/               Hero, campaign panel
    layout/             Header, footer
    product/            Product card, grid, gallery, stock status
    ui/                 Button, container, section
  db/                   Drizzle schema, database client, sample data and seed
  lib/                  Data access (products, collections), stock state, utilities
  types/                Shared TypeScript types
```

## Database

Two tables: `categories` and `products`.

- A product belongs to one category. A category that still has products cannot be deleted.
- Prices are stored as whole cents (`price_cents`) with a currency code.
- Each product stores its current unit count in `products.stock`, which can't go below zero. The storefront derives "In stock", "Only N left" (5 or fewer) and "Sold out" from it.
- Pages read the catalog through `src/lib/products.ts` and `src/lib/collections.ts`. Results are cached for about a minute, so a price or stock change appears within roughly a minute.

To change the schema, edit `src/db/schema.ts`, run `npm run db:generate`, review the SQL written to `drizzle/`, then run `npm run db:migrate`.
