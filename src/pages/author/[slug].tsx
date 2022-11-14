import { client } from "@/lib/client";
import { AUTHORS_QUERY, BLOG_ON_AUTHOR_QUERY } from "@/lib/query";
import { Author, BlogsConnection, Edge, IMenu, Menu } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import { ArticleCard } from "@/components/shared/ArticleCard";
import { FetchMore } from "@/components/shared/FetchMore";

import { LayoutContainer } from "@/layouts/LayoutContainer";
import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

type Props = {
  mostRecentArticles: Edge[];
  articles: Edge[];
  slug: string;
  endCursor: string;
  initialHasNextPage: boolean;
  author: Author;
  menu: Menu;
};

const WriterPage = ({
  mostRecentArticles,
  articles,
  slug,
  endCursor,
  initialHasNextPage,
  author,
  menu,
}: Props) => {
  return (
    <Main
      menu={menu}
      meta={
        <Meta
          title={`Articles by ${author.firstName} ${author.lastName} - ${AppConfig.site_name} `}
          description={author.bio}
        />
      }
    >
      <LayoutContainer>
        <section className="md:p-6">
          <div className="flex-col items-center gap-6 lg:gap-12">
            <div className="flex lg:justify-center my-4">
              <div className="relative">
                <Image
                  src={author.avatar.url}
                  width={200}
                  height={200}
                  className="rounded-full object-cover h-24 w-24"
                  alt="author-avatar"
                />
              </div>
            </div>
            <div className="space-y-4 max-w-xl lg:mx-auto">
              <div className="lg:text-5xl text-4xl font-medium font-display lg:text-center">
                {author.firstName} {author.lastName}
              </div>
              <p className="lg:text-lg text-gray-700 dark:text-gray-300">
                {author.bio}
              </p>
            </div>
          </div>
        </section>
        <hr className="w-full my-8 block bg-brand h-[3px]" />
        <section>
          <h3 className="font-semibold text-2xl lg:text-3xl my-6">
            Recent articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 lg:grid-cols-3">
            {mostRecentArticles.map(({ node }) => (
              <ArticleCard {...node} key={node.id} hasAuthor={false} />
            ))}
            {articles.map(({ node }) => (
              <ArticleCard {...node} key={node.id} hasAuthor={false} />
            ))}
            {initialHasNextPage && (
              <FetchMore
                endCursor={endCursor}
                path={`/api/author/${slug}`}
                slug={slug}
                type="author"
                initialHasNextPage={initialHasNextPage}
              />
            )}
          </div>
        </section>
      </LayoutContainer>
    </Main>
  );
};

export default WriterPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ authors: Author[] }>({
    query: AUTHORS_QUERY,
  });

  const paths = data.authors.map((author) => ({
    params: { slug: author.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query<{
    blogsConnection: BlogsConnection;
    author: Author;
    menus: IMenu[];
  }>({
    query: BLOG_ON_AUTHOR_QUERY,
    variables: {
      first: 3,
      slug: params?.slug,
    },
  });
  const mostRecentArticles = data.blogsConnection.edges.slice(0, 3);
  const endCursor = data.blogsConnection.pageInfo.endCursor;
  const initialHasNextPage = data.blogsConnection.pageInfo.hasNextPage;
  const menu = data.menus.reduce((acc, menu) => {
    return { ...acc, [menu.label]: menu };
  }, {});

  return {
    props: {
      mostRecentArticles,
      articles: data.blogsConnection.edges.slice(3),
      slug: params?.slug,
      endCursor,
      initialHasNextPage,
      author: data.author,
      menu: menu,
    },
  };
};
