import { Link as NavLink } from "@radix-ui/react-navigation-menu";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";

export const MainMenuControlLink = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ href, ...props }, ref) {
    const router = useRouter();
    const isActive = router.asPath === href;
    return (
      <NextLink href={href} passHref>
        <NavLink ref={ref} active={isActive} {...props} />
      </NextLink>
    );
  }
);
