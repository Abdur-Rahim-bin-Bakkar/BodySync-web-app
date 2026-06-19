"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ForumCard = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 h-full flex flex-col"
    >
      <motion.img
        src={post.image}
        alt={post.title}
        className="w-full h-56 object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      {/* 🔥 KEY FIX: flex-grow content area */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-sm text-orange-500 mb-2">
            By {post.authorName}
          </p>

          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
            {post.title}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {post.description?.slice(0, 120)}...
          </p>
        </div>

        {/* 🔥 ALWAYS PUSHED TO BOTTOM */}
        <div className="mt-auto">
          <Link href={`/forum/${post._id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
            >
              Read More
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ForumCard;