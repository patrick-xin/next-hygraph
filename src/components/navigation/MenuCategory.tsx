import { MenuPopover } from "./MenuPopover";
import { NavLink } from "./NavLink";
import cn from "clsx";

const topics = [
  {
    href: "/design-ideas",
    label: "Design Ideas",
  },
  {
    href: "/shopping",
    label: "Shopping",
  },
  {
    href: "/expert-advice",
    label: "Expert Advice",
  },
];

export const MenuCategory = () => {
  return (
    <MenuPopover label="Category">
      <div className="w-full flex space-y-2 text-center">
        {topics.map((topic, index) => (
          <NavLink
            href={topic.href}
            key={index}
            className={cn(
              "w-full px-4 inline-block py-3 hover:bg-gray-100 dark:hover:bg-black/10 rounded-md",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            {topic.label}
          </NavLink>
        ))}
      </div>
    </MenuPopover>
  );
};
