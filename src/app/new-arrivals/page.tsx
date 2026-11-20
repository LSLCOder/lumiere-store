import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { getNewArrivals } from "@/lib/products";

export const metadata: Metadata = {
  title: "New arrivals",
  description: "The latest pieces added to the shop.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <>
      <Container
        size="wide"
        className="flex flex-wrap items-baseline justify-between gap-4 py-6"
      >
        <h1 className="headline">New arrivals</h1>
        <Link href="/products" className="link-cta">
          Shop all pieces
        </Link>
      </Container>
      <Container size="bleed">
        {/* Four pieces: 2×2 on small screens, one row from lg. At md the
            grid has three columns, so the fourth is hidden to keep the row
            whole, as on the product page. */}
        <ProductGrid
          products={products}
          className="md:max-lg:[&>:nth-child(4)]:hidden"
        />
      </Container>
    </>
  );
}
