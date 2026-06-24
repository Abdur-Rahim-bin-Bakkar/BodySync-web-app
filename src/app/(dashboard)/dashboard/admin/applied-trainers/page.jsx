"use client";

import { useEffect, useState } from "react";
import {
    getApplications,
    approveTrainer,
    rejectTrainer,
} from "@/lib/api/trainer";

import { toast } from "sonner";
import { getUserById } from "@/lib/api/getUserById";
import Image from "next/image";

export default function AppliedTrainersPage() {
    const [apps, setApps] = useState([]);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState("");

    const [usersMap, setUsersMap] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await getApplications();
        const appsData = res.data || [];

        setApps(appsData);

        const userPromises = appsData.map(async (app) => {
            if (!app.userId) return null;
            const user = await getUserById(app.userId);

            return {
                id: app.userId,
                user: user?.data || null,
            };
        });

        const users = await Promise.all(userPromises);

        const userMap = {};
        users.forEach((u) => {
            if (u?.id) userMap[u.id] = u.user;
        });

        setUsersMap(userMap);
    };

    const handleApprove = async () => {
        const res = await approveTrainer(selected._id, feedback);

        if (res.success) {
            toast.success("Approved");
            setSelected(null);
            setFeedback("");
            loadData();
        }
    };

    const handleReject = async () => {
        const res = await rejectTrainer(selected._id, feedback);

        if (res.success) {
            toast.success("Rejected");
            setSelected(null);
            setFeedback("");
            loadData();
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">

            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Applied Trainers
            </h1>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">

                    {/* HEADER */}
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr className="text-left text-gray-700 dark:text-gray-200">
                            <th className="p-3 w-[35%]">User</th>
                            <th className="p-3 w-[25%]">Specialty</th>
                            <th className="p-3 w-[20%]">Status</th>
                            <th className="p-3 w-[20%] text-center">Action</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {apps.map((app) => {
                            const user = usersMap[app.userId];

                            return (
                                <tr
                                    key={app._id}
                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >

                                    {/* USER */}
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">

                                            <Image
                                                width={400}
                                                height={300}
                                                unoptimized
                                                src={user?.image || "https://via.placeholder.com/40"}
                                                className="w-10 h-10 rounded-full object-cover border"
                                                alt="user"
                                            />

                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {user?.name || "Unknown User"}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {user?.status || "active"}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* SPECIALTY */}
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {app.specialty}
                                    </td>

                                    {/* STATUS */}
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 text-sm rounded-full font-medium inline-block ${app.status === "Approved"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : app.status === "Rejected"
                                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                }`}
                                        >
                                            {app.status || "Pending"}
                                        </span>
                                    </td>

                                    {/* ACTION */}
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => setSelected(app)}
                                            className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition"
                                        >
                                            Details
                                        </button>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

            {/* MODAL */}
            {selected && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

                    <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6">

                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            Application Details
                        </h2>

                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <p><b>Experience:</b> {selected.experience}</p>
                            <p><b>Specialty:</b> {selected.specialty}</p>
                            <p><b>Description:</b> {selected.description}</p>
                        </div>

                        <textarea
                            className="w-full mt-4 p-2 rounded border"
                            placeholder="Write feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={handleApprove}
                                className="flex-1 bg-green-500 text-white py-2 rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={handleReject}
                                className="flex-1 bg-red-500 text-white py-2 rounded"
                            >
                                Reject
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                setSelected(null);
                                setFeedback("");
                            }}
                            className="w-full mt-3 py-2 rounded bg-gray-300 dark:bg-gray-600"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}