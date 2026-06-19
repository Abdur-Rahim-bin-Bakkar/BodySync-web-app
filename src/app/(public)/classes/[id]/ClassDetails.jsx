"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    FaClock,
    FaCalendarAlt,
    FaSignal,
    FaUsers,
    FaHeart,
} from "react-icons/fa";
import { useUserSessionClient } from "@/lib/session/client";

const ClassDetails = ({
    classData,
    booked = false,
    favorite = false,
}) => {
    const router = useRouter();
    const session = useUserSessionClient();

    const userId = session?.user?.id;
    const classId = classData?._id;

    const [isFavorite, setIsFavorite] = useState(favorite);
    const [loading, setLoading] = useState(false);

    // ⭐ STEP 1: Check initial favorite status from DB
    useEffect(() => {
        const checkFavorite = async () => {
            if (!userId || !classId) return;

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URI}/favorites/check?userId=${userId}&classId=${classId}`
                );

                const data = await res.json();

                if (res.ok) {
                    setIsFavorite(data.isFavorite);
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkFavorite();
    }, [userId, classId]);

    // ⭐ BOOK CLASS
    const handleBookNow = () => {
        if (booked) {
            toast.error("You have already booked this class");
            return;
        }

        router.push(`/payment/${classData._id}`);
    };

    // ⭐ FAVORITE TOGGLE (ADD + REMOVE)
    const handleFavorite = async () => {
        if (!userId) {
            toast.error("Please login first");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URI}/favorites/toggle`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        classId: classData._id,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Something went wrong");
                return;
            }

            // ⭐ UI UPDATE
            if (data.type === "added") {
                setIsFavorite(true);
                toast.success("Added to favorites");
            } else {
                setIsFavorite(false);
                toast.success("Removed from favorites");
            }
        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* HERO SECTION */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">

                {/* IMAGE */}
                <div>
                    <img
                        src={classData.image}
                        alt={classData.className}
                        className="w-full h-[450px] object-cover rounded-3xl shadow-lg"
                    />
                </div>

                {/* DETAILS */}
                <div>
                    <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                        {classData.category}
                    </span>

                    <h1 className="text-4xl font-bold mt-4 text-gray-900 dark:text-white">
                        {classData.className}
                    </h1>

                    <p className="mt-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                        {classData.description}
                    </p>

                    {/* INFO CARDS */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="border rounded-2xl p-4">
                            <FaSignal className="text-orange-500 text-xl mb-2" />
                            <p className="text-sm text-gray-500">
                                Difficulty
                            </p>
                            <h3 className="font-semibold">
                                {classData.difficultyLevel}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-4">
                            <FaClock className="text-orange-500 text-xl mb-2" />
                            <p className="text-sm text-gray-500">
                                Duration
                            </p>
                            <h3 className="font-semibold">
                                {classData.duration}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-4">
                            <FaCalendarAlt className="text-orange-500 text-xl mb-2" />
                            <p className="text-sm text-gray-500">
                                Schedule
                            </p>
                            <h3 className="font-semibold text-sm">
                                {classData.schedule}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-4">
                            <FaUsers className="text-orange-500 text-xl mb-2" />
                            <p className="text-sm text-gray-500">
                                Bookings
                            </p>
                            <h3 className="font-semibold">
                                {classData.bookingCount}
                            </h3>
                        </div>
                    </div>

                    {/* PRICE + ACTIONS */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-gray-500">Price</p>
                            <h2 className="text-3xl font-bold text-orange-500">
                                ${classData.price}
                            </h2>
                        </div>

                        <div className="flex gap-3">

                            {/* BOOK BUTTON */}
                            <button
                                onClick={handleBookNow}
                                disabled={booked}
                                className={`px-8 py-3 rounded-xl font-medium text-white transition ${booked
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-orange-500 hover:bg-orange-600"
                                    }`}
                            >
                                {booked ? "Already Booked" : "Book Now"}
                            </button>

                            {/* FAVORITE BUTTON */}
                            <button
                                onClick={handleFavorite}
                                disabled={loading}
                                className={`px-6 py-3 rounded-xl border flex items-center gap-2 transition ${isFavorite
                                        ? "bg-orange-500 text-white border-orange-500"
                                        : "border-orange-500 text-orange-500 hover:bg-orange-50"
                                    }`}
                            >
                                <FaHeart />

                                {isFavorite
                                    ? "Saved To Favorites"
                                    : "Add To Favorites"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EXTRA INFO */}
            <div className="mt-14 border rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4">
                    Class Information
                </h2>

                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <p>
                        <span className="font-semibold">
                            Trainer ID:
                        </span>{" "}
                        {classData.trainerId}
                    </p>

                    <p>
                        <span className="font-semibold">
                            Status:
                        </span>{" "}
                        <span className="capitalize">
                            {classData.status}
                        </span>
                    </p>

                    <p>
                        <span className="font-semibold">
                            Created At:
                        </span>{" "}
                        {new Date(
                            classData.createdAt
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;