import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import cx from "clsx";
import Link from "next/link";
import { MainMenuControlLink } from "../shared/MainMenuControlLink";
import Image from "next/image";
import { Menu } from "@/lib/types";

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

const NavigationMenu = ({ menu }: { menu: Menu }) => {
  return (
    <NavigationMenuPrimitive.Root className="relative">
      <NavigationMenuPrimitive.List className="flex flex-row rounded-lg p-2 space-x-2 lg:space-x-8 items-center">
        <NavigationMenuPrimitive.Item>
          <TriggerTitle title={menu["Trends"]!.label} />

          <NavigationMenuPrimitive.Content
            className={cx(
              "absolute w-auto top-0 left-0 rounded-lg",
              "radix-motion-from-start:animate-enter-from-left",
              "radix-motion-from-end:animate-enter-from-right",
              "radix-motion-to-start:animate-exit-to-left",
              "radix-motion-to-end:animate-exit-to-right"
            )}
          >
            <div className="w-[21rem] lg:w-[40rem] xl:w-[90vw]">
              <div className="grid grid-cols-1 gap-4 p-10">
                {menu["Trends"]!.blogs.map((link, index) => (
                  /* @ts-expect-error */
                  // TODO Fix Next Link children Props
                  <MainMenuControlLink
                    key={index}
                    href={`/article/${link.slug}`}
                    className={cx(
                      "p-4 xl:p-6 text-lg font-display hover:bg-[#F0F0F0] dark:hover:bg-black/20 inline-block hover:text-[#ca9a9a] rounded-md",
                      "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <div className="relative h-44 w-44">
                        <Image src={link.coverImage.url} fill alt="image" />
                      </div>

                      <div>{link.title}</div>
                    </div>
                  </MainMenuControlLink>
                ))}
              </div>
              <div className="bg-[#F0F0F0] dark:bg-black/30 text-lg dark:text-white py-3 text-center font-display italic">
                Find inspirations and ideas
              </div>
            </div>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item>
          <TriggerTitle title="Browser Category" />

          <NavigationMenuPrimitive.Content
            className={cx(
              "absolute w-auto top-0 left-0 rounded-lg",
              "radix-motion-from-start:animate-enter-from-left",
              "radix-motion-from-end:animate-enter-from-right",
              "radix-motion-to-start:animate-exit-to-left",
              "radix-motion-to-end:animate-exit-to-right"
            )}
          >
            <div className="w-[16rem] lg:w-[18rem] p-3">
              <div className="w-full flex flex-col space-y-2">
                {topics.map((topic, index) => (
                  /* @ts-expect-error */
                  <MainMenuControlLink
                    href={topic.href}
                    key={index}
                    className={cx(
                      "w-full px-4 inline-block py-3 hover:bg-gray-100 dark:hover:bg-black/10 rounded-md",
                      "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    )}
                  >
                    {topic.label}
                  </MainMenuControlLink>
                ))}
              </div>
            </div>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item>
          <Link
            href="/about"
            className="px-3 py-2 rounded-md capitalize text-lg lg:text-xl font-display text-gray-700 dark:text-gray-100"
          >
            About
          </Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Indicator
          className={cx(
            "z-10",
            "top-[100%] flex items-end justify-center h-2 overflow-hidden",
            "radix-state-visible:animate-fade-in",
            "radix-state-hidden:animate-fade-out",
            "transition-[width_transform] duration-[250ms] ease-[ease]"
          )}
        >
          <div className="top-1 relative bg-white dark:bg-[#050505] w-2 h-2 rotate-45" />
        </NavigationMenuPrimitive.Indicator>
      </NavigationMenuPrimitive.List>

      <div
        className={cx(
          "absolute flex justify-center z-300",
          "w-[200%] left-[-100%] top-[100%]"
        )}
        style={{
          perspective: "2400px",
        }}
      >
        <NavigationMenuPrimitive.Viewport
          className={cx(
            "relative mt-2 shadow-lg rounded-md bg-white dark:bg-[#050505] overflow-hidden z-300",
            "w-radix-navigation-menu-viewport",
            "h-radix-navigation-menu-viewport",
            "radix-state-open:animate-scale-in-content",
            "radix-state-closed:animate-scale-out-content",
            "origin-[top_center] transition-[width_height] duration-300 ease-[ease]"
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  );
};

export default NavigationMenu;

const TriggerTitle = ({ title }: { title: string }) => {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cx(
        "px-3 py-2 rounded-md capitalize",
        "text-lg lg:text-xl font-display",
        "text-gray-700 dark:text-gray-100",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      )}
    >
      {title}
    </NavigationMenuPrimitive.Trigger>
  );
};
