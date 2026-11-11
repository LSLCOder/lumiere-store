import type { Collection } from "@/types/product";
import { unsplash } from "./images";

// Placeholder collections, one per product category. They link to the full
// shop until category filtering exists.
const collections: Collection[] = [
  {
    slug: "linen",
    name: "Linen",
    summary: "Washed bedding and throws in undyed tones.",
    href: "/products",
    image: {
      src: unsplash("1623421536496-cbc71288bfbd", 1400),
      alt: "A bed dressed in linen with a blanket and a vase of flowers",
    },
  },
  {
    slug: "stoneware",
    name: "Stoneware",
    summary: "Hand-thrown vessels, glazed in small batches.",
    href: "/products",
    image: {
      src: unsplash("1631125915902-d8abe9225ff2", 1400),
      alt: "Three clay vases grouped on a concrete plinth",
    },
  },
  {
    slug: "candles",
    name: "Candles",
    summary: "Soy and pillar candles with a long, even burn.",
    href: "/products",
    image: {
      src: unsplash("1707839568483-9f1924d5f5de", 1400),
      alt: "A candle resting on a block of wood",
    },
  },
];

export function getCollections(): Collection[] {
  return collections;
}
