import Link from "next/link";
import AuthorAvatar from "components/AuthorAvatar";
import CoverImage from "components/CoverImage";
import Date from "components/PostDate";
import type { Post } from "lib/sanity.queries";

export default function HeroPost(
  props: Pick<
    Post,
    "title" | "coverImage" | "date" | "excerpt" | "author" | "slug"
  >,
) {
  const { title, coverImage, date, excerpt, author, slug } = props;
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          slug={slug || "default-slug"}
          title={title || "Default Title"}
          image={coverImage}
          priority
        />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/blog/${slug}`} className="hover:underline">
              {title || "Untitled"}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date || "Fecha por defecto"} />
          </div>
        </div>
        <div>
          {excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
          {author && (
            <AuthorAvatar name={author.name} picture={author.picture} />
          )}
        </div>
      </div>
    </section>
  );
}
