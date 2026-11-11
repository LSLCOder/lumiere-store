import type { Product } from "@/types/product";
import { getStockState } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * One line of availability: a small square marker and a label. The marker
 * is solid while the product can be bought and hollow once it is sold out.
 */
export function StockStatus({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const state = getStockState(product);
  const label =
    state === "sold-out"
      ? "Sold out"
      : state === "low-stock"
        ? `Only ${product.stock} left`
        : "In stock";

  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[length:var(--text-caption)] leading-[1.3334] tracking-[-0.03em]",
        state === "sold-out" && "text-ink-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 border border-current",
          state !== "sold-out" && "bg-current",
        )}
      />
      {label}
    </p>
  );
}
