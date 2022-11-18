import { Author } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

import { PublishDate } from "./PublishDate";

type AuthorAvatarProps = {
  author: Author;
  dir?: "row" | "col";
  publishedAt?: string;
  hasTime?: boolean;
  hasDate?: boolean;
  size?: "sm" | "md" | "lg";
  dateFormat?: "normal" | "distance";
  path?: "author" | "writer";
};

export const AuthorAvatar = ({
  author,
  dir = "col",
  publishedAt,
  hasTime,
  size = "md",
  dateFormat = "normal",
  hasDate = false,
}: AuthorAvatarProps) => {
  const directions = {
    row: "flex-row justify-between w-full",
    col: "flex-col",
  };
  const sizes = {
    img: {
      sm: "h-12 w-12",
      md: "h-20 w-20",
      lg: "h-32 w-32",
    },
    font: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-3xl",
    },
  };
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12">
        <Image
          src={author.avatar.url}
          fill
          className="rounded-full object-cover"
          alt="author-avatar"
          sizes="48px"
        />
      </div>

      <div className={`flex ${directions[dir]} gap-1 flex-1`}>
        <div className="text-gray-700 dark:text-gray-300">
          <Link
            href={`/author/${author.slug}`}
            className={`${sizes.font[size]} font-semibold`}
          >
            {author.firstName} {author.lastName}
          </Link>
        </div>
        {publishedAt && hasDate && (
          <PublishDate publishedAt={publishedAt} dateFormat={dateFormat} />
        )}
        {publishedAt && hasTime && hasDate && (
          <PublishDate
            publishedAt={publishedAt}
            withHour
            dateFormat={dateFormat}
          />
        )}
      </div>
    </div>
  );
};
