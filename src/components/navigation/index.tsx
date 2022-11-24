import { Menu } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";

import Drawer from "./Drawer";

import { MenuTrends } from "./MenuTrends";
import { MenuCategory } from "./MenuCategory";
import { MenuAbout } from "./MenuAbout";

export const Navbar = ({ menu, shown }: { menu: Menu; shown: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {shown && (
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "linear" }}
            className="fixed inset-0 w-full h-16 lg:h-32 z-200 rounded-b-lg"
          >
            <div className="bg-[#F0F0F0] dark:bg-black w-full h-full">
              <nav className="w-full h-full flex items-center justify-between px-6 lg:px-24 relative">
                <div className="flex justify-between w-full flex-1">
                  <Link href="/" className="inline-block">
                    {menu?.["Livingetc"]?.label}
                  </Link>
                  <div className="flex items-center lg:hidden">
                    <button onClick={() => setOpen(true)}>
                      <IoMdMenu className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="gap-4 text-xl h-full items-center hidden lg:flex">
                  <MenuTrends menu={menu} />
                  <MenuCategory />
                  <MenuAbout />
                  <div className="flex items-center">
                    <button onClick={() => setOpen(!open)}>
                      <IoMdMenu className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      <Drawer open={open} close={() => setOpen(false)} />
    </>
  );
};
