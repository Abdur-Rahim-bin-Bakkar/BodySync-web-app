import { getForumPostById } from "@/lib/api/getForunPosts";
import CommentSection from "./ommentSection";
import { getCommentsByPostId } from "@/lib/api/getComment";
import { getServerSession } from "@/lib/session/server";
import LikeOrDislike from "./LikeOrDislike";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/api/getUserById";
import Image from "next/image";
// import CommentSection from "./CommentSection";

const ForumIdPage = async ({ params }) => {
  // const session = await getServerSession()
  const { id } = await params;
  const userData = await getServerSession()
  if (!userData) {
    redirect(`/login?callbackUrl=forum/${id}`)
    return
  }

  const post = await getForumPostById(id);
  console.log(post)
  const commentsData = await getCommentsByPostId(id)
  const postUserInfo = await getUserById(post?.userId)
  // const postId = post?._id
  const userId = await userData?.user?.id
  console.log(postUserInfo?.data, 'postfgf')
  const userInfo = postUserInfo?.data






  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Image */}

      <Image
        width={400}
        height={300}
        unoptimized
        src={post.image}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <div className="flex items-center gap-2 mt-5">
        <Image
          width={400}
          height={300}
          unoptimized
          src={userInfo?.image || "https://i.ibb.co/2kR3Q3K/default-user.png"}
          alt="user"
          className="w-10 h-10 rounded-full object-cover border"
        />

        <div className="leading-tight">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200">
            {userInfo?.name || post.authorName || "Unknown"}
          </p>
          <p className="text-[10px] text-gray-400 capitalize">
            {userInfo?.role || post.authorRole || "user"}
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          • {new Date(post.createdAt).toDateString()}
        </p>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mt-6">{post.title}</h1>

      {/* Author */}


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