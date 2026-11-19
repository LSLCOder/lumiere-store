import { asc } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories } from "@/db/schema";
import type { Collection } from "@/types/product";

// One collection per product category. They link to the full shop until
// category filtering exists.
export async function getCollections(): Promise<Collection[]> {
  "use cache";
  cacheTag("categories");
  cacheLife("minutes");

  const rows = await db.select().from(categories).orderBy(asc(categories.id));

  return rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    summary: row.summary,
    href: "/products",
    image: { src: row.imageSrc, alt: row.imageAlt },
  }));
}
