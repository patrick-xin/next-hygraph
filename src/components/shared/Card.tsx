import { Blog } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PublishDate } from "./PublishDate";

const variants = {
  initial: {
    y: 0,
  },
  animate: { y: -6 },
};

const Card = ({ article }: { article: Blog }) => {
  const { slug, title, coverImage, publishedAt, categories } = article;
  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial="initial"
      whileHover="animate"
    >
      <Link href={`/article/${slug}`} className="inline-block">
        <div className="space-y-4">
          <motion.div variants={variants} className="relative max-w-sm">
            <Image
              alt={`${title}-cover-image`}
              src={coverImage.url}
              height={400}
              width={400}
              className="aspect-square object-cover w-full rounded"
            />
          </motion.div>

          <div className="self-start lg:pl-12">
            <PublishDate publishedAt={publishedAt} />
          </div>

          <div className="lg:mx-12">
            <h3 className="text-lg space-y-2">
              <span className="font-semibold text-sm">
                {categories[0]?.name}
              </span>
              <span className="line-clamp-3">{title}</span>
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
