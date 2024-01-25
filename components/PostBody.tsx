"use client";

/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import {
  PortableText,
  type PortableTextReactComponents,
} from "@portabletext/react";
import ReactPlayer from "react-player";

import styles from "./PostBody.module.css";
import { SanityImage } from "./SanityImage";

interface PostBodyProps {
  content: any; // Aquí puedes especificar un tipo más preciso si lo conoces
  youtube?: {
    url: string;
  }; // Haciendo 'youtube' opcional
}

// Serializadores para tipos de contenido específicos
const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />;
    },
    youtube: ({ value }) => {
      const { url } = value;
      return <ReactPlayer url={url} controls={true} />;
    },
  },
};

export default function PostBody({ content, youtube }: PostBodyProps) {
  console.log("Content:", youtube);
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      {youtube && <ReactPlayer url={youtube.url} controls={true} />}
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  );
}
