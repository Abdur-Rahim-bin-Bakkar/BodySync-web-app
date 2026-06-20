"use client";

import { useEffect, useState } from "react";
import {
    getApplications,
    approveTrainer,
    rejectTrainer,
} from "@/lib/api/trainer";
import { toast } from "sonner";

export default function AppliedTrainersPage() {
    const [apps, setApps] = useState([]);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await getApplications();
        setApps(res.data || []);
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
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

            {/* TITLE */}
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Applied Trainers
            </h1>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 shadow rounded-xl overflow-hidden">

                    {/* HEAD */}
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr className="text-gray-700 dark:text-gray-200">
                            <th className="p-3 text-left">Name</th>
                            <th>Specialty</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {apps.map((app) => (
                            <tr
                                key={app._id}
                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                <td className="p-3 text-gray-900 dark:text-white">
                                    {app.userId}
                                </td>

                                <td className="text-gray-700 dark:text-gray-300">
                                    {app.specialty}
                                </td>

                                <td>
                                    <span
                                        className={`px-2 py-1 text-sm rounded font-medium ${
                                            app.status === "Approved"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : app.status === "Rejected"
                                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        }`}
                                    >
                                        {app.status || "Pending"}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        onClick={() => setSelected(app)}
                                        className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white transition"
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* MODAL */}
            {selected && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

                    <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6 transition-all">

                        {/* TITLE */}
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            Application Details
                        </h2>

                        {/* INFO */}
                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <p>
                                <span className="font-semibold">Experience:</span>{" "}
                                {selected.experience}
                            </p>

                            <p>
                                <span className="font-semibold">Specialty:</span>{" "}
                                {selected.specialty}
                            </p>

                            <p>
                                <span className="font-semibold">Description:</span>{" "}
                                {selected.description}
                            </p>
                        </div>

                        {/* FEEDBACK */}
                        <textarea
                            className="w-full mt-4 p-2 rounded border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-2 mt-4">

                            <button
                                onClick={handleApprove}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
                            >
                                Approve
                            </button>

                            <button
                                onClick={handleReject}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
                            >
                                Reject
                            </button>

                        </div>

                        {/* CLOSE */}
                        <button
                            onClick={() => {
                                setSelected(null);
                                setFeedback("");
                            }}
                            className="w-full mt-3 py-2 rounded bg-gray-300 dark:bg-gray-600 
                            text-gray-900 dark:text-white hover:opacity-80 transition"
                        >
                            Close
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}