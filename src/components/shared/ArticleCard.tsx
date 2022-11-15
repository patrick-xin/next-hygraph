import { Blog } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";
import cn from "clsx";

import { AuthorAvatar } from "./AuthorAvatar";
import { PublishDate } from "./PublishDate";
import { ReadMore } from "./ReadMore";

type FeaturedArticleProps = Pick<
  Blog,
  "title" | "author" | "coverImage" | "excerpt" | "slug" | "publishedAt"
>;

type Props = {
  hasAuthor?: boolean;
  hasDate?: boolean;
  imgSize?: "vertical" | "horizontal";
  dateFormat?: "normal" | "distance";
} & FeaturedArticleProps;

export const ArticleCard = ({
  title,
  coverImage,
  author,
  excerpt,
  slug,
  publishedAt,
  hasAuthor = true,
  hasDate = false,
  dateFormat,
  imgSize = "horizontal",
}: Props) => {
  const sizes = {
    vertical: "lg:h-[26rem] xl:h-[30rem]",
    horizontal: "md:w-full",
  };

  return (
    <div className={cn("flex flex-col gap-6 py-6")}>
      <div className={cn("w-full relative h-[18rem] block", [sizes[imgSize]])}>
        <Image
          src={coverImage.url}
          fill
          alt="img"
          className="object-cover w-max rounded"
          placeholder={coverImage.blurDataUrl ? "blur" : "empty"}
          blurDataURL={coverImage.blurDataUrl}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="my-4 space-y-2 max-w-2xl lg:space-y-4">
        <PublishDate publishedAt={publishedAt} />

        <h2 className="font-semibold text-2xl lg:text-3xl hover:underline capitalize">
          <Link href={`/article/${slug}`}>{title}</Link>
        </h2>
        {hasAuthor && (
          <AuthorAvatar
            author={author}
            publishedAt={publishedAt}
            size="sm"
            dateFormat={dateFormat}
            hasDate={hasDate}
          />
        )}

        <p className="text-base lg:text-lg text-gray-800 dark:text-gray-200 my-2 line-clamp-2 md:my-4 lg:my-6">
          {excerpt}
        </p>

        <ReadMore href={`/article/${slug}`} />
      </div>
    </div>
  );
};
