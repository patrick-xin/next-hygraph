import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/router";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_ARTICLE_QUERY } from "@/lib/query";

export const SearchBox = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const [search] = useLazyQuery(SEARCH_ARTICLE_QUERY, {
    variables: {
      query: text,
    },
  });
  return (
    <div className="w-full">
      <form
        className="flex items-center gap-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          search();
          router.push(`/search?q=${text}`);
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="w-full border border-gray-300 rounded dark:placeholder:text-white dark:text-white appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 py-2 px-1 text-gray-700 bg-transparent"
          placeholder="search..."
        />
        <button type="submit">
          <IoMdSearch className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};
