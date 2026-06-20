"use client";

import { useEffect, useState } from "react";
import { getUsers, updateUserStatus, makeAdmin } from "@/lib/api/users";
import { toast } from "sonner";

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const res = await getUsers();
            setUsers(res.data || []);
        };

        loadUsers();
    }, []);

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Manage Users
            </h1>

            <table className="w-full bg-white shadow rounded-xl">
                <thead>
                    <tr className="border-b">
                        <th className="p-3 text-left">Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b">
                            <td className="p-3">{user.name}</td>
                            <td>{user.email}</td>

                            <td>
                                <span className="capitalize">
                                    {user.role}
                                </span>
                            </td>

                            <td>
                                <span
                                    className={`px-2 py-1 rounded text-sm ${
                                        user.status === "blocked"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                    }`}
                                >
                                    {user.status || "active"}
                                </span>
                            </td>

                            <td className="flex gap-2 p-2">
                                {user.status === "blocked" ? (
                                    <button
                                        onClick={() =>
                                            handleStatus(user._id, "active")
                                        }
                                        className="px-3 py-1 bg-green-500 text-white rounded"
                                    >
                                        Unblock
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleStatus(user._id, "blocked")
                                        }
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Block
                                    </button>
                                )}

                                {user.role !== "admin" && (
                                    <button
                                        onClick={() =>
                                            handleMakeAdmin(user._id)
                                        }
                                        className="px-3 py-1 bg-blue-500 text-white rounded"
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
    );
}