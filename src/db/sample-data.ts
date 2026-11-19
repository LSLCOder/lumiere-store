import { unsplash } from "../lib/images";
import type { ProductImage } from "../types/product";

// Sample catalog written to the database by `npm run db:seed`.
// The storefront never imports this file; it reads the database.

type SampleCategory = {
  slug: string;
  name: string;
  summary: string;
  image: ProductImage;
};

type SampleProduct = {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  categorySlug: string;
  images: ProductImage[];
  badge?: string;
  stock: number;
  material: string;
  dimensions: string;
  care: string;
};

/** In homepage panel order (rows are shown in the order they were added). */
export const sampleCategories: SampleCategory[] = [
  {
    slug: "linen",
    name: "Linen",
    summary: "Washed bedding and throws in undyed tones.",
    image: {
      src: unsplash("1623421536496-cbc71288bfbd", 1400),
      alt: "A bed dressed in linen with a blanket and a vase of flowers",
    },
  },
  {
    slug: "stoneware",
    name: "Stoneware",
    summary: "Hand-thrown vessels, glazed in small batches.",
    image: {
      src: unsplash("1631125915902-d8abe9225ff2", 1400),
      alt: "Three clay vases grouped on a concrete plinth",
    },
  },
  {
    slug: "candles",
    name: "Candles",
    summary: "Soy and pillar candles with a long, even burn.",
    image: {
      src: unsplash("1707839568483-9f1924d5f5de", 1400),
      alt: "A candle resting on a block of wood",
    },
  },
];

/** In shop order. */
export const sampleProducts: SampleProduct[] = [
  {
    slug: "linen-throw",
    name: "Linen Throw",
    description: "A lightweight stonewashed linen throw for everyday use.",
    priceCents: 8900,
    currency: "USD",
    categorySlug: "linen",
    images: [
      {
        src: unsplash("1770036093292-81a073b107ca", 1600),
        alt: "A neatly made bed with a grey linen throw folded across it",
      },
      {
        src: unsplash("1623421536496-cbc71288bfbd", 1600),
        alt: "A bed dressed in linen with a blanket and a vase of flowers",
      },
    ],
    stock: 14,
    material: "100% European flax linen",
    dimensions: "130 × 180 cm",
    care: "Machine wash cool, line dry",
  },
  {
    slug: "ceramic-vase",
    name: "Ceramic Vase",
    description: "Hand-thrown stoneware vase with a matte glaze.",
    priceCents: 5400,
    currency: "USD",
    categorySlug: "stoneware",
    images: [
      {
        src: unsplash("1643569556871-91ec60671ed7", 1600),
        alt: "A rounded white ceramic vase on a marble plinth",
      },
      {
        src: unsplash("1631125915902-d8abe9225ff2", 1600),
        alt: "Three clay vases grouped on a concrete plinth",
      },
    ],
    stock: 3,
    material: "Stoneware, matte glaze",
    dimensions: "18 cm tall, 14 cm wide",
    care: "Wipe clean with a damp cloth",
  },
  {
    slug: "soy-candle",
    name: "Soy Candle",
    description: "Slow-burning soy wax candle with notes of cedar and fig.",
    priceCents: 3200,
    currency: "USD",
    categorySlug: "candles",
    images: [
      {
        src: unsplash("1612179543058-ab74d388e0ce", 1600),
        alt: "A white candle in a clear glass holder",
      },
      {
        src: unsplash("1707839568483-9f1924d5f5de", 1600),
        alt: "A candle resting on a block of wood",
      },
    ],
    stock: 26,
    material: "Soy wax, cotton wick, glass",
    dimensions: "220 g, burns for about 45 hours",
    care: "Trim the wick to 5 mm before each burn",
  },
  {
    slug: "stoneware-mug-pair",
    name: "Stoneware Mug, Set of Two",
    description:
      "Two unglazed stoneware mugs with a fine, slightly sandy texture.",
    priceCents: 4600,
    currency: "USD",
    categorySlug: "stoneware",
    images: [
      {
        src: unsplash("1766848482243-4379ac576b1d", 1600),
        alt: "Two unglazed ceramic mugs on a textured surface",
      },
    ],
    stock: 18,
    material: "Stoneware, glazed inside only",
    dimensions: "300 ml each, 8 cm tall",
    care: "Dishwasher safe",
  },
  {
    slug: "lidded-jar",
    name: "Lidded Jar",
    description: "A rustic lidded jar for salt, tea or whatever needs keeping.",
    priceCents: 7800,
    currency: "USD",
    categorySlug: "stoneware",
    images: [
      {
        src: unsplash("1782351287912-04b98a7ed3d1", 1600),
        alt: "A rustic ceramic pot and its lid on a wooden surface",
      },
      {
        src: unsplash("1611013621103-91e10668a120", 1600),
        alt: "A potter holding a freshly thrown white clay pot",
      },
    ],
    badge: "New",
    stock: 9,
    material: "Stoneware, ash glaze",
    dimensions: "12 cm tall, 11 cm wide",
    care: "Hand wash",
  },
  {
    slug: "dinner-plates",
    name: "Dinner Plates, Set of Four",
    description: "Wide-rimmed plates in a soft white glaze, made to stack.",
    priceCents: 9600,
    currency: "USD",
    categorySlug: "stoneware",
    images: [
      {
        src: unsplash("1612058060757-aa8f7f66e687", 1600),
        alt: "White ceramic plates on a wooden table",
      },
    ],
    stock: 11,
    material: "Stoneware, white glaze",
    dimensions: "27 cm across",
    care: "Dishwasher safe",
  },
  {
    slug: "pillar-candle",
    name: "Pillar Candle",
    description: "An unscented pillar candle with a long, even burn.",
    priceCents: 2400,
    currency: "USD",
    categorySlug: "candles",
    images: [
      {
        src: unsplash("1611520244036-b8a14615ac07", 1600),
        alt: "A white candle on a white ceramic holder",
      },
      {
        src: unsplash("1642080071367-a5a99c87bea4", 1600),
        alt: "A lit candle beside a wooden bowl on a table",
      },
    ],
    stock: 0,
    material: "Rapeseed wax, cotton wick",
    dimensions: "15 cm tall, 7 cm wide",
    care: "Burn on a heatproof dish",
  },
  {
    slug: "linen-sheet-set",
    name: "Linen Sheet Set",
    description: "Washed linen sheets that soften further with every wash.",
    priceCents: 24800,
    currency: "USD",
    categorySlug: "linen",
    images: [
      {
        src: unsplash("1762199904164-fff3ac17fc9e", 1600),
        alt: "A rumpled white linen sheet on a bed",
      },
      {
        src: unsplash("1764867256379-3877b9cb5832", 1600),
        alt: "Soft fabric draped in dappled light",
      },
    ],
    badge: "New",
    stock: 6,
    material: "100% European flax linen",
    dimensions: "Queen: fitted sheet, flat sheet, two pillowcases",
    care: "Machine wash cool, line dry",
  },
];
