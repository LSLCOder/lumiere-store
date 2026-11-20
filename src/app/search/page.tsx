import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { SearchForm } from "@/components/search/search-form";
import { Container } from "@/components/ui/container";
import { searchProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <>
      <Container size="wide" className="py-6">
        <h1 className="headline">Search</h1>
      </Container>
      {/* The query is only known at request time, so everything that reads
          it streams in; the heading above is prerendered. */}
      <Suspense fallback={<SearchShell />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}

function SearchShell({ query = "" }: { query?: string }) {
  return (
    <Container size="wide" className="pb-6">
      <div className="max-w-[40rem]">
        <SearchForm defaultValue={query} />
      </div>
    </Container>
  );
}

async function SearchResults({
  searchParams,
}: Pick<PageProps<"/search">, "searchParams">) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 100) ?? "";
  const products = query ? await searchProducts(query) : [];

  return (
    <>
      <SearchShell query={query} />
      {!query ? (
        <Container size="wide" className="pb-10">
          <p className="text-caption text-ink-muted">
            Search by name, material or category.
          </p>
        </Container>
      ) : products.length > 0 ? (
        <section aria-labelledby="results-heading">
          <Container size="wide" className="pb-6">
            <h2 id="results-heading" className="text-caption">
              {products.length} {products.length === 1 ? "piece" : "pieces"} for
              &ldquo;{query}&rdquo;
            </h2>
          </Container>
          <Container size="bleed">
            <ProductGrid products={products} />
          </Container>
        </section>
      ) : (
        <Container size="wide" className="border-t py-10">
          <p role="status" className="text-caption">
            Nothing matches &ldquo;{query}&rdquo;. Try another word, or{" "}
            <Link href="/products" className="link">
              shop all pieces
            </Link>
            .
          </p>
        </Container>
      )}
    </>
  );
}
