import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sampleCategories, sampleProducts } from "./sample-data";
import { categories, products } from "./schema";

// Like migrations, the seed uses Neon's direct connection when it is set.
const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local (see README, Getting started).",
  );
}
const pool = new Pool({ connectionString });
const db = drizzle(pool);

// Writes the sample catalog. Rows are matched by slug and updated in place,
// so running this again resets the sample data without creating duplicates.
async function seed() {
  await db.transaction(async (tx) => {
    const categoryIds = new Map<string, number>();

    for (const category of sampleCategories) {
      const values = {
        slug: category.slug,
        name: category.name,
        summary: category.summary,
        imageSrc: category.image.src,
        imageAlt: category.image.alt,
      };
      const [row] = await tx
        .insert(categories)
        .values(values)
        .onConflictDoUpdate({ target: categories.slug, set: values })
        .returning({ id: categories.id });
      categoryIds.set(category.slug, row.id);
    }

    for (const product of sampleProducts) {
      const categoryId = categoryIds.get(product.categorySlug);
      if (categoryId === undefined) {
        throw new Error(
          `Product "${product.slug}" names an unknown category "${product.categorySlug}".`,
        );
      }

      const values = {
        slug: product.slug,
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        currency: product.currency,
        stock: product.stock,
        categoryId,
        images: product.images,
        badge: product.badge ?? null,
        material: product.material,
        dimensions: product.dimensions,
        care: product.care,
      };
      await tx
        .insert(products)
        .values(values)
        .onConflictDoUpdate({ target: products.slug, set: values });
    }
  });

  const categoryCount = await db.$count(categories);
  const productCount = await db.$count(products);
  console.log(
    `Seeded. Rows now: ${categoryCount} categories, ${productCount} products.`,
  );
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
