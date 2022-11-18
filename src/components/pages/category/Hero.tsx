import { AuthorAvatar } from "@/components/shared/AuthorAvatar";
import { Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export const CategoryHero = ({ article }: { article: Blog }) => {
  return (
    <section className="hidden lg:block max-w-6xl mx-auto relative mb-40">
      <div className="h-[50vh] z-10 relative">
        <Image
          priority
          src={article.coverImage.url}
          alt="img"
          fill
          className="rounded object-cover"
          placeholder={article.coverImage.blurDataUrl ? "blur" : "empty"}
          blurDataURL={article.coverImage.blurDataUrl}
        />
      </div>
      <div className="absolute -bottom-16 p-8 z-20 right-0 left-0 mx-auto bg-white/90 dark:bg-black/70 bg-opacity-90 shadow w-5/6 flex justify-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">
            <Link className="hover:underline" href={`/article/${article.slug}`}>
              {article.title}
            </Link>
          </h2>
          <p>{article.excerpt}</p>
          <AuthorAvatar
            author={article.author}
            publishedAt={article.publishedAt}
          />
        </div>
      </div>
    </section>
  );
};
