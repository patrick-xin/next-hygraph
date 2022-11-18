import type { ReactNode } from "react";

import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Menu } from "@/lib/types";
import { useScrollDirection } from "@/lib/hooks";
import { useRouter } from "next/router";

type IMainProps = {
  meta: ReactNode;
  menu: Menu;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const scrollDir = useScrollDirection({
    initialDirection: "up",
    thresholdPixels: 0,
    off: false,
  });
  const scrollDown = scrollDir === "down";
  const { route } = useRouter();

  return (
    <>
      {props.meta}

      <Navbar
        menu={props.menu}
        shown={!scrollDown || !route.includes("article")}
      />
      <div className="py-6 overflow-hidden h-auto mt-16 lg:mt-32">
        {props.children}
      </div>

      <Footer />
    </>
  );
};

export { Main };
