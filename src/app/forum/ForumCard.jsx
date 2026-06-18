import Link from "next/link";

const ForumCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300">

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <p className="text-sm text-orange-500 mb-2">
          By {post.authorName}
        </p>

        <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
          {post.title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {post.description?.slice(0, 120)}...
        </p>

        <Link href={`/forum/${post._id}`}>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition">
            Read More
          </button>
        </Link>

      </div>

    </div>
  );
};

export default ForumCard;