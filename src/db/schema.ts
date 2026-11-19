import { sql } from "drizzle-orm";
import {
  char,
  check,
  integer,
  jsonb,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import type { ProductImage } from "../types/product";

/** A product category. Each one is also a collection panel on the homepage. */
export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  name: text().notNull().unique(),
  /** One short line shown under the name on the homepage panel. */
  summary: text().notNull(),
  imageSrc: text("image_src").notNull(),
  imageAlt: text("image_alt").notNull(),
});

export const products = pgTable(
  "products",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: text().notNull().unique(),
    name: text().notNull(),
    description: text().notNull(),
    /** Price in the smallest currency unit (cents), never a decimal. */
    priceCents: integer("price_cents").notNull(),
    /** ISO 4217 code, e.g. "USD". */
    currency: char({ length: 3 }).notNull().default("USD"),
    /**
     * Units currently available. Only the count is stored; the in-stock /
     * low-stock / sold-out state is derived in `src/lib/stock.ts`.
     */
    stock: integer().notNull().default(0),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    /** Photos in display order; the first is the main one. */
    images: jsonb().$type<ProductImage[]>().notNull(),
    /** Optional editorial marker, e.g. "New". "Sold out" comes from stock. */
    badge: text(),
    material: text().notNull(),
    dimensions: text().notNull(),
    care: text().notNull(),
  },
  (table) => [
    check("products_price_nonneg", sql`${table.priceCents} >= 0`),
    check("products_stock_nonneg", sql`${table.stock} >= 0`),
  ],
);
