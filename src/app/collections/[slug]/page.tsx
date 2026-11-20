import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { getCollectionBySlug, getCollections } from "@/lib/collections";
import { getProductsByCategory } from "@/lib/products";

export async function generateStaticParams() {
  return (await getCollections()).map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };
  return { title: collection.name, description: collection.summary };
}

export default async function CollectionPage({
  params,
}: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) notFound();

  const products = await getProductsByCategory(collection.slug);

  return (
    <>
      <Container
        size="wide"
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 py-6"
      >
        <div>
          <nav aria-label="Breadcrumb" className="text-caption text-ink-muted">
            <Link href="/products" className="link-quiet">
              Shop
            </Link>
            <span aria-hidden="true"> / </span>
            {collection.name}
          </nav>
          <h1 className="headline mt-2">{collection.name}</h1>
          <p className="text-caption text-ink-muted mt-1">
            {collection.summary}
          </p>
        </div>
        <p className="text-caption">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>
      </Container>

      {products.length > 0 ? (
        <Container size="bleed">
          <ProductGrid products={products} />
        </Container>
      ) : (
        <Container size="wide" className="border-t py-10">
          <p className="text-caption">
            Nothing in {collection.name.toLowerCase()} right now.{" "}
            <Link href="/products" className="link">
              Shop all pieces
            </Link>
          </p>
        </Container>
      )}
    </>
  );
}
