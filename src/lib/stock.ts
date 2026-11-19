import type { Product, StockState } from "@/types/product";

/** At or below this many units, the product page says how many are left. */
const LOW_STOCK_THRESHOLD = 5;

/** Stock state is derived from the unit count; it is never stored. */
export function getStockState(product: Pick<Product, "stock">): StockState {
  if (product.stock <= 0) return "sold-out";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}
