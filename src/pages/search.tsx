import { SEARCH_ARTICLE_QUERY, MENUS_QUERY } from "@/lib/query";
import { Author, Blog, IMenu, Menu } from "@/lib/types";

import { client } from "@/lib/client";
import { BiLoaderAlt } from "react-icons/bi";

import { GetStaticProps } from "next";
import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";
import { LayoutContainer } from "@/layouts/LayoutContainer";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { AuthorAvatar } from "@/components/shared/AuthorAvatar";

const SearchPage = ({ menu }: { menu: Menu }) => {
  const { query } = useRouter();
  const { data, loading, error } = useQuery<{
    blogs: Blog[];
    authors: Author[];
  }>(SEARCH_ARTICLE_QUERY, {
    variables: {
      query: query.q,
    },
  });

  return (
    <Main
      menu={menu}
      meta={
        <Meta
          title="Livingetc: Modern home design and style"
          description="The best in contemporary home design, interiors, travel and lifestyle"
        />
      }
    >
      <LayoutContainer>
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center p-6">
              <BiLoaderAlt className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-700/50 p-6 h-16 w-1/2">
              error loading data
            </div>
          ) : (
            <div className="space-y-6">
              <h1 className="text-3xl">
                Search Result for <span>"{query.q}"</span>
              </h1>
              <section className="my-6 space-y-6 py-4">
                <h2 className="text-2xl">
                  Authors:{" "}
                  <span className="text-3xl">{data?.authors.length}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {data?.authors.map((author) => (
                    <AuthorAvatar author={author} key={author.slug} />
                  ))}
                </div>
              </section>
              <hr className="w-full" />
              <section className="my-6 space-y-6">
                <h2 className="text-2xl">
                  Articles:{" "}
                  <span className="text-3xl">{data?.blogs.length}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data?.blogs.map((blog) => (
                    <ArticleCard key={blog.id} {...blog} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </LayoutContainer>
    </Main>
  );
};

export default SearchPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<{ menus: IMenu[] }>({
    query: MENUS_QUERY,
  });

  const menu = data.menus.reduce((acc, menu) => {
    return { ...acc, [menu.label]: menu };
  }, {});

  return {
    props: {
      menu,
    },
  };
};
