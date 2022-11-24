import { Popover } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  label: string;
};

export const MenuPopover = ({ children, label }: Props) => {
  return (
    <div className="w-auto">
      <Popover as="div">
        {({ open }) => (
          <>
            <Popover.Button
              className={cn(
                "inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
                {
                  "text-brand": open,
                  "to-black dark:text-white": !open,
                }
              )}
            >
              <span className="text-xl">{label}</span>

              <BiChevronDown
                className={cn(
                  "ml-2 -mr-1 h-5 w-5 will-change-transform transition-all ease-linear",
                  { "rotate-180": open }
                )}
                aria-hidden="true"
              />
            </Popover.Button>
            <AnimatePresence>
              {open && (
                <Popover.Panel
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ easings: [0.86, 0, 0.07, 1] }}
                  as={motion.div}
                  className={cn(
                    "absolute bg-white p-6 xl:p-16 dark:bg-[#070707] z-10 mt-3 px-4 w-screen left-0"
                  )}
                >
                  <div className="overflow-hidden rounded-lg">{children}</div>
                </Popover.Panel>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </div>
  );
};
