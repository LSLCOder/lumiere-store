import { asc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import type { Product } from "@/types/product";

// Catalog reads. Each one is cached for about a minute (`cacheLife`), so
// pages stay prerendered and a price or stock change shows up within roughly
// a minute. Tagged "products" so a later admin action can revalidate at once.

/** Every product with the name of its category. */
function selectProducts() {
  return db
    .select({ product: products, category: categories.name })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id));
}

type ProductRow = Awaited<ReturnType<typeof selectProducts>>[number];

/** Maps a database row to the shape the components render. */
function toProduct({ product, category }: ProductRow): Product {
  const [image, ...gallery] = product.images;
  if (!image) {
    throw new Error(`Product "${product.slug}" has no photos.`);
  }

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.priceCents,
    currency: product.currency,
    category,
    image,
    gallery,
    badge: product.badge ?? undefined,
    stock: product.stock,
    material: product.material,
    dimensions: product.dimensions,
    care: product.care,
  };
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const rows = await selectProducts().orderBy(asc(products.id));
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const [row] = await selectProducts().where(eq(products.slug, slug)).limit(1);
  return row ? toProduct(row) : null;
}

/** Other products to show under a product: same category first. */
export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const all = await getProducts();
  const others = all.filter((other) => other.id !== product.id);
  return [
    ...others.filter((other) => other.category === product.category),
    ...others.filter((other) => other.category !== product.category),
  ].slice(0, limit);
}
