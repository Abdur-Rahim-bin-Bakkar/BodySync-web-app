import { getForumPostById } from "@/lib/api/getForunPosts";
import CommentSection from "./ommentSection";
import { getCommentsByPostId } from "@/lib/api/getComment";
// import CommentSection from "./CommentSection";

const ForumIdPage = async ({ params }) => {
  const { id } = await params;

  const post = await getForumPostById(id);
  const commentsData = await getCommentsByPostId(id)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-xl"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-6">{post.title}</h1>

      {/* Author */}
      <p className="text-sm text-gray-500 mt-2">
        By {post.authorName} • {new Date(post.createdAt).toDateString()}
      </p>

      {/* Description */}
      <p className="mt-6 text-gray-700 leading-relaxed">
        {post.description}
      </p>

      {/* Like / Dislike */}
      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-green-100 rounded">
          👍 {post.likes}
        </button>
        <button className="px-4 py-2 bg-red-100 rounded">
          👎 {post.dislikes}
        </button>
      </div>

      {/* Comments */}
      <CommentSection postId={id} commentsData ={commentsData} />
    </div>
  );
};

export default ForumIdPage;