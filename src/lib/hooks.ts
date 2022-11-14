"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Root } from "./types";

export const useFetch = ({
  endCursor,
  path,
  slug,
  initialHasNextPage,
}: {
  endCursor: string;
  path: string;
  slug?: string;
  initialHasNextPage: boolean;
}) => {
  const [data, setData] = useState<Root[]>([]);
  const [cursor, setCursor] = useState(endCursor);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const fetchMore = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${path}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cursor, path, slug }),
      });

      const data: { data: Root } = await res.json();

      setIsLoading(false);
      setHasNextPage(data.data.blogsConnection.pageInfo.hasNextPage);
      setCursor(data.data.blogsConnection.pageInfo.endCursor);
      setData((d) => [...d, data.data]);
    } catch (_error) {
      setIsLoading(false);
      setError("Error fetching data");
    }
  };
  return { fetchMore, data, hasNextPage, isLoading, error };
};

export const useCloseDrawer = (cb: () => void) => {
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeStart = () => {
      cb();
    };

    router?.events.on("routeChangeStart", onRouteChangeStart);
    return () => {
      router?.events.off("routeChangeStart", onRouteChangeStart);
    };
  }, [router?.events, router]);
};

const SCROLL_UP = "up";
const SCROLL_DOWN = "down";

export const useScrollDirection = ({
  initialDirection = SCROLL_UP,
  thresholdPixels = 0,
  off = false,
} = {}) => {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    if (!process.browser || !window) return;
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    !off
      ? window.addEventListener("scroll", onScroll)
      : setScrollDir(initialDirection);

    return () => window.removeEventListener("scroll", onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return scrollDir;
};
