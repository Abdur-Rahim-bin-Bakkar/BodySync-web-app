"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ForumSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  // Search
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    router.push(`/forum?${params.toString()}`);
  };

  // Show All Posts
  const handleShowAll = () => {
    setSearch("");
    router.push("/forum");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-10">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search forum posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-3 rounded-xl w-full md:w-[400px] dark:bg-[#111827] dark:text-white dark:border-gray-700 outline-none"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
      >
        Search
      </button>

      {/* All Button */}
      <button
        onClick={handleShowAll}
        className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-xl transition-all duration-300"
      >
        All
      </button>

    </div>
  );
};

export default ForumSearch;