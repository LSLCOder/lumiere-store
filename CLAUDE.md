# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev`: dev server at http://localhost:3000 (Turbopack)
- `npm run build`: production build. It also type-checks and prerenders every route, so it is the most complete check
- `npm run typecheck`: `next typegen && tsc --noEmit`. Run typegen after adding or renaming routes, or the global `PageProps<"/route">` / `LayoutProps<"/route">` types will reject the new route
- `npm run lint`: ESLint (Next.js config)
- `npm run format` / `npm run format:check`: Prettier, with `prettier-plugin-tailwindcss` sorting class names

There is no test framework set up yet.

## Next.js version

This is Next.js 16 with React 19, and the APIs may not match older versions. Per `AGENTS.md`, check the bundled docs in `node_modules/next/dist/docs/` before using a Next.js API you're unsure about.

`next.config.ts` turns on `cacheComponents` and `partialPrefetching`. One result: runtime values (`new Date()`, `cookies()`, uncached fetches, `params` on routes that don't define `generateStaticParams`) must sit inside a `<Suspense>` boundary or be cached, otherwise prerendering fails. `npm run build` catches these errors.

## Architecture

The project is a minimal storefront. Auth, database, cart, payments and admin are deliberately not built yet.

- **Data access goes through `src/lib/products.ts`.** Pages call `getProducts()` / `getProductBySlug()` and never import the raw catalog. The catalog is currently a static placeholder array, so a real data source can replace it inside these functions without touching pages.
- **Pages fetch data and components only render it.** Route files in `src/app/` load data and pass it to components in `src/components/` as props (e.g. `page → ProductGrid → ProductCard`). Everything is a server component; add `"use client"` only to components that need interactivity.
- **Product detail pages are static.** `src/app/products/[slug]/page.tsx` uses `generateStaticParams()` from the catalog and calls `notFound()` for unknown slugs. It is composed from `ProductGallery` (flush photos: a swipeable row on small screens, a stack beside sticky details from md), `StockStatus` and a `ProductGrid` of `getRelatedProducts()`. There is no buy button because the cart is not built.
- **Stock state is derived, never stored.** `Product.stock` is a unit count; `getStockState()` in `src/lib/products.ts` turns it into `in-stock` / `low-stock` / `sold-out`. Sold-out products show a "Sold out" badge on their card and page.
- **`cn()` drops a font-size class when a text color follows it** for the custom sizes (`text-caption text-ink-muted` loses `text-caption`, because tailwind-merge reads both as colors). Keep the two on separate elements or out of `cn()`.
- **Imagery is sample photography hot-linked from Unsplash.** Build URLs with `unsplash(photoId, width)` from `src/lib/images.ts`; the host is allowed in `next.config.ts` (`images.remotePatterns`). Render with `next/image` (`fill` + `sizes` inside a `.tile`; `preload` for the first image on a page, since `priority` is deprecated in Next 16). Text over photos is `text-white` on a `.media-scrim`.
- **The homepage** (`src/app/page.tsx`) is composed from `src/components/home/` (`Hero`, `CampaignPanel`) plus `ProductGrid`, which takes an optional `feature` tile. Collections come from `getCollections()` in `src/lib/collections.ts` and link to `/products` until category filtering exists.
- **Money is stored as integer cents** (`Product.price`). Format it with `formatPrice(cents, currency)` from `src/lib/utils.ts`.
- **Class names** are combined with `cn()` (clsx + tailwind-merge) from `src/lib/utils.ts`.

## Styling

Tailwind CSS v4 is configured in CSS, and there is no `tailwind.config` file. The whole design system lives in `src/app/globals.css`:

**Design direction:** luxury-house principles (measured from a fashion-house site; principles only, no copied text, assets or branding). Monochrome: white canvas, pure black ink, near-white (`#FBFBFB`) product plates, and black as the action color, with no chromatic accent. The typeface is Jost (geometric sans, `next/font`, variable weight), set small and tight: 12px carries the interface (nav, labels, product names, prices), 16px is for headings and reading text, and the only large size is a thin 24→32px statement. Letter-spacing is negative everywhere except buttons (0) and the wordmark (wide). Hierarchy comes from weight and case (bold uppercase headings, labels and buttons against regular sentence-case text), not from size. Everything is square, with no radii, shadows or decorative gradients and 1px hairlines only. Imagery leads: product cards are whole plates in an edge-to-edge grid with 1px seams, with a small left-aligned label (name, price) inset 12px. The header is three columns with the wordmark centered. The hero statement is the only element with load animation.

- **Tokens (`@theme static`)**: semantic colors (`canvas`, `surface`, `surface-strong`, `ink`, `ink-muted`, `hairline`, `accent` (= ink), `link`, `scrim`), the type scale (`text-display` 24→32px weight 200, `text-headline` 16px bold, `text-title` 16px medium, `text-body` 16px, `text-caption` 12px, `text-micro` 10px), container widths (`prose` 640 / `page` 1280 / `wide` 1920), radii `tile`/`control` both 0, and the breakpoints. **`md` = 768px, `lg` = 1024px, `xl` = 1440px.** `--gutter` (16/24/64) and `--nav-height` (56/64/72) are responsive.
- **Dark mode** swaps the `--color-*` values in `@layer base` under `prefers-color-scheme`. Always use semantic color utilities rather than Tailwind's default palette (`gray-500`, etc.), so both themes keep working.
- **Component classes (`@layer components`)**: type roles `.display` (thin statement), `.headline` (bold uppercase 16px), `.label` (bold uppercase 12px), `.badge` (10px marker on a plate); `.tab` (quiet; bold uppercase when it has `aria-current`); `.rise-line`; `.btn` + `.btn-primary|secondary|light` + `.btn-lg` + `.btn-block`; `.link` (inline), `.link-cta` (12px underlined, sentence case), `.link-quiet` (nav); `.tile` + `.tile-label`, `.media-cover`, `.media-scrim`, `.glass`, `.hero-overlay` (put it on a page's opening full-bleed section: the section slides under the header, and `.site-header` stays transparent with light text until the hero scrolls past; pure CSS scroll-driven animation, with a solid header as the fallback); `.field` (inputs).
- **Layout utilities (`@utility`)**: `container-page|wide|prose|bleed`, `section-y` (40/56), `grid-tiles` (2→3→4 columns at md/lg, 1px gap, dense flow; run it edge to edge), `tile-feature` (campaign image: full width on small screens, 2×2 grid cells from md), `grid-split` (1→2 flush campaign panels), `stack`, `stack-lg`.
- **Homepage conventions:** `.display` appears once per page (the hero statement, on a dark photograph because the type is thin). Captions over photos sit bottom-left: title, one line, then a `.link-cta` that names its destination ("Shop linen", not "Discover"). Product cards show name and price only; `Product.badge` is for a real status ("New"), not the category. No hover zooms or other image effects, and no filler sections with invented promises.
- Use 12px (`text-caption`) for interface and product text, and keep 16px for paragraphs people read (descriptions, prose pages).

The React wrappers in `src/components/ui/` (`Container` with `size="bleed"`, `Section` with `tone="inverse"`, `Button`/`ButtonLink` with `variant="light"` and `block`) apply these classes. Prefer them, or the classes, over ad-hoc spacing and colors. Borders default to the hairline color, so a plain `border-t` is enough.

Import paths use the `@/*` alias for `src/*`.
