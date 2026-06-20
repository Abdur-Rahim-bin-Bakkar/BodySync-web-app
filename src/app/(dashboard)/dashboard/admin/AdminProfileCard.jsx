// components/admin/AdminProfileCard.jsx
import React from "react";

const AdminProfileCard = ({ user }) => {
    console.log(user,'image')
    return (
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold">{user?.name || "Admin"}</h2>
                <p className="text-gray-500">{user?.email}</p>

                <span className="inline-block mt-2 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-full">
                    Admin
                </span>
            </div>

            <img
                src={user?.image || "/avatar.png"}
                className="w-14 h-14 rounded-full object-cover"
                alt="admin"
            />
        </div>
    );
};

export default AdminProfileCard;