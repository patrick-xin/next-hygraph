import cn from "clsx";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Blog } from "@/lib/types";
import Link from "next/link";
import { ColTitle } from "./ColTitle";

type Props = {
  title: string;
  posts: Blog[];
  slug: string;
  className: string;
  imgSize?: "vertical" | "horizontal";
  grid?: boolean;
};

export const Column = ({
  title,
  slug,
  posts,
  className,
  imgSize,
  grid = false,
}: Props) => {
  return (
    <div className={cn("my-6 md:my-12 p-2 lg:p-0", [className && className])}>
      <ColTitle title={title} />
      <div
        className={cn([
          grid && "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1",
        ])}
      >
        {posts.map((blog) => (
          <ArticleCard key={blog.id} {...blog} imgSize={imgSize} />
        ))}
      </div>
      <Link
        className="text-xl text-brand underline underline-offset-2 decoration-brand"
        href={`/${slug}`}
      >
        View more {title}
      </Link>
    </div>
  );
};
