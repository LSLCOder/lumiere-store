import Image from "next/image";
import type { ProductImage } from "@/types/product";
import { ButtonLink } from "@/components/ui/button";

type HeroProps = {
  image: ProductImage;
  /** Each entry is one line of the statement; lines fade up in turn. */
  lines: string[];
  /** One plain sentence under the statement. */
  summary: string;
  cta: { href: string; label: string };
};

/**
 * Opening campaign image, edge to edge and nearly a full screen tall.
 * `hero-overlay` slides it under the header, which stays transparent
 * until the hero has scrolled past. Carries the page's one `.display`
 * statement, so pick a dark photograph: the type is thin.
 */
export function Hero({ image, lines, summary, cta }: HeroProps) {
  return (
    <section className="hero-overlay tile h-svh max-h-[60rem] min-h-[32rem] text-white">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="media-cover"
      />
      <div className="media-scrim absolute inset-0" />
      <div className="container-wide absolute inset-x-0 bottom-0 flex flex-col gap-6 pb-8 md:flex-row md:items-end md:justify-between md:pb-14">
        <div>
          <h1 className="display">
            {lines.map((line) => (
              <span key={line} className="rise-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-caption mt-3 max-w-[22rem]">{summary}</p>
        </div>
        <ButtonLink
          href={cta.href}
          variant="light"
          className="self-start md:self-auto"
        >
          {cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
