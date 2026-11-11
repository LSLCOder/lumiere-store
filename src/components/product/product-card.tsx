import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { getStockState } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

/**
 * The whole card is one near-white plate: photograph, then a small
 * left-aligned label (name, price) inset from the plate edge.
 * No borders or shadows; the photograph does the work, with a slight
 * zoom on hover.
 * A badge appears only when the product has a status worth flagging.
 */
export function ProductCard({ product }: { product: Product }) {
  const badge =
    getStockState(product) === "sold-out" ? "Sold out" : product.badge;

  return (
    <Link href={`/products/${product.slug}`} className="tile group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw"
          className="media-cover media-zoom"
        />
        {badge ? (
          <span className="badge bg-canvas text-ink absolute top-3 left-3 px-1.5 py-1">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="tile-label">
        <h3 className="decoration-1 underline-offset-[0.3em] group-hover:underline">
          {product.name}
        </h3>
        <p className="font-medium">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
