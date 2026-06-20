import { getForumPostsByuserId } from "@/lib/api/getMyForum";
import { getServerSession } from "@/lib/session/server";
import MyForumCard from "./MyForumCard";
import { FaRegComments } from "react-icons/fa";

import { div } from "framer-motion/client";
import Link from "next/link";
import { Button } from "@heroui/react";

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

        {/* POSTS GRID */}
        {myForumData?.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myForumData.map((post) => (
              <MyForumCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {myForumData?.length === 0 && (

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md text-center p-10 rounded-3xl border border-base-300 bg-gradient-to-br from-base-200 to-base-100 shadow-md overflow-hidden">

              {/* decorative glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 blur-3xl rounded-full"></div>

              {/* icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary text-3xl">
                  <FaRegComments />
                </div>
              </div>

              {/* title */}
              <h2 className="text-2xl font-bold text-base-content">
                No Posts Found
              </h2>

              {/* description */}
              <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                You haven’t created any forum posts yet.
                Start sharing your thoughts with the community!
              </p>

              {/* optional CTA feel */}
              <div className="mt-6">
                <Link href={'/dashboard/admin/add-forum'}>
                  <Button className="bg-green-500">
                    Create  Post
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyForumPage;