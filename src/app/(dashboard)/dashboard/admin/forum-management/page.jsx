"use client";

import { motion } from "framer-motion";
import { getAllForumPosts } from "@/lib/api/getAllForumPosts";
import DeleteForumPostButton from "./DeleteForumPostButton";
import { useEffect, useState } from "react";
import Image from "next/image";

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
          <h1 className="text-3xl md:text-4xl font-bold text-base-content">
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
        <div className="grid gap-5">

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

              {/* TOP */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  {/* IMAGE */}
                  <Image
                    width={400}
                    height={300}
                    unoptimized
                    src={post.image}
                    alt={post.title}
                    className="w-14 h-14 rounded-xl object-cover border"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-base-content">
                      {post.title}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Post #{index + 1}
                    </p>
                  </div>

                </div>

                <DeleteForumPostButton
                  id={post._id}
                  setPosts={setPosts}
                />

              </div>

              {/* AUTHOR */}
              <div className="mt-4 flex items-center gap-3">

                <Image
                  width={400}
                  height={300}
                  unoptimized
                  src={`${post?.userImage || "https://i.ibb.co/2kR8Q8q/user.png"}`}
                  className="w-8 h-8 rounded-full border"
                  alt="author"
                />

                <div className="text-sm">
                  <p className="font-medium">
                    {post.authorName}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {post.authorEmail}
                  </p>
                </div>

              </div>

              {/* DESCRIPTION */}
              <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                {post.description}
              </p>

              {/* STATS */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">

                <span>❤️ {post.likes}</span>
                <span>👎 {post.dislikes}</span>
                <span>💬 {post.commentsCount}</span>

              </div>

              {/* FOOTER */}
              <div className="mt-4 flex justify-between text-xs text-gray-500">

                <span>
                  Role: {post.authorRole}
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