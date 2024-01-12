import type { Option } from "~/types";

import type { Product } from "~/data/db/schema";

export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
];

export const productCategories = [
  {
    title: "ganoexcel",
    image: "/images/skateboard-one.webp",
    subcategories: [
      {
        title: "Café",
        description: "El Café Saludable de Ganoexcel",
        image: "/images/deck-one.webp",
        slug: "cafe",
      },
      {
        title: "Suplementos",
        description: "Suplementos Alimentcicios",
        image: "/images/deck-one.webp",
        slug: "suplementos",
      },
    ],
  },
] satisfies {
  title: Product["category"];
  image: string;
  subcategories: {
    title: string;
    description?: string;
    image?: string;
    slug: string;
  }[];
}[];

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
];

export function getSubcategories(category?: string): Option[] {
  if (!category) return [];

  const subcategories =
    productCategories
      .find((c) => c.title === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? [];

  return subcategories;
}
