import { asc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories } from "@/db/schema";
import type { Collection } from "@/types/product";

type CategoryRow = typeof categories.$inferSelect;

/** One collection per product category, each with its own page. */
function toCollection(row: CategoryRow): Collection {
  return {
    slug: row.slug,
    name: row.name,
    summary: row.summary,
    href: `/collections/${row.slug}`,
    image: { src: row.imageSrc, alt: row.imageAlt },
  };
}

export async function getCollections(): Promise<Collection[]> {
  "use cache";
  cacheTag("categories");
  cacheLife("minutes");

  const rows = await db.select().from(categories).orderBy(asc(categories.id));
  return rows.map(toCollection);
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  "use cache";
  cacheTag("categories");
  cacheLife("minutes");

  const [row] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return row ? toCollection(row) : null;
}
