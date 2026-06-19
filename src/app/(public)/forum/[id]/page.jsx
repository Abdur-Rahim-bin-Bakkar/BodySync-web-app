import { getForumPostById } from "@/lib/api/getForunPosts";
import CommentSection from "./ommentSection";
import { getCommentsByPostId } from "@/lib/api/getComment";
import { getServerSession } from "@/lib/session/server";
import LikeOrDislike from "./LikeOrDislike";
import { redirect } from "next/navigation";
// import CommentSection from "./CommentSection";

const ForumIdPage = async ({ params }) => {
  // const session = await getServerSession()
  const userData = await getServerSession()
  if (!userData) {
    redirect('/login')
  }
  const { id } = await params;

  const post = await getForumPostById(id);
  const commentsData = await getCommentsByPostId(id)
  const postId = post?._id
  const userId = await userData?.user?.id
  console.log(postId, 'post')






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
      <LikeOrDislike userId={userId} post={post} />

      {/* Comments */}
      <CommentSection postId={id} commentsData={commentsData} />
    </div>
  );
};

export default ForumIdPage;