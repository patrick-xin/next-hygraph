import { client } from "@/lib/client";
import { BLOG_ON_CATEGORY_QUERY, CATEGORIES_QUERY } from "@/lib/query";
import { BlogsConnection, Category, Edge, IMenu, Menu } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import cn from "clsx";
import { ArticleCard } from "@/components/shared/ArticleCard";

import { LayoutContainer } from "@/layouts/LayoutContainer";
import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { getPlaiceholder } from "plaiceholder";

import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

import { CategoryHero } from "@/components/pages/category/Hero";
import { OrderSelect } from "@/components/pages/category/OrderSelect";
import { BreadCombs } from "@/components/navigation/BreadCombs";

type Props = {
  categoryName: string;
  seo: string;
  newest: Edge;
  articles: Edge[];
  slug: string;
  endCursor: string;
  initialHasNextPage: boolean;
  menu: Menu;
};

const CategoryPage = ({
  articles,
  slug,
  initialHasNextPage,
  menu,
  categoryName,
  seo,
}: Props) => {
  const [count, setCount] = useState(4);
  const [posts, setPosts] = useState(articles);
  const [post, setPost] = useState(articles[0]);
  const [order, setOrder] = useState<"title_DESC" | "publishedAt_DESC">(
    "publishedAt_DESC"
  );
  const [fetch, { data, loading }] = useLazyQuery<{
    blogsConnection: BlogsConnection;
  }>(BLOG_ON_CATEGORY_QUERY, {
    variables: {
      first: count,
      slug,
      order,
    },

    onCompleted: (data) => {
      setPosts(data.blogsConnection.edges);
      setPost(data.blogsConnection.edges[0]);
    },
  });
  const clientHasNextPage = data && data.blogsConnection.pageInfo.hasNextPage;

  const handleSelect = (order: "Title" | "Published At") => {
    if (order === "Title") {
      setOrder("title_DESC");
    }
    if (order === "Published At") {
      setOrder("publishedAt_DESC");
    }
    fetch();
  };

  return (
    <Main
      menu={menu}
      meta={
        <Meta
          title={`${AppConfig.site_name} | ${categoryName}`}
          description={seo}
        />
      }
    >
      <LayoutContainer>
        <div className="max-w-6xl mx-auto my-6">
          <BreadCombs label={slug.split("-").join(" ")} href={`/${slug}`} />
        </div>

        <h1 className="text-3xl lg:text-6xl font-bold text-center my-12 uppercase">
          {slug.split("-").join(" ")}
        </h1>
        {post && <CategoryHero article={post.node} />}

        <section>
          <div className="flex w-full justify-end">
            <OrderSelect order={order} onChange={handleSelect} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:hidden">
              {post && <ArticleCard {...post.node} />}
            </div>
            {posts.slice(1).map(({ node }) => (
              <ArticleCard {...node} key={node.id} />
            ))}
          </div>
        </section>
        <div>
          {initialHasNextPage && (
            <button
              disabled={loading}
              className={cn(
                "bg-brand px-2.5 py-1.5 text-white rounded-md my-6 lg:my-8 disabled:cursor-not-allowed",
                {
                  hidden: clientHasNextPage !== undefined,
                }
              )}
              onClick={() => {
                setCount((c) => c + 4);
                fetch();
              }}
            >
              {loading ? "loading..." : "Load more"}
            </button>
          )}
        </div>
      </LayoutContainer>
    </Main>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ categories: Category[] }>({
    query: CATEGORIES_QUERY,
  });

  const paths = data.categories.map((c) => ({
    params: { slug: c.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query<{
    categories: Category[];
    blogsConnection: BlogsConnection;
    menus: IMenu[];
  }>({
    query: BLOG_ON_CATEGORY_QUERY,
    variables: {
      first: 4,
      slug: params?.slug,
      order: "publishedAt_DESC",
    },
  });

  const endCursor = data.blogsConnection.pageInfo.endCursor;
  const initialHasNextPage = data.blogsConnection.pageInfo.hasNextPage;
  const menu = data.menus.reduce((acc, menu) => {
    return { ...acc, [menu.label]: menu };
  }, {});
  const category = data.categories.filter((c) => c.slug === params!.slug)[0];

  const categoryName = category?.name;
  const seo = category?.seo;
  const articlesWithBurDataUrl = data.blogsConnection.edges;
  await Promise.all(
    articlesWithBurDataUrl.map(async (article) => {
      const { base64 } = await getPlaiceholder(article.node.coverImage.url);
      const data = {
        ...article,
        node: {
          ...article.node,
          coverImage: { ...article.node.coverImage, blurDataUrl: base64 },
        },
      };

      return data;
    })
  );

  return {
    props: {
      categories: data.categories,
      articles: articlesWithBurDataUrl,
      slug: params?.slug,
      endCursor,
      initialHasNextPage,
      menu,
      categoryName,
      seo,
    },
  };
};
