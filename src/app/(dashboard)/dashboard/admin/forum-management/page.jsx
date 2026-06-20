"use client";

import { motion } from "framer-motion";
import { getAllForumPosts } from "@/lib/api/getAllForumPosts";
import DeleteForumPostButton from "./DeleteForumPostButton";
import { useEffect, useState } from "react";

export default function ForumManagePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getAllForumPosts();
      setPosts(result?.data || []);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-base-100 px-4 md:px-8 py-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Forum Moderation
          </h1>
          <p className="text-gray-500 mt-2">
            Monitor and manage community posts
          </p>
        </div>

        <div className="px-5 py-2 rounded-2xl bg-base-200 border border-base-300 text-sm">
          Total Posts: {posts.length}
        </div>
      </div>

      {/* EMPTY */}
      {posts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh] bg-base-200 rounded-3xl border">
          <p className="text-gray-500">No posts found</p>
        </div>
      ) : (
        <div className="space-y-5">

          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
              }}
              className="
                bg-base-200
                border border-base-300
                rounded-3xl
                p-5
                transition-all
                duration-300
              "
            >

              {/* TOP ROW */}
              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Post #{index + 1}
                  </p>

                  <h3 className="text-lg font-semibold text-base-content">
                    {post.title}
                  </h3>
                </div>

                <motion.div whileTap={{ scale: 0.9 }}>
                  <DeleteForumPostButton
                    id={post._id}
                    setPosts={setPosts}
                  />
                </motion.div>

              </div>

              {/* META */}
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-500">

                <span>
                  👤 {post.userEmail || "Unknown"}
                </span>

                <span>
                  📅{" "}
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </span>

              </div>

            </motion.div>
          ))}

        </div>
      )}
    </div>
  );
}