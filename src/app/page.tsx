import Image from "next/image";
import Link from "next/link";
import { CampaignPanel } from "@/components/home/campaign-panel";
import { Hero } from "@/components/home/hero";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { getCollections } from "@/lib/collections";
import { unsplash } from "@/lib/images";
import { getProducts } from "@/lib/products";

export default function Home() {
  const products = getProducts();
  const collections = getCollections();

  return (
    <>
      <Hero
        image={{
          src: unsplash("1642080071367-a5a99c87bea4", 2400),
          alt: "A lit candle beside a wooden bowl on a table",
        }}
        lines={["Linen, stoneware", "and candlelight."]}
        summary="Made in small batches, to be used every day."
        cta={{ href: "/products", label: "Shop the collection" }}
      />

      {/* One panel per category: stacked squares on small screens, three
          flush portrait panels from md. */}
      <section aria-label="Collections" className="grid md:grid-cols-3">
        {collections.map((collection) => (
          <CampaignPanel
            key={collection.slug}
            href={collection.href}
            image={collection.image}
            title={collection.name}
            summary={collection.summary}
            cta={`Shop ${collection.name.toLowerCase()}`}
            sizes="(min-width: 48rem) 34vw, 100vw"
            heading="h2"
            className="aspect-square md:aspect-[3/4]"
          />
        ))}
      </section>

      <section id="featured" aria-labelledby="featured-heading">
        <Container
          size="wide"
          className="flex items-baseline justify-between gap-4 pt-10 pb-6 md:pt-14"
        >
          <h2 id="featured-heading" className="headline">
            Featured pieces
          </h2>
          <Link href="/products" className="link-cta">
            View all {products.length}
          </Link>
        </Container>
        <ProductGrid
          products={products}
          feature={
            <CampaignPanel
              href="/products/linen-sheet-set"
              image={{
                src: unsplash("1764867256379-3877b9cb5832", 1600),
                alt: "Soft fabric draped in dappled light",
              }}
              title="The linen sheet set"
              summary="Washed linen that softens further with every wash."
              cta="See the set"
              sizes="(min-width: 64rem) 50vw, (min-width: 48rem) 67vw, 100vw"
              className="tile-feature aspect-[4/5] md:aspect-auto"
            />
          }
        />
      </section>

      {/* Image-led split: the photograph takes 7 of 12 columns from md. */}
      <section
        aria-labelledby="workshop-heading"
        className="grid md:grid-cols-12"
      >
        <div className="tile aspect-[4/3] md:col-span-7">
          <Image
            src={unsplash("1611013621103-91e10668a120", 1800)}
            alt="A potter holding a freshly thrown white clay pot"
            fill
            sizes="(min-width: 48rem) 58vw, 100vw"
            className="media-cover"
          />
        </div>
        <div className="bg-ink text-canvas flex flex-col justify-end px-4 py-10 md:col-span-5 md:p-6 lg:p-10">
          <h2 id="workshop-heading" className="headline">
            From the workshop
          </h2>
          <p className="mt-3 max-w-[26rem]">
            Each piece is thrown, trimmed and glazed by hand, so no two are
            quite the same.
          </p>
          <Link href="/products" className="link-cta mt-6 self-start">
            Shop stoneware
          </Link>
        </div>
      </section>
    </>
  );
}
