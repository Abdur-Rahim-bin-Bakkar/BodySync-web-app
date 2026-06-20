import { getServerSession } from "@/lib/session/server";
import { FaBookmark, FaHeart, FaUserCircle } from "react-icons/fa";

export default async function UserOverview({ stats, trainerApplication }) {
    const session = await getServerSession()
    return (
        <div className="p-6 space-y-8">

            {/* 🔥 Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Total Booked Classes */}
                <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition">
                    <FaBookmark className="text-3xl text-orange-500" />

                    <div>
                        <p className="text-gray-500 text-sm">Total Booked Classes</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {stats?.bookingCount || 0}
                        </h3>
                    </div>
                </div>

                {/* Total Favorites */}
                <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition">
                    <FaHeart className="text-3xl text-orange-500" />

                    <div>
                        <p className="text-gray-500 text-sm">Total Favorites</p>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {stats?.favoriteCount || 0}
                        </h3>
                    </div>
                </div>
            </div>

            {/* 👤 Profile Section */}
            <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-5">

                {session?.user?.image ? (
                    <img
                        src={session?.user.image}
                        alt="profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <FaUserCircle className="text-5xl text-gray-400" />
                )}

                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {session?.user?.name}
                    </h2>

                    <p className="text-sm text-gray-500">{session?.user?.email}</p>

                    {/* Role Badge */}
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
                        {session?.user?.role}
                    </span>
                </div>
            </div>

            {/* 🧑‍🏫 Trainer Application Status */}
            <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Trainer Application Status
                </h3>

                {/* Status Badge */}
                <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
            ${trainerApplication?.status === "Approved"
                            ? "bg-green-500 text-white"
                            : trainerApplication?.status === "Rejected"
                                ? "bg-red-500 text-white"
                                : "bg-yellow-500 text-white"
                        }
          `}
                >
                    {trainerApplication?.status || "Not Applied"}
                </span>

                {/* Rejection Feedback */}
                {trainerApplication?.status === "Rejected" && (
                    <p className="mt-3 text-sm text-red-500">
                        Admin Feedback: {trainerApplication?.feedback || "No feedback provided"}
                    </p>
                )}
            </div>

        </div>
    );
}