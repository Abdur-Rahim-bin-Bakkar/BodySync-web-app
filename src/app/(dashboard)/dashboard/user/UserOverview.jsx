import { getServerSession } from "@/lib/session/server";
import Image from "next/image";
import Link from "next/link";
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex items-center gap-5">

                    {session?.user?.image ? (
                        <Image
                            width={400}
                            height={300}
                            unoptimized
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
                <div className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

                    {/* TITLE */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        Trainer Application Status
                    </h3>

                    {/* STATUS BADGE */}
                    <div className="flex items-center justify-between">

                        <span
                            className={`inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full tracking-wide transition-all
                ${trainerApplication?.status === "Approved"
                                    ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30"
                                    : trainerApplication?.status === "Rejected"
                                        ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30"
                                        : trainerApplication?.status === "Pending"
                                            ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30"
                                            : "bg-gray-500/10 text-gray-500 dark:text-gray-400 border border-gray-500/30"
                                }`}
                        >
                            {trainerApplication?.status || "Not Applied"}
                        </span>

                    </div>

                    {/* DIVIDER */}
                    <div className="my-4 border-t border-gray-200 dark:border-gray-800" />

                    {/* REJECTED FEEDBACK */}
                    {trainerApplication?.status === "Rejected" && (
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                            <p className="text-sm text-red-600 dark:text-red-300 leading-relaxed">
                                <span className="font-semibold">Admin Feedback:</span>{" "}
                                {trainerApplication?.feedback || "No feedback provided"}
                            </p>
                        </div>
                    )}

                    {/* APPROVED MESSAGE */}
                    {trainerApplication?.status === "Approved" && (
                        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                            <p className="text-sm text-green-600 dark:text-green-300">
                                🎉 Congratulations! You are now a verified Trainer.
                            </p>
                        </div>
                    )}

                    {/* PENDING MESSAGE */}
                    {trainerApplication?.status === "Pending" && (
                        <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
                            <p className="text-sm text-yellow-600 dark:text-yellow-300">
                                ⏳ Your application is under review by admin.
                            </p>
                        </div>
                    )}

                    {/* NOT APPLIED */}
                    {!trainerApplication?.status && (
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                You have not applied as a trainer yet.
                            </p>
                        </div>
                    )}
                    <Link className="underline" href={'/dashboard/user/apply-trainer'}>Lets See Result</Link>


                </div>
            </div>

        </div>
    );
}