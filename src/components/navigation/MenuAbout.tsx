import { MenuPopover } from "./MenuPopover";
import Link from "next/link";

const links = [
  {
    href: "/",
    label: "FAQs",
  },
  {
    href: "/",
    label: "About",
  },
  {
    href: "/",
    label: "Contact",
  },
];

export const MenuAbout = () => {
  return (
    <MenuPopover label="About">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 border-r dark:border-white/50 flex flex-col gap-3 justify-center text-base">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 items-center text-4xl max-w-xl mx-auto font-display xl:gap-4 col-start-4 col-span-full justify-evenly">
          We're creating a world where it’s easy for anyone, anywhere to
          decorate better.
        </div>
      </div>
    </MenuPopover>
  );
};
