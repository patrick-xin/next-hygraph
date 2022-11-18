import Card from "@/components/shared/Card";
import { Blog } from "@/lib/types";

export const RecentColumn = ({ post }: { post: Blog }) => {
  return (
    <div className="my-8 col-start-5 col-span-full md:px-8 md:border-l md:border-black/20 dark:md:border-white/90 lg:px-12">
      <div className="">
        <h3 className="text-xl font-bold pb-4 border-b border-black/20 dark:border-white/90">
          Recent post from {post.author.firstName} {post.author.lastName}
        </h3>
        <div className="divide-y space-y-6 lg:mt-12">
          {post.author.recentPosts.map((post) => (
            <Card key={post.id} article={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
