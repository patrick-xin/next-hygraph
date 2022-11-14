import { SEARCH_ARTICLE_QUERY } from "@/lib/query";
import { Blog, IMenu, Menu } from "@/lib/types";

import { client } from "@/lib/client";

import { GetServerSideProps } from "next";
import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";
import { LayoutContainer } from "@/layouts/LayoutContainer";

const SearchPage = ({ blogs, menu }: { blogs: Blog[]; menu: Menu }) => {
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
        {blogs.length === 0 ? (
          <div>No Resullts found</div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id}>
              <h2>{blog.title}</h2>
            </div>
          ))
        )}
      </LayoutContainer>
    </Main>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await client.query<{ blogs: Blog[]; menus: IMenu[] }>({
    query: SEARCH_ARTICLE_QUERY,
    variables: {
      query: query.q,
    },
  });

  const menu = data.menus.reduce((acc, menu) => {
    return { ...acc, [menu.label]: menu };
  }, {});

  return {
    props: {
      blogs: data.blogs,
      menu,
    },
  };
};
