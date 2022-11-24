import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
import { AuthorCard } from "@/components/shared/AuthorCard";
import { Blog } from "@/lib/types";
import { AuthorAvatar } from "@/components/shared/AuthorAvatar";

import { BreadCombs } from "@/components/navigation/BreadCombs";

export const MainColumn = ({ post }: { post: Blog }) => {
  return (
    <div className="col-span-4">
      <div className="max-w-3xl lg:mx-8 xl:mx-12 mt-4">
        <BreadCombs
          label={post.categories[0]!.name}
          href={`/${post.categories[0]!.slug}`}
        />
        <h1 className="text-3xl md:text-4xl font-bold lg:text-5xl my-6 lg:leading-tight lg:mt-20 lg:tracking-wide whitespace-normal capitalize">
          {post.title}
        </h1>
        <p className="text-gray-700 my-6 text-lg lg:text-xl lg:my-10 dark:text-gray-300">
          {post.excerpt}
        </p>
        <AuthorAvatar
          author={post.author}
          hasDate
          publishedAt={post.publishedAt}
        />
      </div>

      <div className="my-6 relative min-h-[50vh] lg:my-10">
        <Image
          src={post.coverImage.url}
          fill
          alt="image-cover"
          className="object-cover rounded"
          blurDataURL={post.coverImage.blurDataUrl}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
      <div className="lg:mx-8 xl:m-12">
        <RichText
          content={post.content.json}
          references={post.content.references}
          renderers={{
            Asset: {
              image: ({ url, width, height, blurDataUrl }) => {
                return (
                  <Image
                    className="rounded aspect-[4/3] object-cover"
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
              <h2 className="text-3xl font-bold my-6 capitalize">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold my-4">{children}</h3>
            ),
            p: ({ children }) => <p className="text-lg my-6">{children}</p>,
            ul: ({ children }) => (
              <ul className="text-lg my-6 space-y-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="text-lg my-6 space-y-4 list-none">{children}</ol>
            ),
            li: ({ children }) => <li>{children}</li>,
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
                <Image src={src!} alt="image" height={height} width={width} />
              );
            },
          }}
        />
      </div>

      <AuthorCard author={post.author} />
    </div>
  );
};
