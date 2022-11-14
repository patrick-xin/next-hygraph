import { client } from "@/lib/client";
import { ABOUT_PAGE_QUERY } from "@/lib/query";
import { AboutPageData, Author, IMenu, Menu } from "@/lib/types";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import bgimg from "../../public/light.jpg";
import { EmbedProps } from "@graphcms/rich-text-types";

import { GetStaticProps } from "next";
import { Main } from "@/templates/Main";
import { Meta } from "@/layouts/Meta";
import { AuthorAvatar } from "@/components/shared/AuthorAvatar";
import { LayoutContainer } from "@/layouts/LayoutContainer";

type Props = {
  about: AboutPageData;
  menu: Menu;
};

const AboutPage = ({ about, menu }: Props) => {
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
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl md:my-6 md:text-center">
            About us
          </h1>
          <p className="text-2xl font-semibold text-center font-display my-6">
            {about.description}
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 md:gap-8 border-b-2 border-brand py-6 lg:py-12 lg:gap-12 md:border-none">
          <div className="relative w-full h-[40vh]">
            <Image src={bgimg} className="object-cover" fill alt="image" />
          </div>

          <div>
            <div className="italic text-sm mt-6">Newspaper from scratch</div>
            <h3 className="text-3xl my-5 md:text-4xl lg:text-5xl font-semibold">
              Our company creates with a hobby
            </h3>
            <div className="font-semibold text-lg my-2">Employed people</div>
            <div>
              <RichText
                content={about.team.json}
                references={about.team.references}
                renderers={{
                  embed: {
                    Author: (author: EmbedProps<Author>) => {
                      return (
                        <div className="mx-6">
                          <AuthorAvatar author={author} />
                        </div>
                      );
                    },
                  },
                  Asset: {
                    image: ({ url, width, height, blurDataUrl }) => {
                      return (
                        <Image
                          src={url}
                          alt="image"
                          width={width}
                          height={height}
                          placeholder={blurDataUrl ? "blur" : "empty"}
                          blurDataURL={blurDataUrl}
                        />
                      );
                    },
                  },

                  h1: ({ children }) => (
                    <h1 className="text-4xl font-black my-8">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold my-6 capitalize">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold my-4">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-lg my-6">{children}</p>
                  ),
                  a: ({ children, openInNewTab, href, ...rest }) => {
                    if (href!.match(/^https?:\/\/|^\/\//i)) {
                      return (
                        <a
                          className="text-brand underline underline-offset-1 decoration-brand font-semibold"
                          href={href}
                          target={openInNewTab ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          {...rest}
                        >
                          {children}
                        </a>
                      );
                    }

                    return <Link href={href!}>{children}</Link>;
                  },

                  img: ({ src, height, width }) => {
                    return (
                      <Image
                        src={src!}
                        alt="image"
                        height={height}
                        width={width}
                      />
                    );
                  },
                }}
              />
            </div>
            <p>
              We focus on and take care of the development of our articles,
              taking care of the highest level. Meet our creators and their
              biographies.
            </p>
          </div>
        </section>

        <section className="py-6 grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:py-12 lg:gap-12">
          <div>
            <div className="italic text-sm">Our mission</div>
            <h3 className="text-3xl my-5 md:text-4xl lg:text-5xl font-semibold">
              We always look to the future
            </h3>
            <p>
              We focus on and care for the development of our employees, taking
              care of the highest level of production. We provide constant and
              scientific work, focusing on benefit.
            </p>
          </div>
          <div className="relative w-full h-[40vh] mt-4">
            <Image src={bgimg} className="object-cover" fill alt="image" />
          </div>
        </section>
        <section className="py-6 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <h3 className="text-3xl my-5 md:text-4xl lg:text-5xl font-semibold">
              Evolution System
            </h3>
            <div>
              <p className="my-4">
                We have a modern STUDIO platform, where we can edit content and
                adjust our content for optimal display on any desktop and mobile
                device. The page loading speed is also optimized. Get to know
                our office and where to visit us. This is just an example of
                information about our activities.
              </p>
              <p>
                We are a company that has been operating on the market for over
                20 years. We have created many startup projects during this
                time. Our office is a process that we create all the time
              </p>
            </div>
          </div>
        </section>
        <section className="py-6 lg:py-12">
          <div className="relative w-full h-[40vh] lg:w-1/2">
            <Image src={bgimg} className="object-cover" fill alt="image" />
          </div>
          <div className="bg-[#333F36] text-white w-full lg:grid grid-cols-2 gap-10 lg:p-12">
            <div className="p-6">
              <h5 className="text-xl my-4">Daily Update</h5>
              <div>
                The frequency of adding new articles is very important and
                builds confidence that we will see something new with every
                visit.
              </div>
            </div>
            <div className="bg-[#404A41] p-6">
              <h5 className="text-xl my-4">Only reliable information</h5>
              <div>
                We try to provide only certain information, learn from
                experience and show our best side
              </div>
            </div>
          </div>
        </section>
      </LayoutContainer>
    </Main>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<{
    about: AboutPageData;
    menus: IMenu[];
  }>({
    query: ABOUT_PAGE_QUERY,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  const menu = data.menus.reduce((acc, menu) => {
    return { ...acc, [menu.label]: menu };
  }, {});

  return {
    props: {
      about: data.about,
      menu: menu,
    },
  };
};
