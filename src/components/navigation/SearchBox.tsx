import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/router";
import { useState } from "react";

export const SearchBox = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  return (
    <div>
      <form
        className="m-4 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();

          router.push(`/search?q=${text}`);
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="border-0 border-b border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 mr-0 text-gray-700 bg-transparent"
          placeholder="search..."
        />
        <button type="submit">
          <IoMdSearch className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};
