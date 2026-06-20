// components/admin/AdminProfileCard.jsx
import React from "react";

const AdminProfileCard = ({ user }) => {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 flex items-center justify-between border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user?.name || "Admin"}
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                    {user?.email}
                </p>

                <span className="inline-block mt-2 px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                    Admin
                </span>
            </div>

            <img
                src={user?.image || "/avatar.png"}
                className="w-14 h-14 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                alt="admin"
            />
        </div>
    );
};

export default AdminProfileCard;