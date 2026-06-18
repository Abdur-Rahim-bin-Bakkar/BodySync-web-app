// import { getForumPosts } from "@/lib/api/getForunPosts";
// import ForumCard from "./ForumCard";
// import ForumSearch from "./ForumSearch";

import { getForumPosts } from "@/lib/api/getForunPosts";
import ForumSearch from "./ForumSearch";
import ForumCard from "./ForumCard";

const ForumPage = async ({ searchParams }) => {
  const params = await searchParams;

  const search = params?.search || "";

  const posts = await getForumPosts(search);

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 bg-white dark:bg-[#0B0F14]">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Community Forum
        </h1>

        <p className="text-gray-500 mt-3">
          Learn, share and grow together with our fitness community.
        </p>
      </div>

      <ForumSearch />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <ForumCard
              key={post._id}
              post={post}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No forum posts found 😢
          </div>
        )}
      </div>

    </section>
  );
};

export default ForumPage;