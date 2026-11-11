import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { StockStatus } from "@/components/product/stock-status";
import { Container } from "@/components/ui/container";
import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  getStockState,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const soldOut = getStockState(product) === "sold-out";
  const related = getRelatedProducts(product);
  const total = getProducts().length;
  const details = [
    { term: "Category", value: product.category },
    { term: "Material", value: product.material },
    { term: "Dimensions", value: product.dimensions },
    { term: "Care", value: product.care },
  ];

  return (
    <>
      {/* Photographs run flush to the page edge and take 7 of 12 columns
          from md; the details stay in view beside them while they scroll. */}
      <article className="grid md:grid-cols-12">
        <ProductGallery
          images={[product.image, ...(product.gallery ?? [])]}
          badge={soldOut ? "Sold out" : product.badge}
          className="md:col-span-7"
        />
        <div className="px-4 pt-6 pb-10 md:col-span-5 md:p-6 lg:p-10">
          <div className="max-w-[26rem] md:sticky md:top-[calc(var(--nav-height)+1.5rem)] lg:top-[calc(var(--nav-height)+2.5rem)]">
            <nav
              aria-label="Breadcrumb"
              className="text-caption text-ink-muted"
            >
              <Link href="/products" className="link-quiet">
                Shop
              </Link>
              <span aria-hidden="true"> / </span>
              {product.category}
            </nav>

            <h1 className="text-title mt-6">{product.name}</h1>
            <p className="font-medium">
              {formatPrice(product.price, product.currency)}
            </p>
            <StockStatus product={product} className="mt-4" />

            <h2 className="headline mt-10">Description</h2>
            <p className="mt-3">{product.description}</p>

            <h2 className="headline mt-10">Details</h2>
            <dl className="text-caption mt-3 border-b">
              {details.map(({ term, value }) => (
                <div
                  key={term}
                  className="grid grid-cols-[6.5rem_1fr] gap-4 border-t py-3"
                >
                  <dt className="text-ink-muted">{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-heading" className="border-t">
        <Container
          size="wide"
          className="flex items-baseline justify-between gap-4 pt-10 pb-6 md:pt-14"
        >
          <h2 id="related-heading" className="headline">
            More pieces
          </h2>
          <Link href="/products" className="link-cta">
            View all {total}
          </Link>
        </Container>
        {/* Four pieces fill a row at 2 and 4 columns; the 3-column tablet
            grid drops the fourth so no cell is left empty. */}
        <ProductGrid
          products={related}
          className="md:max-lg:[&>:nth-child(4)]:hidden"
        />
      </section>
    </>
  );
}
