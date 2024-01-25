import { type Metadata } from "next";
import { toPlainText } from "@portabletext/react";
import HeroPost from "components/HeroPost";
import MoreStories from "components/MoreStories";
import { getAllPosts, getClient, getSettings } from "lib/sanity.client";

import { fullURL } from "~/data/meta/builder";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Button } from "~/islands/primitives/button";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell-variants";

const client = getClient();
const [settings, posts = []] = await Promise.all([
  getSettings(client),
  getAllPosts(client),
]);

const descriptionPlainText = toPlainText(settings.description);

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: settings.title,
  description: descriptionPlainText,
};

export default function BlogPage() {
  const [heroPost, ...morePosts] = posts || [];
  return (
    <Shell className="md:pb-10">
      <PageHeader id="blog-header" aria-labelledby="blog-header-heading">
        <PageHeaderHeading>{settings.title}</PageHeaderHeading>
        <PageHeaderDescription>{descriptionPlainText}</PageHeaderDescription>
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
