import { GetStaticProps } from "next";

import { Grid } from "@/components/shared/Grid";
import { Column } from "@/components/pages/home/Column";
import { Hero } from "@/components/Hero";

import { getPlaiceholder } from "plaiceholder";
import { Blog, Category, IMenu, Menu } from "@/lib/types";
import { client } from "@/lib/client";
import { HOME_PAGE_QUERY } from "@/lib/query";

import { LayoutContainer } from "@/layouts/LayoutContainer";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

import { About } from "@/components/pages/home/About";
import { AppConfig } from "@/utils/AppConfig";
import Card from "@/components/shared/Card";

type Props = {
  design_ideas_category: Category;
  shopping_category: Category;
  advice_category: Category;
  carousel: Blog[];
  menu: Menu;
};

const Index = ({
  design_ideas_category,
  shopping_category,
  advice_category,
  carousel,
  menu,
}: Props) => {
  return (
    <Main
      menu={menu}
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <Hero carousel={carousel} />

      <LayoutContainer>
        <Grid>
          <Column
            className="lg:p-0 lg:col-span-3"
            title={design_ideas_category.name}
            posts={design_ideas_category.blogs}
            slug={design_ideas_category.slug}
            imgSize="vertical"
          />
          <Column
            className="border-black/20 dark:border-white/90 md:pl-4 md:pr-2 lg:px-8 md:border-l lg:border-r lg:col-span-6 lg:col-start-4"
            title={shopping_category.name}
            posts={shopping_category.blogs}
            slug={shopping_category.slug}
          />
          <Column
            className="lg:col-start-10 lg:p-0 col-span-full"
            title={advice_category.name}
            posts={advice_category.blogs}
            slug={advice_category.slug}
            imgSize="vertical"
            grid
          />

          <About className="lg:hidden mb-8 md:col-span-full" />
        </Grid>
        <section className="grid grid-cols-2 md:grid-cols-3 gap-6 my-8">
          {design_ideas_category.blogs.map((article) => (
            <Card key={article.id} article={article} />
          ))}
        </section>
      </LayoutContainer>
    </Main>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<{
    categories: Category[];
    blogs: Blog[];
    menus: IMenu[];
  }>({
    query: HOME_PAGE_QUERY,
    variables: { first: 6 },
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  const design_ideas_category = data.categories.filter(
    (c) => c.slug === "design-ideas"
  )[0];
  const shopping_category = data.categories.filter(
    (c) => c.slug === "shopping"
  )[0];
  const advice_category = data.categories.filter(
    (c) => c.slug === "expert-advice"
  )[0];
  await Promise.all(
    design_ideas_category!.blogs.map(async (blog) => {
      const { base64 } = await getPlaiceholder(blog.coverImage.url);
      return {
        ...blog,
        coverImage: { ...blog.coverImage, blurDataUrl: base64 },
      };
    })
  );
  await Promise.all(
    shopping_category!.blogs.map(async (blog) => {
      const { base64 } = await getPlaiceholder(blog.coverImage.url);
      return {
        ...blog,
        coverImage: { ...blog.coverImage, blurDataUrl: base64 },
      };
    })
  );
  await Promise.all(
    advice_category!.blogs.map(async (blog) => {
      const { base64 } = await getPlaiceholder(blog.coverImage.url);
      return {
        ...blog,
        coverImage: { ...blog.coverImage, blurDataUrl: base64 },
      };
    })
  );
  await Promise.all(
    data.blogs.map(async (blog) => {
      const { base64 } = await getPlaiceholder(blog.coverImage.url);
      return {
        ...blog,
        coverImage: { ...blog.coverImage, blurDataUrl: base64 },
      };
    })
  );

  const menu = data.menus.reduce((acc, menu) => {
    return { ...acc, [menu.label]: menu };
  }, {});

  return {
    props: {
      design_ideas_category,
      shopping_category,
      advice_category,
      carousel: data.blogs,
      menu: menu,
    },
    revalidate: 10,
  };
};
