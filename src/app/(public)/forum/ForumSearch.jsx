"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-row justify-center items-center gap-3 mb-10"
    >
      {/* Search Input */}
      <motion.input
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 20px rgba(249,115,22,0.25)",
        }}
        type="text"
        placeholder="Search forum posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-3 rounded-xl w-full md:w-[400px] dark:bg-[#111827] dark:text-white dark:border-gray-700 outline-none"
      />

      {/* Search Button */}
      <motion.button
        whileHover={{
          scale: 1.05,
          y: -2,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={handleSearch}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300"
      >
        Search
      </motion.button>

      {/* All Button */}
      <motion.button
        whileHover={{
          scale: 1.05,
          y: -2,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={handleShowAll}
        className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-xl transition-all duration-300"
      >
        All
      </motion.button>
    </motion.div>
  );
};

export default ForumSearch;