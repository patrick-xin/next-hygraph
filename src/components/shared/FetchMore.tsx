"use client";

import { useFetch } from "@/lib/hooks";
import { ArticleCard } from "./ArticleCard";

type Props = {
  endCursor: string;
  path: string;
  slug?: string;
  type: "author" | "category";
  initialHasNextPage: boolean;
};

export const FetchMore: React.FC<Props> = ({
  endCursor,
  path,
  slug,
  type,
  initialHasNextPage,
}) => {
  const { hasNextPage, fetchMore, data, isLoading, error } = useFetch({
    endCursor,
    path,
    slug,
    initialHasNextPage,
  });

  const render = () => {
    if (type === "category")
      return (
        <div>
          {data.map((d, index) => (
            <div
              key={index}
              className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {d.blogsConnection.edges.map(({ node }) => (
                <ArticleCard key={node.id} {...node} hasAuthor />
              ))}
            </div>
          ))}
        </div>
      );
    if (type === "author")
      return (
        <div>
          {data.map((d, index) => (
            <div key={index} className="divide-y divide-brand/50">
              {d.blogsConnection.edges.map(({ node }) => (
                <ArticleCard key={node.id} {...node} hasAuthor={false} />
              ))}
            </div>
          ))}
        </div>
      );
    return null;
  };
  return (
    <div className="w-full mx-auto my-4">
      {render()}
      <div className="flex justify-center w-full">
        {hasNextPage && (
          <button
            disabled={!hasNextPage}
            className="bg-brand px-2.5 py-1.5 text-white rounded-md my-6 lg:my-8 disabled:cursor-not-allowed"
            onClick={fetchMore}
          >
            {isLoading ? "loading..." : "Load more"}
          </button>
        )}

        {error && <div>{error}</div>}
      </div>
    </div>
  );
};
