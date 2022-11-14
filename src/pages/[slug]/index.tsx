import { client } from "@/lib/client";
import { BLOG_ON_CATEGORY_QUERY, CATEGORIES_QUERY } from "@/lib/query";
import { BlogsConnection, Category, Edge, IMenu, Menu } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import { AuthorAvatar } from "@/components/shared/AuthorAvatar";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { FetchMore } from "@/components/shared/FetchMore";
import Link from "next/link";
import { LayoutContainer } from "@/layouts/LayoutContainer";
import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

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
  newest,
  articles,
  slug,
  endCursor,
  initialHasNextPage,
  menu,
  categoryName,
  seo,
}: Props) => {
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
          {slug}
        </h1>
        <section className="hidden lg:block max-w-6xl mx-auto relative mb-40">
          <div className="h-[50vh] z-10">
            <Image
              src={newest.node.coverImage.url}
              alt="img"
              fill
              className="rounded object-cover"
            />
          </div>
          <div className="absolute -bottom-16 p-8 z-20 right-0 left-0 mx-auto bg-white bg-opacity-90 shadow w-5/6 flex justify-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                <Link
                  className="hover:underline"
                  href={`/article/${newest.node.slug}`}
                >
                  {newest.node.title}
                </Link>
              </h2>
              <p>{newest.node.excerpt}</p>
              <AuthorAvatar
                author={newest.node.author}
                publishedAt={newest.node.createdAt}
              />
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:hidden">
            <ArticleCard {...newest.node} />
          </div>
          {articles.map(({ node }) => (
            <ArticleCard {...node} key={node.id} />
          ))}
        </div>
        <FetchMore
          endCursor={endCursor}
          path={`/api/category/${slug}`}
          slug={slug}
          type="category"
          initialHasNextPage={initialHasNextPage}
        />
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
    },
  });

  const newest = data.blogsConnection.edges[0];
  const endCursor = data.blogsConnection.pageInfo.endCursor;
  const initialHasNextPage = data.blogsConnection.pageInfo.hasNextPage;
  const menu = data.menus.reduce((acc, menu) => {
    return { ...acc, [menu.label]: menu };
  }, {});
  const category = data.categories.filter((c) => c.slug === params!.slug)[0];

  const categoryName = category?.name;
  const seo = category?.seo;
  return {
    props: {
      categories: data.categories,
      newest,
      articles: data.blogsConnection.edges.slice(1),
      slug: params?.slug,
      endCursor,
      initialHasNextPage,
      menu,
      categoryName,
      seo,
    },
  };
};
