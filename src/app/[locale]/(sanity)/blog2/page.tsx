"use client";

import type { GetStaticProps } from "next";
import type { SharedPageProps } from "~/pages/_app";
import IndexPage from "components/IndexPage";
import PreviewIndexPage from "components/PreviewIndexPage";
import { readToken } from "lib/sanity.api";
import { getAllPosts, getClient, getSettings } from "lib/sanity.client";
import type { Post, Settings } from "lib/sanity.queries";

interface PageProps extends SharedPageProps {
  posts: Post[];
  settings: Settings;
}

interface Query {
  [key: string]: string;
}

export default function Page(props: PageProps) {
  const { posts, settings, draftMode } = props;
  if (draftMode) {
    return <PreviewIndexPage posts={posts} settings={settings} />;
  }

  return <IndexPage posts={posts} settings={settings} />;
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx;
  // const client = getClient(draftMode ? { token: readToken } : undefined);
  const client = getClient();

  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ]);

  console.log("Settings y posts:", settings, posts); // Para depuración

  return {
    props: {
      posts,
      settings,
      draftMode,
      token: draftMode ? readToken : "",
    },
  };
};
