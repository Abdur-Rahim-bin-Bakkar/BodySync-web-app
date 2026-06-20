import { getForumPostsByuserId } from "@/lib/api/getMyForum";
import { getServerSession } from "@/lib/session/server";
import MyForumCard from "./MyForumCard";

const MyForumPage = async () => {
  const session = await getServerSession();

  const myForumData = await getForumPostsByuserId(
    session?.user?.id
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Forum Posts
        </h1>
        <p className="text-default-500 mt-2">
          Manage all forum posts created by you.
        </p>
      </div>

      <div className="space-y-4">
        {myForumData?.length > 0 ? (
          myForumData.map((post) => (
            <MyForumCard
              key={post._id}
              post={post}
            />
          ))
        ) : (
          <div className="border rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold">
              No Posts Found
            </h2>
            <p className="text-default-500 mt-2">
              You haven,t created any forum posts yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyForumPage;