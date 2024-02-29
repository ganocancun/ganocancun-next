import { type Metadata } from "next";
import { toPlainText } from "@portabletext/react";
import {
  getAllCategories,
  getAllPosts,
  getClient,
  getSettings,
} from "lib/sanity.client";

import { fullURL } from "~/data/meta/builder";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell-variants";

const client = getClient();
const [settings, posts = [], categories = []] = await Promise.all([
  getSettings(client),
  getAllPosts(client),
  getAllCategories(client),
]);

// Transformar la estructura de categorías para la recursión:
const rootCategories = categories.filter(
  (category) => !category.parentCategory,
);
const structuredCategories = rootCategories.map((category) => ({
  ...category,
  children: categories.filter(
    (child) => child.parentCategory?._id === category._id,
  ),
}));

const descriptionPlainText = toPlainText(settings.description || []);

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Categorías del Blog",
  description:
    "Descubre las Categorías de artículos que manejamos en el Blog de Gano Excel Cancún.",
};

export default function BlogPage() {
  const [heroPost, ...morePosts] = posts || [];

  const getRecursiveHref = (category) => {
    let href = "/category";
    if (category.parentCategory) {
      href = getRecursiveHref(category.parentCategory);
    }
    return href + "/" + category.slug;
  };

  const renderCategory = (category) => (
    <li
      key={category._id}
      className="p-4 border border-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <a href={getRecursiveHref(category)}>{category.title}</a>
      <ul className="ml-4 space-y-2 hover:bg-green-100 dark:hover:bg-green-800">
        {category.children && category.children.map(renderCategory)}
      </ul>
    </li>
  );

  return (
    <Shell className="md:pb-10">
      <section id="categories" aria-labelledby="categories-heading">
        <h1 className="text-2xl font-semibold mb-4" id="categories-heading">
          Categorías
        </h1>
        <ul className="list-none p-0">
          {" "}
          {/* Reemplazando el grid con una lista */}
          {structuredCategories && structuredCategories.map(renderCategory)}
        </ul>
      </section>
      <Separator className="mb-2.5" />
      {/* ... Resto del contenido de la página */}
    </Shell>
  );
}
