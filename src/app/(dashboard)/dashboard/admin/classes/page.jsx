"use client";

import { motion } from "framer-motion";
import { getAdminClasses } from "@/lib/api/getAdminClasses";
import ActionButtons from "./ActionButtons";
import { useEffect, useState } from "react";

export default function ManageClassesPage() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAdminClasses();
            setClasses(result?.data || []);
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Manage Classes
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Approve, reject or manage trainer submitted classes
                </p>
            </div>

            {/* CARD */}
            <div className="bg-base-100 rounded-2xl shadow-xl p-2 md:p-4">
                <div className="space-y-3">

                    {classes.map((cls, index) => (
                        <motion.div
                            key={cls._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.25,
                                delay: index * 0.05,
                            }}
                            whileHover={{
                                scale: 1.01,
                                boxShadow:
                                    "0px 10px 25px rgba(0,0,0,0.08)",
                            }}
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-5
                                gap-3
                                md:gap-4
                                items-start
                                md:items-center
                                p-4
                                rounded-xl
                                bg-base-200
                                border
                                border-base-300
                                hover:bg-base-300
                                transition
                            "
                        >
                            <div className="font-semibold">
                                {cls.className}
                            </div>

                            <div className="text-sm text-gray-500 break-all">
                                {cls.userId}
                            </div>

                            <div>
                                <span
                                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                                        cls.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : cls.status === "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {cls.status || "pending"}
                                </span>
                            </div>

                            <div className="font-medium">
                                ${cls.price}
                            </div>

                            <div className="flex md:justify-end">
                                <ActionButtons
                                    id={cls._id.toString()}
                                    setClasses={setClasses}
                                />
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </div>
    );
}