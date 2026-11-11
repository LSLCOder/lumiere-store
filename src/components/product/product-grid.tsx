import { Fragment, type ReactNode } from "react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
  /**
   * Optional campaign tile placed among the products. Give it the
   * `tile-feature` class so it spans a 2×2 block of cells.
   */
  feature?: ReactNode;
  /** How many products come before the feature tile. */
  featureAfter?: number;
  className?: string;
};

export function ProductGrid({
  products,
  feature,
  featureAfter = 2,
  className,
}: ProductGridProps) {
  return (
    <div className={cn("grid-tiles", className)}>
      {products.map((product, index) => (
        <Fragment key={product.id}>
          {feature && index === featureAfter ? feature : null}
          <ProductCard product={product} />
        </Fragment>
      ))}
    </div>
  );
}
