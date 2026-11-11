# Lumière Store

A minimal ecommerce storefront built with Next.js (App Router), TypeScript and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script                 | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the dev server               |
| `npm run build`        | Production build                   |
| `npm run start`        | Serve the production build         |
| `npm run lint`         | Run ESLint                         |
| `npm run typecheck`    | Generate route types and run `tsc` |
| `npm run format`       | Format with Prettier               |
| `npm run format:check` | Check formatting                   |

## Structure

```
src/
  app/                  Routes (home, /products, /products/[slug], not-found)
  components/
    layout/             Header, footer
    product/            Product card and grid
  lib/                  Data access (placeholder catalog) and utilities
  types/                Shared TypeScript types
```

Product data currently comes from a static placeholder list in `src/lib/products.ts`.
