import type { ReactNode } from "react";

import { Navbar } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Menu } from "@/lib/types";

type IMainProps = {
  meta: ReactNode;
  menu: Menu;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <>
    {props.meta}

    <Navbar menu={props.menu} />
    <div className="py-6 overflow-hidden min-h-screen">{props.children}</div>

    <Footer />
  </>
);

export { Main };
