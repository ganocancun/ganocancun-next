import NotFoundMessage from "components/NotFoundMessage";
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getPostBySlug,
  getSettings,
} from "lib/sanity.client";
import { urlForImage } from "lib/sanity.image";

import "~/styles/mdx.css";

import { type Metadata } from "next";
import { cn } from "~/utils";
import PostBody from "components/PostBody";
import PostHeader from "components/PostHeader";

import { env } from "~/env.mjs";
import { Icons } from "~/islands/icons";
import { buttonVariants } from "~/islands/primitives/button";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link } from "~/navigation";

interface PostPageProperties {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProperties): Promise<Metadata> {
  const client = getClient();
  const [post] = await Promise.all([
    getPostBySlug(client, params.slug[0] || "default-slug"),
  ]);

  if (!post) return {};

  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage).height(630).width(1200).url()
    : "/og-image.png"; // Imagen por defecto
  const description =
    post.metadescription || post.excerpt || post.content?.slice(0, 165);

  const categories = post.categories?.length
    ? post.categories.map((category) => category.title)
    : [];
  const tags = post.tags?.length ? post.tags.map((tag) => tag.title) : [];
  const keywords = [...categories, ...tags].join(", ");
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    title: post.title,
    description: description,
    keywords,
    openGraph: {
      type: "article",
      title: post.title,
      description: description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const client = getClient();
  const [settings, { post, morePosts }] = await Promise.all([
    getSettings(client),
    getPostAndMoreStories(client, params.slug[0] || "default-slug"),
  ]);
  if (!post) {
    return <NotFoundMessage />;
  }
  return (
    <Shell as="article" variant="markdown">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        {/* Categorías */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <Icons.folder className="h-5 w-5" /> {/* Icono de categoría */}
            {post.categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="text-blue-600 hover:underline"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-10" />

      <PostBody content={post.content} />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Icons.tag className="h-5 w-5" /> {/* Icono de tag */}
          {post.tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="text-blue-600 hover:underline"
            >
              {tag.title}
            </Link>
          ))}
        </div>
      )}

      <div className="flex justify-center py-5">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Ver todos los posts<span className="sr-only">See all posts</span>
        </Link>
      </div>
    </Shell>
  );
}
