import { useState, useEffect, useCallback } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import useEmblaCarousel from "embla-carousel-react";
import cn from "clsx";

import Image from "next/image";
import { Blog } from "@/lib/types";
import Link from "next/link";

export const PrevButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) => (
  <button
    className={cn(
      "absolute hidden md:block top-1/2 -translate-y-1/2 left-6 lg:left-16"
    )}
    onClick={onClick}
    disabled={!enabled}
  >
    <IoIosArrowDropleftCircle
      className={cn("text-white/80 w-8 h-8 md:h-10 md:w-10 lg:h-12 lg:w-12")}
    />
  </button>
);

export const NextButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) => (
  <button
    className="absolute hidden md:block top-1/2 -translate-y-1/2 right-6 lg:right-16"
    onClick={onClick}
    disabled={!enabled}
  >
    <IoIosArrowDroprightCircle className="text-white/80 w-8 h-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
  </button>
);

const EmblaCarousel = ({ carousel }: { carousel: Blog[] }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    loop: true,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;

    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();

    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {carousel.map((slide, index) => (
              <div className="embla__slide relative" key={index}>
                <div className="relative overflow-hidden h-[55vh]">
                  <Image
                    onLoadingComplete={() => {
                      setPrevBtnEnabled(true);
                      setNextBtnEnabled(true);
                    }}
                    className="h-full object-cover rounded"
                    src={slide.coverImage.url}
                    alt={`${slide.title}-cover-image`}
                    blurDataURL={slide.coverImage.blurDataUrl}
                    placeholder={
                      slide.coverImage.blurDataUrl ? "blur" : "empty"
                    }
                    fill
                  />
                </div>
                <div className="absolute inset-0 m-auto ml-2.5 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/90 min-h-[12rem] mt-12 lg:mt-0 lg:min-h-[24rem] lg:max-w-3xl xl:max-w-4xl py-6 px-10 lg:px-20 w-full">
                    <Link
                      href={`/article/${slide.slug}`}
                      className="inline-block"
                    >
                      <h1 className="text-3xl my-6 lg:text-5xl font-display hover:underline decoration-2 underline-offset-2">
                        {slide.title}
                      </h1>
                    </Link>

                    <p className="text-sm md:text-base line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
                      {slide.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </>
  );
};

export default EmblaCarousel;
