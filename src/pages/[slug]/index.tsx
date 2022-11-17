import { client } from "@/lib/client";
import { BLOG_ON_CATEGORY_QUERY, CATEGORIES_QUERY } from "@/lib/query";
import { BlogsConnection, Category, Edge, IMenu, Menu } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";

import { ArticleCard } from "@/components/shared/ArticleCard";

import { LayoutContainer } from "@/layouts/LayoutContainer";
import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";
import { getPlaiceholder } from "plaiceholder";

import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { MdCheckCircleOutline } from "react-icons/md";
import { BiChevronDown } from "react-icons/bi";

import { CategoryHero } from "@/components/pages/category/Hero";

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

const ORDERS = [
  {
    name: "Title",
    order: "title_DESC",
  },
  {
    name: "Published At",
    order: "publishedAt_DESC",
  },
];

const OrderSelect = ({
  order,
  onChange,
}: {
  order: "title_DESC" | "publishedAt_DESC";
  onChange: (order: "Title" | "Published At") => void;
}) => {
  const current =
    ORDERS[
      Math.max(
        0,
        ORDERS.findIndex((t) => t.order === order)
      )
    ];

  return (
    <div className="w-40">
      <Listbox value={order} onChange={onChange}>
        <div className="relative border dark:border-white/10 z-300 rounded-lg">
          <Listbox.Button className="inline-flex w-full justify-center items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white gap-2 focus-visible:ring-opacity-75">
            <span>{current!.name}</span>
            <BiChevronDown className="w-6 h-6" />
          </Listbox.Button>
          <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md mt-2 py-1 text-base shadow-lg dark:bg-black">
            {ORDERS.map((order) => (
              <Listbox.Option
                key={order.name}
                value={order.name}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "opacity-100" : "opacity-80"
                  }`
                }
              >
                {({ selected }) => (
                  <div className="inline-flex gap-4">
                    <span
                      className={`block truncate ${
                        selected ? "font-bold" : "font-normal"
                      }`}
                    >
                      {order.name.toLowerCase()}
                    </span>

                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MdCheckCircleOutline
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
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
          {initialHasNextPage ||
            (data?.blogsConnection.pageInfo.hasNextPage && (
              <button
                disabled={loading}
                className="bg-brand px-2.5 py-1.5 text-white rounded-md my-6 lg:my-8 disabled:cursor-not-allowed"
                onClick={() => {
                  setCount((c) => c + 4);
                  fetch();
                }}
              >
                {loading ? "loading..." : "Load more"}
              </button>
            ))}
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
