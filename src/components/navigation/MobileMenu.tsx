import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import cn from "clsx";

export const MobileMenu = () => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <div>
      <MenuButton
        openDrawer={(isopen) => setDrawerOpen(isopen)}
        isDrawerOpen={isDrawerOpen}
      />
      <MobileDrawer isDrawerOpen={isDrawerOpen} />
    </div>
  );
};

type MenuButtonProps = {
  openDrawer(isopen: boolean): void;
  isDrawerOpen: boolean;
};

const MenuButton = ({ openDrawer, isDrawerOpen }: MenuButtonProps) => {
  return (
    <div className="flex col-span-1 justify-end lg:hidden z-100">
      <motion.button
        aria-label="close-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="group flex right-10 flex-col gap-2 justify-center items-center
      w-6 h-6 cursor-pointer md:top-32 md:right-8 lg:hidden"
        onClick={() => {
          openDrawer(!isDrawerOpen);
        }}
      >
        <motion.span
          className={cn("w-5 h-[2px] z-100", {
            "bg-white": isDrawerOpen,
            "bg-black": !isDrawerOpen,
          })}
          animate={{
            rotate: isDrawerOpen ? 43 : 0,
            y: isDrawerOpen ? 5 : 0,
          }}
        />
        <motion.span
          className={cn("w-5 h-[2px] z-100", {
            "bg-white": isDrawerOpen,
            "bg-black": !isDrawerOpen,
          })}
          animate={{
            rotate: isDrawerOpen ? -46 : 0,
            y: isDrawerOpen ? -5.5 : 0,
          }}
        />
      </motion.button>
    </div>
  );
};

const ease = [0.455, 0.03, 0.515, 0.955];

interface MobileDrawerProps {
  isDrawerOpen: boolean;
}

export const ROUTES = [
  {
    path: "/",
    label: "Home",
    exact: true,
  },
  {
    path: "/posts",
    label: "Posts",
  },
  {
    path: "/authors",
    label: "Authors",
  },
  {
    path: "/about",
    label: "About",
  },
];

const MobileDrawer = ({ isDrawerOpen }: MobileDrawerProps) => {
  return (
    <AnimatePresence mode="wait">
      {isDrawerOpen && (
        <motion.div
          key={"drawer"}
          initial={{ y: 1000 }}
          animate={{ y: 0, transition: { duration: 0.6 } }}
          exit={{
            opacity: 0,
            transition: { delayChildren: 1, ease, delay: -0.2 },
          }}
          transition={{ duration: 1, ease }}
          className="flex fixed inset-0 top-0 flex-col justify-between
      px-4 w-screen h-screen bg-black z-50 lg:hidden"
        >
          <div className="flex overflow-hidden relative flex-col justify-around px-6 mt-16 h-screen">
            <div className="space-y-6">
              <motion.div
                className="flex justify-center mt-5 w-full md:mt-9"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDrawerOpen ? 1 : 0,
                  transition: { delay: 0.4 },
                }}
                exit={{ opacity: 0 }}
              >
                <ul className="flex flex-col justify-around items-end h-[30vh] text-xl">
                  <div className="text-white text-sm w-full text-center">
                    Menu
                  </div>
                  {ROUTES.map((route) => (
                    <li key={route.path}>
                      <Link
                        href={`${route.path}`}
                        className="text-3xl hover:text-white text-gray-300"
                        // className={cn({
                        //   "underline underline-offset-2 decoration-orange dark:decoration-mint decoration-4":
                        //     route.exact === true
                        //       ? route.path === router.asPath
                        //       : router.asPath.startsWith(route.path),
                        // })}
                      >
                        {route.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
