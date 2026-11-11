export type ProductImage = {
  src: string;
  /** Describes the photo for screen readers. */
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Price in the smallest currency unit (e.g. cents). */
  price: number;
  currency: string;
  category: string;
  image: ProductImage;
  /** Further photos for the product page, shown after `image`. */
  gallery?: ProductImage[];
  /** Short status shown on the product photo, e.g. "New". Most have none. */
  badge?: string;
  /** Units available. 0 means sold out. */
  stock: number;
  material: string;
  dimensions: string;
  care: string;
};

export type StockState = "in-stock" | "low-stock" | "sold-out";

/** A merchandised group of products, shown as an editorial panel. */
export type Collection = {
  slug: string;
  name: string;
  /** One short line shown under the name. */
  summary: string;
  href: string;
  image: ProductImage;
};
