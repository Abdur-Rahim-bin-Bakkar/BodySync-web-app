"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaRegComment, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { getUserById } from "@/lib/api/getUserById";
import { useEffect, useState } from "react";
import Image from "next/image";

const ForumCard = ({ post }) => {
  // const MotionImage = motion(Image);
  const [postUserInfo, setPostUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (post?.userId) {
          const res = await getUserById(post.userId);
          setPostUserInfo(res?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [post?.userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 h-full flex flex-col relative"
    >
    
      <Image src={post.image}
        alt={post.title}
        className="w-full h-56 object-cover hover:scale-110 duration-500"
        unoptimized
        width={400} height={350} />

      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full capitalize w-20 justify-center items-center absolute top-4 left-4 flex 
    ${post.authorRole === "admin"
            ? "bg-red-100 text-red-600 border border-red-300"
            : post.authorRole === "trainer"
              ? "bg-blue-100 text-blue-600 border border-blue-300"
              : "bg-gray-100 text-gray-600 border border-gray-300"
          }
  `}
      >
        {post.authorRole || "User"}
      </span>

      {/* 🔥 REACTIONS + USER PROFILE SECTION */}
      <div className="flex items-center justify-between mt-4 gap-5 text-sm text-gray-500 px-3">

        {/* 👤 USER PROFILE */}
        <div className="flex items-center gap-2">
          <img
            src={postUserInfo?.image || "https://i.ibb.co/2kR3Q3K/default-user.png"}
            alt="user"
            className="w-7 h-7 rounded-full object-cover border"
          />

          <div className="leading-tight">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200">
              {postUserInfo?.name || post.authorName || "Unknown"}
            </p>
            <p className="text-[10px] text-gray-400 capitalize">
              {postUserInfo?.role || post.authorRole || "user"}
            </p>
          </div>
        </div>

        {/* 👍 LIKES */}
        <div className="flex items-center gap-1">
          <FaRegThumbsUp />
          <span>{post.likes || 0}</span>
        </div>

        {/* 👎 DISLIKES */}
        <div className="flex items-center gap-1">
          <FaRegThumbsDown />
          <span>{post.dislikes || 0}</span>
        </div>

        {/* 💬 COMMENTS */}
        <div className="flex items-center gap-1">
          <FaRegComment />
          <span>{post.commentsCount || 0}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-1">
            {post.title}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
            {post.description}
          </p>
        </div>

        <div className="mt-auto">
          <Link href={`/forum/${post._id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition cursor-pointer"
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