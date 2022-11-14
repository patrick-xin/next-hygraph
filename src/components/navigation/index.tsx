import { Menu } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";

import Drawer from "./Drawer";

import { MobileMenu } from "./MobileMenu";
import NavigationMenu from "./NavigationMenu";

export const Navbar = ({ menu, shown }: { menu: Menu; shown: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <AnimatePresence>
      {shown && (
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "linear" }}
          className="fixed inset-0 w-full h-16 lg:h-32 z-50 rounded-b-lg"
        >
          <div className="bg-[#F0F0F0] dark:bg-black w-full h-full">
            <nav className="w-full h-full flex items-center justify-between px-6 lg:px-24">
              <div>
                <Link href="/">{menu?.["Livingetc"]?.label}</Link>
              </div>
              <MobileMenu />
              <div className="gap-4 text-xl h-full items-center hidden lg:flex">
                <NavigationMenu menu={menu} />

                <div className="flex items-center">
                  <button onClick={() => setOpen(true)}>
                    <IoMdMenu />
                  </button>
                </div>
                <Drawer open={open} close={() => setOpen(false)} />
              </div>
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
