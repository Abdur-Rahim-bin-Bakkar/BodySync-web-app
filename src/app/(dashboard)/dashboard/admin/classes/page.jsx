"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAdminClasses } from "@/lib/api/getAdminClasses";
import { getUserById } from "@/lib/api/getUserById";
import ActionButtons from "./ActionButtons";
import Image from "next/image";

export default function ManageClassesPage() {
    const [classes, setClasses] = useState([]);
    const [usersMap, setUsersMap] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await getAdminClasses();
        const classData = result?.data || [];

        setClasses(classData);

        const userPromises = classData.map(async (cls) => {
            if (!cls.userId) return null;

            const user = await getUserById(cls.userId);

            return {
                id: cls.userId,
                user: user?.data || null,
            };
        });

        const users = await Promise.all(userPromises);

        const map = {};
        users.forEach((u) => {
            if (u?.id) map[u.id] = u.user;
        });

        setUsersMap(map);
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">

            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Manage Classes
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Approve, reject or manage trainer submitted classes
                </p>
            </div>

            {/* TABLE WRAPPER */}
            <div className="bg-base-100 rounded-2xl shadow-xl overflow-x-auto">

                <table className="w-full min-w-[700px] border-collapse">

                    {/* HEADER */}
                    <thead className="bg-orange-500 text-white sticky top-0 z-10">
                        <tr className="text-left text-sm font-semibold">
                            <th className="p-4 whitespace-nowrap">Trainer</th>
                            <th className="p-4 whitespace-nowrap">Status</th>
                            <th className="p-4 whitespace-nowrap">Price</th>
                            <th className="p-4 text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {classes.map((cls, index) => {
                            const user = usersMap[cls.userId];

                            return (
                                <motion.tr
                                    key={cls._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        delay: index * 0.03,
                                    }}
                                    className="
                                        border-b
                                        border-base-300
                                        hover:bg-base-200
                                        transition-all
                                        duration-200
                                    "
                                >

                                    {/* TRAINER */}
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-3 ">

                                            <Image
                                                width={400}
                                                height={300}
                                                unoptimized
                                                src={
                                                    user?.image ||
                                                    "https://via.placeholder.com/40"
                                                }
                                                className="w-10 h-10 rounded-full object-cover border"
                                                alt="user"
                                            />

                                            <div className="flex flex-col leading-tight">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {user?.name || "Unknown"}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {user?.status || "active"}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* STATUS */}
                                    <td className="p-4 align-middle">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-medium inline-block whitespace-nowrap ${cls.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : cls.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {cls.status || "pending"}
                                        </span>
                                    </td>

                                    {/* PRICE */}
                                    <td className="p-4 align-middle font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                        ${cls.price}
                                    </td>

                                    {/* ACTION */}
                                    <td className="p-4 text-right align-middle whitespace-nowrap">
                                        <ActionButtons
                                            id={cls._id.toString()}
                                            setClasses={setClasses}
                                        />
                                    </td>

                                </motion.tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    );
}