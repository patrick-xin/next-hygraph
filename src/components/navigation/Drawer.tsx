import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import { SearchBox } from "./SearchBox";
import ThemeSwitcher from "./ThemeSwitch";
import { Dialog } from "@headlessui/react";
interface DrawerProps {
  close: () => void;
  open: boolean;
}

const Drawer = ({ close, open }: DrawerProps) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          as={motion.div}
          open={open}
          onClose={close}
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          exit={{ x: 1000 }}
          transition={{ type: "tween", duration: 0.6, ease: "linear" }}
          className="fixed flex flex-col justify-between inset-0 bg-white dark:bg-[#050505] dark:border-l dark:border-white/20 shadow-lg h-screen w-full md:w-1/2 lg:w-1/3  md:ml-auto  z-200"
        >
          <div className="relative h-full w-full px-6">
            <button
              className="cursor-pointer absolute right-4 top-4"
              onClick={close}
            >
              <MdOutlineClose />
            </button>
            <div className="space-y-12 mt-12">hello</div>
            <div className="my-8 space-y-6">
              <SearchBox />
            </div>
            <ThemeSwitcher />
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
