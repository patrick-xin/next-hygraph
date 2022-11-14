import { Link as NavLink } from "@radix-ui/react-navigation-menu";
import NextLink, { LinkProps } from "next/link";
import { forwardRef } from "react";

export const MainMenuControlLink = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ href, ...props }, ref) {
    return (
      <NextLink href={href} passHref>
        <NavLink ref={ref} {...props} />
      </NextLink>
    );
  }
);
