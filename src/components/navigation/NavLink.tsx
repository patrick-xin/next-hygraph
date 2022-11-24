import Link, { LinkProps } from "next/link";
import { HTMLAttributes } from "react";

type NavLinkProps = LinkProps & HTMLAttributes<HTMLAnchorElement>;

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  className = "",
  children,
  ...props
}) => {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};
