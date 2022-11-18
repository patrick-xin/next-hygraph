import { GetStaticPaths, GetStaticProps } from "next";
import { getPlaiceholder } from "plaiceholder";
import { Blog, IMenu, Menu } from "@/lib/types";
import { client } from "@/lib/client";
import { ARTICLE_QUERY, BLOGS_QUERY } from "@/lib/query";
import { LayoutContainer } from "@/layouts/LayoutContainer";
import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";

import { MainColumn } from "@/components/pages/article/MainColumn";
import { RecentColumn } from "@/components/pages/article/RecentColumn";

const PostPage = ({ post, menu }: { post: { blog: Blog }; menu: Menu }) => {
  return (
    <Main
      menu={menu}
      meta={<Meta title={post.blog.title} description={post.blog.excerpt} />}
    >
      <LayoutContainer>
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-6 gap-8 lg:gap-16">
            <MainColumn post={post.blog} />
            <RecentColumn post={post.blog} />
          </div>
        </div>
      </LayoutContainer>
    </Main>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ blogs: Blog[] }>({
    query: BLOGS_QUERY,
    variables: {
      first: 10,
    },
  });
  const paths = data.blogs.map((blog) => ({ params: { slug: blog.slug } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query<{ blog: Blog; menus: IMenu[] }>({
    query: ARTICLE_QUERY,
    variables: {
      slug: params?.slug,
    },
  });
  if (!data.blog) {
    return {
      notFound: true,
    };
  }

  const { base64 } = await getPlaiceholder(data.blog.coverImage.url);

  const withbBurDataUrl = {
    ...data,
    blog: {
      ...data.blog,
      coverImage: { ...data.blog.coverImage, blurDataUrl: base64 },
    },
  };

  const images = data.blog.content.references.filter((asset) =>
    asset.mimeType.includes("image")
  );

  await Promise.all(
    images.map(async (image) => {
      const { base64 } = await getPlaiceholder(image.url);
      return { ...image, blurDataUrl: base64 };
    })
  );
  const menu = data.menus.reduce((acc, menu) => {
    return { ...acc, [menu.label]: menu };
  }, {});

  return {
    props: {
      post: withbBurDataUrl,
      menu: menu,
    },
    revalidate: 10,
  };
};
