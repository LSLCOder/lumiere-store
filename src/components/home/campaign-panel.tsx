import Image from "next/image";
import Link from "next/link";
import type { ProductImage } from "@/types/product";
import { cn } from "@/lib/utils";

type CampaignPanelProps = {
  href: string;
  image: ProductImage;
  title: string;
  summary?: string;
  /** Text of the underlined link; say where it goes ("Shop linen"). */
  cta: string;
  /** `sizes` for the image, matching how wide the panel is laid out. */
  sizes: string;
  /** Heading level for the title, to fit the surrounding outline. */
  heading?: "h2" | "h3";
  className?: string;
};

/**
 * Full-bleed photograph with a caption and link over a bottom scrim.
 * The whole panel is one link. Give it a size with `className`
 * (an aspect ratio, or let a grid cell stretch it).
 */
export function CampaignPanel({
  href,
  image,
  title,
  summary,
  cta,
  sizes,
  heading: Heading = "h3",
  className,
}: CampaignPanelProps) {
  return (
    <Link href={href} className={cn("tile group block text-white", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="media-cover media-zoom"
      />
      <div className="media-scrim absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <Heading className="text-title">{title}</Heading>
        {summary ? (
          <p className="text-caption mt-1 max-w-[18rem]">{summary}</p>
        ) : null}
        <span className="link-cta mt-4 inline-block group-hover:decoration-transparent">
          {cta}
        </span>
      </div>
    </Link>
  );
}
