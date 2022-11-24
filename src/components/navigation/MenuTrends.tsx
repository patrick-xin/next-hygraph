import { Menu } from "@/lib/types";
import cx from "clsx";
import Image from "next/image";
import { NavLink } from "./NavLink";

import { MenuPopover } from "./MenuPopover";

export const MenuTrends = ({ menu }: { menu: Menu }) => {
  return (
    <MenuPopover label="Trends">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 border-r dark:border-white/50">
          <div className="text-3xl font-display">What's Trending</div>
          <div className="italic text-gray-500 dark:text-gray-300 my-8">
            A selection of trending articles
          </div>
        </div>
        <div className="flex gap-2 xl:gap-4 col-start-4 col-span-full justify-evenly">
          {menu["Trends"]!.blogs.map((link, index) => (
            <NavLink
              key={index}
              href={`/article/${link.slug}`}
              className={cx(
                "p-2 text-lg font-display flex-1 block rounded-md",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <div className="flex flex-col gap-4 group w-full">
                <div className="w-full h-48 relative">
                  <Image
                    src={link.coverImage.url}
                    alt="image"
                    fill
                    className="object-cover aspect-[4/3] rounded w-full group-hover:opacity-70"
                  />
                </div>

                <div className="flex-1 text-xl">{link.title}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </MenuPopover>
  );
};
