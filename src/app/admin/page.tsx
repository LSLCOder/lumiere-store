import type { Metadata } from "next";
import { Suspense } from "react";
import { RefreshCatalogForm } from "@/components/admin/refresh-catalog-form";
import { Container } from "@/components/ui/container";
import { getCollections } from "@/lib/collections";
import { getProducts } from "@/lib/products";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="h-64" />}>
      <AdminOverview />
    </Suspense>
  );
}

// Everything, including the heading, waits for the role check, so a customer
// sees only the 404 page and nothing of the admin area.
async function AdminOverview() {
  const { user } = await requireAdmin("/admin");
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);
  const details = [
    { term: "Signed in as", value: user.email },
    { term: "Products", value: products.length },
    { term: "Categories", value: collections.length },
  ];

  return (
    <Container size="prose" className="max-w-[26rem] py-10 md:py-14">
      <h1 className="headline">Admin</h1>
      <dl className="text-caption mt-6 border-b">
        {details.map(({ term, value }) => (
          <div
            key={term}
            className="grid grid-cols-[6.5rem_1fr] gap-4 border-t py-3"
          >
            <dt className="text-ink-muted">{term}</dt>
            <dd className="break-words">{value}</dd>
          </div>
        ))}
      </dl>
      <h2 className="headline mt-10">Catalog</h2>
      <p className="text-caption text-ink-muted mt-3">
        The shop caches prices and stock for about a minute. Refresh to show
        database edits straight away.
      </p>
      <div className="mt-4">
        <RefreshCatalogForm />
      </div>
    </Container>
  );
}
