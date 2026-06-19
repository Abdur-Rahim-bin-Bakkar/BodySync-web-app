import { getLatestForumPosts } from "@/lib/api/getLatestPost";
import React from "react";
import ForumCard from "@/app/(public)/forum/ForumCard";

const LatestPost = async () => {
    const latestPostData = await getLatestForumPosts();

    return (
        <section className="w-full px-4 md:px-10 py-12">
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Latest Forum Posts
                </h2>

                <p className="mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
                    Stay updated with the newest discussions, fitness tips, and community insights shared by trainers and members.
                </p>

                <div className="mt-3 h-[3px] w-24 bg-orange-500 rounded-full mx-auto md:mx-0"></div>
            </div>

            {/* Grid Wrapper (slightly improved spacing + feel) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestPostData?.slice(0, 4).map((post, i) => (
                    <div
                        key={i}
                        className="transform hover:-translate-y-1 transition duration-300"
                    >
                        <ForumCard post={post} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LatestPost;