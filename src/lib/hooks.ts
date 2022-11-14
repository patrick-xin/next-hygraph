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
