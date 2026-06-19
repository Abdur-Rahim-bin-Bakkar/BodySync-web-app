"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { removeFavorite } from "@/lib/deletes/removeFavorite";
import { getClassById } from "@/lib/api/getClassDetails";

const FavoriteCard = ({ item }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [classData, setClassData] = useState(null);
    const [loadingClass, setLoadingClass] = useState(true);

    // ⭐ FETCH CLASS DETAILS
    useEffect(() => {
        const fetchClass = async () => {
            try {
                const data = await getClassById(item.classId);
                setClassData(data);
            } catch (error) {
                toast.error("Failed to load class data");
            } finally {
                setLoadingClass(false);
            }
        };

        fetchClass();
    }, [item.classId]);

    // ⭐ REMOVE FAVORITE
    const handleRemove = async () => {
        setLoading(true);

        const toastId = toast.loading("Removing from favorites...");

        try {
            await removeFavorite(item._id);

            toast.update(toastId, {
                render: "Removed from favorites",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            router.refresh();

        } catch (error) {
            toast.update(toastId, {
                render: error.message || "Failed to remove",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    // ⭐ LOADING UI
    if (loadingClass) {
        return (
            <div className="border rounded-xl p-4 animate-pulse">
                Loading class...
            </div>
        );
    }

    return (
        <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white dark:bg-gray-900">

            {/* IMAGE */}
            <img
                src={classData?.image}
                alt={classData?.className}
                className="h-44 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-4">
                <h2 className="font-bold text-lg">
                    {classData?.className}
                </h2>

                <p className="text-sm text-gray-500">
                    {classData?.category}
                </p>

                <p className="text-orange-500 font-bold mt-2">
                    ${classData?.price}
                </p>

                {/* ACTIONS */}
                <div className="flex justify-between mt-4 items-center">

                    <button
                        onClick={() =>
                            router.push(`/classes/${item.classId}`)
                        }
                        className="text-sm text-blue-500 hover:underline"
                    >
                        View Details
                    </button>

                    <button
                        onClick={handleRemove}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700 transition disabled:opacity-50"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;