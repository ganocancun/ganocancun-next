import { apiVersion, dataset, projectId, useCdn } from "lib/sanity.api";
import {
  allCategoriesQuery,
  indexQuery,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  postSlugsQuery,
  settingsQuery,
  type Post,
  type Settings,
} from "lib/sanity.queries";
import { createClient, type SanityClient } from "next-sanity";

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: "published",
  });
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts");
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    });
  }
  return client;
}

export const getSanityImageConfig = () => getClient();

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {};
}

export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(indexQuery)) || [];
}

type Category = {
  _id: string;
  title: string;
  slug: string;
  parentCategory?: Category | null; // Optional and nullable parentCategory
};

export async function getAllCategories(
  client: SanityClient,
): Promise<Category[]> {
  const categories = await client.fetch(allCategoriesQuery);
  return categories || []; // Return empty array if no categories found
}

export async function getPostsByCategory(
  client: SanityClient,
  slug: string,
): Promise<Post[]> {
  return (await client.fetch(postsByCategoryQuery, { slug })) || [];
}

export async function getAllPostsSlugs(): Promise<Pick<Post, "slug">[]> {
  const client = getClient();
  const slugs = (await client.fetch<string[]>(postSlugsQuery)) || [];
  return slugs.map((slug) => ({ slug }));
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any);
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(postAndMoreStoriesQuery, { slug });
}
