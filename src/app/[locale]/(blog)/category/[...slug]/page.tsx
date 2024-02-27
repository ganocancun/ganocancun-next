import { type Metadata } from "next";
import { useRouter } from "next/router";
import { toPlainText } from "@portabletext/react";
import HeroPost from "components/HeroPost";
import MoreStories from "components/MoreStories";
import {
  getAllPosts,
  getClient,
  getPostsByCategory,
  getSettings,
} from "lib/sanity.client";

import { fullURL } from "~/data/meta/builder";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Button } from "~/islands/primitives/button";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell-variants";

interface CategoryPageProperties {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug?: string };
}) {
  if (!params.slug) {
    return <div>Categoría no encontrada</div>;
  }
  const slug = params.slug ? params.slug![params.slug.length - 1] : "noslug";

  const client = getClient();
  const posts = await getPostsByCategory(client, slug);
  const [heroPost, ...morePosts] = posts || [];

  return (
    <Shell className="md:pb-10">
      <PageHeader id="blog-header" aria-labelledby="blog-header-heading">
        <PageHeaderHeading>{params.slug}</PageHeaderHeading>
      </PageHeader>
      <Separator className="mb-2.5" />
      <section
        id="blog-posts"
        aria-labelledby="blog-posts-heading"
        // className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </section>
    </Shell>
  );
}
