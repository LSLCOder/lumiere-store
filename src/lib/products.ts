import type { Product, StockState } from "@/types/product";
import { unsplash } from "./images";

// Placeholder catalog. Swap this out for a real data source later.
const products: Product[] = [
  {
    id: "1",
    slug: "linen-throw",
    name: "Linen Throw",
    description: "A lightweight stonewashed linen throw for everyday use.",
    price: 8900,
    currency: "USD",
    category: "Linen",
    image: {
      src: unsplash("1770036093292-81a073b107ca", 1600),
      alt: "A neatly made bed with a grey linen throw folded across it",
    },
    gallery: [
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
    id: "2",
    slug: "ceramic-vase",
    name: "Ceramic Vase",
    description: "Hand-thrown stoneware vase with a matte glaze.",
    price: 5400,
    currency: "USD",
    category: "Stoneware",
    image: {
      src: unsplash("1643569556871-91ec60671ed7", 1600),
      alt: "A rounded white ceramic vase on a marble plinth",
    },
    gallery: [
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
    id: "3",
    slug: "soy-candle",
    name: "Soy Candle",
    description: "Slow-burning soy wax candle with notes of cedar and fig.",
    price: 3200,
    currency: "USD",
    category: "Candles",
    image: {
      src: unsplash("1612179543058-ab74d388e0ce", 1600),
      alt: "A white candle in a clear glass holder",
    },
    gallery: [
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
    id: "4",
    slug: "stoneware-mug-pair",
    name: "Stoneware Mug, Set of Two",
    description:
      "Two unglazed stoneware mugs with a fine, slightly sandy texture.",
    price: 4600,
    currency: "USD",
    category: "Stoneware",
    image: {
      src: unsplash("1766848482243-4379ac576b1d", 1600),
      alt: "Two unglazed ceramic mugs on a textured surface",
    },
    stock: 18,
    material: "Stoneware, glazed inside only",
    dimensions: "300 ml each, 8 cm tall",
    care: "Dishwasher safe",
  },
  {
    id: "5",
    slug: "lidded-jar",
    name: "Lidded Jar",
    description: "A rustic lidded jar for salt, tea or whatever needs keeping.",
    price: 7800,
    currency: "USD",
    category: "Stoneware",
    image: {
      src: unsplash("1782351287912-04b98a7ed3d1", 1600),
      alt: "A rustic ceramic pot and its lid on a wooden surface",
    },
    gallery: [
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
    id: "6",
    slug: "dinner-plates",
    name: "Dinner Plates, Set of Four",
    description: "Wide-rimmed plates in a soft white glaze, made to stack.",
    price: 9600,
    currency: "USD",
    category: "Stoneware",
    image: {
      src: unsplash("1612058060757-aa8f7f66e687", 1600),
      alt: "White ceramic plates on a wooden table",
    },
    stock: 11,
    material: "Stoneware, white glaze",
    dimensions: "27 cm across",
    care: "Dishwasher safe",
  },
  {
    id: "7",
    slug: "pillar-candle",
    name: "Pillar Candle",
    description: "An unscented pillar candle with a long, even burn.",
    price: 2400,
    currency: "USD",
    category: "Candles",
    image: {
      src: unsplash("1611520244036-b8a14615ac07", 1600),
      alt: "A white candle on a white ceramic holder",
    },
    gallery: [
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
    id: "8",
    slug: "linen-sheet-set",
    name: "Linen Sheet Set",
    description: "Washed linen sheets that soften further with every wash.",
    price: 24800,
    currency: "USD",
    category: "Linen",
    image: {
      src: unsplash("1762199904164-fff3ac17fc9e", 1600),
      alt: "A rumpled white linen sheet on a bed",
    },
    gallery: [
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

/** At or below this many units, the product page says how many are left. */
const LOW_STOCK_THRESHOLD = 5;

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Other products to show under a product: same category first. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((other) => other.id !== product.id);
  return [
    ...others.filter((other) => other.category === product.category),
    ...others.filter((other) => other.category !== product.category),
  ].slice(0, limit);
}

export function getStockState(product: Product): StockState {
  if (product.stock <= 0) return "sold-out";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}
