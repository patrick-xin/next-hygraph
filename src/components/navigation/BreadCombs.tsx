import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

export const BreadCombs = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => {
  return (
    <div className="flex items-center gap-2 lg:gap-4 flex-wrap text-sm lg:text-base">
      <div>
        <Link
          className="text-gray-400 dark:text-gray-300 dark:hover:text-white"
          href="/"
        >
          Home
        </Link>
      </div>
      <BiChevronRight />
      <div>
        <Link className="dark:text-gray-300 dark:hover:text-white" href={href}>
          {label}
        </Link>
      </div>
    </div>
  );
};
