import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <>
      <Container
        size="wide"
        className="flex flex-wrap items-baseline justify-between gap-4 py-6"
      >
        <h1 className="headline">Shop</h1>
        <p className="text-caption">{products.length} pieces</p>
      </Container>
      <Container size="bleed">
        <ProductGrid products={products} />
      </Container>
    </>
  );
}
