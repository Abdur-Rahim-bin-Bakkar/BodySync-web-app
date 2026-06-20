"use client";

import { useEffect, useState } from "react";
import {
    getUsers,
    updateUserStatus,
    makeAdmin,
} from "@/lib/api/users";
import { toast } from "sonner";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const loadUsers = async (searchText = "") => {
        setLoading(true);
        const res = await getUsers(searchText);
        setUsers(res.data || []);
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        setTimeout(() => {
            loadUsers(value);
        }, 300);
    };

    const handleStatus = async (id, status) => {
        const res = await updateUserStatus(id, status);

        if (res.success) {
            toast.success(`User ${status}`);

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === id ? { ...u, status } : u
                )
            );
        }
    };

    const handleMakeAdmin = async (id) => {
        const res = await makeAdmin(id);

        if (res.success) {
            toast.success("Made admin");

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === id ? { ...u, role: "admin" } : u
                )
            );
        }
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">

            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Manage Users
            </h1>

            {/* SEARCH */}
            <p className="font-bold my-2 text-gray-700 dark:text-gray-300">
                Search By Email
            </p>

            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by email..."
                className="border border-gray-300 dark:border-gray-700 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-white 
                p-2 rounded w-full mb-4 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* LOADING */}
            {loading && (
                <p className="mb-3 text-gray-500 dark:text-gray-400">
                    Loading users...
                </p>
            )}

            {/* TABLE WRAPPER */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">

                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr className="text-gray-700 dark:text-gray-200">
                            <th className="p-3 text-left">Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                {/* NAME */}
                                <td className="p-3 flex items-center gap-3 text-gray-900 dark:text-white">

                                    {
                                        user?.image ?
                                        <Image
                                            className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                                            src={user?.image}
                                            alt="user profile photo"
                                            width={100}
                                            height={100}
                                        />
                                        :
                                        <FaUser />
                                    }
                                    {user.name}
                                </td>

                                {/* EMAIL */}
                                <td className="text-gray-700 dark:text-gray-300">
                                    {user.email}
                                </td>

                                {/* ROLE */}
                                <td className="capitalize text-gray-700 dark:text-gray-300">
                                    {user.role}
                                </td>

                                {/* STATUS */}
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-medium ${user.status === "blocked"
                                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            }`}
                                    >
                                        {user.status || "active"}
                                    </span>
                                </td>

                                {/* ACTIONS */}
                                <td className="flex gap-2 p-2">
                                    {user.status === "blocked" ? (
                                        <button
                                            onClick={() =>
                                                handleStatus(user._id, "active")
                                            }
                                            className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white transition"
                                        >
                                            Unblock
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleStatus(user._id, "blocked")
                                            }
                                            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
                                        >
                                            Block
                                        </button>
                                    )}

                                    {user.role !== "admin" && (
                                        <button
                                            onClick={() =>
                                                handleMakeAdmin(user._id)
                                            }
                                            className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}