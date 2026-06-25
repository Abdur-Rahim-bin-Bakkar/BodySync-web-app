import Link from "next/link";
import { getForumPosts } from "@/lib/api/getForunPosts";
import ForumSearch from "./ForumSearch";
import ForumCard from "./ForumCard";

const ForumPage = async ({ searchParams }) => {
  const params = await searchParams;

  const search = params?.search || "";
  const page = Number(params?.page) || 1;

  const { posts, pagination } =
    await getForumPosts(
      search,
      page
    );

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 bg-white dark:bg-[#0B0F14]">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Community Forum
        </h1>

        <p className="text-gray-500 mt-3">
          Learn, share and grow together with our fitness community.
        </p>
      </div>

      {/* Search */}
      <ForumSearch />

      {/* Showing Count */}
      {pagination && (
        <div className="max-w-7xl mx-auto mb-6 text-sm text-gray-500">
          Showing {pagination.showingFrom} -
          {" "}
          {pagination.showingTo}
          {" "}
          of
          {" "}
          {pagination.totalPosts}
          {" "}
          posts
        </div>
      )}

      {/* Posts */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Pagination */}

      <div className="flex justify-end items-center gap-2 mt-8">

        {/* Prev */}
        <Link
          href={`?page=${Math.max(
            page - 1,
            1
          )}&search=${search}`}
          className={`px-4 py-2 rounded ${page === 1
              ? "bg-gray-300 text-gray-500 pointer-events-none"
              : "bg-gray-200 dark:bg-gray-700"
            }`}
        >
          Prev
        </Link>

        {/* Page Numbers */}
        {Array.from({
          length:
            pagination?.totalPages || 0,
        }).map((_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}&search=${search}`}
            className={`px-4 py-2 rounded ${page === i + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
              }`}
          >
            {i + 1}
          </Link>
        ))}

        {/* Next */}
        <Link
          href={`?page=${Math.min(
            page + 1,
            pagination?.totalPages || 1
          )}&search=${search}`}
          className={`px-4 py-2 rounded ${page === pagination?.totalPages
              ? "bg-gray-300 text-gray-500 pointer-events-none"
              : "bg-gray-200 dark:bg-gray-700"
            }`}
        >
          Next
        </Link>

      </div>


    </section>
  );
};

export default ForumPage;