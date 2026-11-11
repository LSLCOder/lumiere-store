import Image from "next/image";
import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/utils";

/**
 * Product photographs as flush plates with a 1px seam. On small screens they
 * sit in a swipeable row, the next photo peeking in from the right; from md
 * they stack, so the page scrolls through them beside the product details.
 */
export function ProductGallery({
  images,
  badge,
  className,
}: {
  images: ProductImage[];
  /** Status shown on the first photo, as on the product card. */
  badge?: string;
  className?: string;
}) {
  const many = images.length > 1;

  return (
    <div
      role="group"
      aria-label="Product photos"
      className={cn(
        "flex snap-x snap-mandatory [scrollbar-width:none] gap-px overflow-x-auto md:flex-col md:overflow-visible",
        className,
      )}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "tile aspect-[4/5] shrink-0 snap-start md:w-full",
            many ? "w-[88%]" : "w-full",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 0}
            sizes="(min-width: 48rem) 58vw, 100vw"
            className="media-cover"
          />
          {badge && index === 0 ? (
            <span className="badge bg-canvas text-ink absolute top-3 left-3 px-1.5 py-1">
              {badge}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
