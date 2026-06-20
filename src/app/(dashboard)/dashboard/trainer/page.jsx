import { getUserContentStats, getUserTotalStats } from "@/lib/api/counts";
import { getServerSession } from "@/lib/session/server";
import {
  FaUserCircle,
  FaChalkboardTeacher,
  FaUsers,
  FaPodcast,
} from "react-icons/fa";

export default async function OverviewPage() {
  const session = await getServerSession();
  const user = session?.user;

  // fetch real stats from backend
  const counts = await getUserTotalStats(user?.id);

  const totalClassesCreated = counts?.totalClasses || 0;
  const totalStudentsEnrolled = counts?.totalBookings || 0; // future-ready
  const totalPosts = counts?.forumCount || 0;
  console.log(counts,'ha')

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Trainer Overview
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your classes and students
        </p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Classes */}
        <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition">
          <FaChalkboardTeacher className="text-3xl text-orange-500" />

          <div>
            <p className="text-gray-500 text-sm">
              Total Classes Created
            </p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalClassesCreated}
            </h3>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition">
          <FaPodcast className="text-3xl text-orange-500" />

          <div>
            <p className="text-gray-500 text-sm">
              Total Posts
            </p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalPosts}
            </h3>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition">
          <FaUsers className="text-3xl text-orange-500" />

          <div>
            <p className="text-gray-500 text-sm">
              Total Students Enrolled
            </p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalStudentsEnrolled}
            </h3>
          </div>
        </div>

      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-5">

        {user?.image ? (
          <img
            src={user.image}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-5xl text-gray-400" />
        )}

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {user?.name || "Trainer"}
          </h2>

          <p className="text-sm text-gray-500">
            {user?.email || "No email"}
          </p>

          {/* Trainer Badge */}
          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-orange-500 text-white rounded-full">
            Trainer
          </span>
        </div>
      </div>


    </div>
  );
}