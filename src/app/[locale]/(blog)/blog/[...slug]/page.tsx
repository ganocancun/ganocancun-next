import NotFoundMessage from "components/NotFoundMessage";
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from "lib/sanity.client";

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

export async function generateMetadata(): Promise<Metadata> {
  const url = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    openGraph: {
      type: "article",
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogUrl.toString()],
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
  // console.log(post)
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
      </div>

      <Separator className="my-10" />

      <PostBody content={post.content} />

      <div className="flex justify-center py-5">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          See all posts<span className="sr-only">See all posts</span>
        </Link>
      </div>
    </Shell>
  );
}
