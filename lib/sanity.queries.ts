import { groq } from "next-sanity";

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  metadescription,
  coverImage,
    "slug": slug.current,
  "author": author->{name, picture},
  "categories": categories[]->{
    title,
    "slug": slug.current,
    "parentCategory": parentCategory->{
      title,
      "slug": slug.current,
      "parentCategory": parentCategory->{
        title,
        "slug": slug.current
        // Puedes seguir anidando más si es necesario, pero ten en cuenta la eficiencia
      }
    }
  },
  "tags": tags[]->{
    title,
    "slug": slug.current
  }
`;

export const settingsQuery = groq`*[_type == "settings"][0]`;

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`;

export const postsByCategoryQuery = groq`
*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(date desc, _updatedAt desc) {
  ${postFields}
}
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    parentCategory->{
      _id,
      title,
      "slug": slug.current,
    }
  }
`;

export const categoryBySlugQuery = groq`
*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  parentCategory->{
    title,
    "slug": slug.current
  }
}
`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export interface Author {
  name?: string;
  picture?: any;
}

export interface Post {
  _id: string;
  title?: string;
  coverImage?: any;
  date?: string;
  _updatedAt?: string;
  excerpt?: string;
  author?: Author;
  slug?: string;
  content?: any;
  categories?: any;
  tags?: any;
  metadescription?: string;
}

export interface Settings {
  title?: string;
  description?: any[];
  ogImage?: {
    title?: string;
  };
}
