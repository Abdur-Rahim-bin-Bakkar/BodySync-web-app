"use client";

import { useEffect, useState } from "react";
import { getAllTrainers } from "@/lib/api/getAllTrainers";
import RemoveTrainerButton from "./RemoveTrainerButton";
import Image from "next/image";

export default function ManageTrainersPage() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        const result = await getAllTrainers();
        setTrainers(result?.data || []);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="p-10 text-center text-lg font-medium">
                Loading trainers...
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Manage Trainers
            </h1>

            <div className="overflow-x-auto rounded-2xl shadow-lg bg-base-100">
                <table className="table w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-left text-sm md:text-base bg-base-200">
                            <th className="py-3 px-4">No</th>
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {trainers.map((trainer, index) => (
                            <tr
                                key={trainer._id}
                                className="
                                    bg-base-100
                                    hover:bg-base-200
                                    transition-all
                                    duration-200
                                    shadow-sm
                                    rounded-xl
                                "
                            >
                                <td className="px-4 py-4 font-medium">
                                    {index + 1}
                                </td>

                                <td className="px-4 py-4">
                                    <Image
                                        width={400}
                                        height={300}
                                        unoptimized
                                        src={trainer.image}
                                        alt={trainer.name}
                                        className="w-12 h-12 rounded-full object-cover border"
                                    />
                                </td>

                                <td className="px-4 py-4 font-semibold">
                                    {trainer.name}
                                </td>

                                <td className="px-4 py-4 text-sm text-gray-500">
                                    {trainer.email}
                                </td>

                                <td className="px-4 py-4">
                                    <span className="badge badge-success px-3 py-2">
                                        Trainer
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <RemoveTrainerButton
                                        trainerId={trainer._id}
                                        onSuccess={loadData}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {trainers.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No trainers found
                    </div>
                )}
            </div>
        </div>
    );
}