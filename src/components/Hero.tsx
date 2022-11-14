import { Blog } from "@/lib/types";
import Carousel from "./Carousel";

export const Hero = ({ carousel }: { carousel: Blog[] }) => {
  return (
    <div className="-mx-6 relative h-[60vh]">
      <Carousel carousel={carousel} />
    </div>
  );
};
