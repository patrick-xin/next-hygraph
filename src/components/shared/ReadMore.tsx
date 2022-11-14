import { HiArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";

export const ReadMore = ({
  href,
  hasIcon = true,
}: {
  href: string;
  hasIcon?: boolean;
}) => {
  return (
    <Link
      href={href}
      className="font-medium hover:text-brand my-4 inline-flex gap-2 items-center"
    >
      <div>Read more</div>
      {hasIcon ? <HiArrowNarrowRight className="-mt-[1px]" /> : null}
    </Link>
  );
};
