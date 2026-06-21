"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaClock,
    FaCalendarAlt,
    FaSignal,
    FaUsers,
    FaHeart,
} from "react-icons/fa";
import { useUserSessionClient } from "@/lib/session/client";

// ⭐ react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClassDetails = ({
    classData,
    booked = false,
    favorite = false,
}) => {
    const router = useRouter();
    const session = useUserSessionClient();
    const isBlocked = session?.user?.status === "blocked";

    const userId = session?.user?.id;
    const classId = classData?._id;
    console.log(classId)
    const [isFavorite, setIsFavorite] = useState(favorite);
    const [loading, setLoading] = useState(false);
    // console.log(isFavorite, 'favo')



    // ⭐ FAVORITE TOGGLE
    const handleFavorite = async () => {
        if (!userId) {
            toast.error("Please login first");
            return;
        }

        setLoading(true);

        const toastId = toast.loading("Processing...");

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
                toast.update(toastId, {
                    render: data.message || "Something went wrong",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
                return;
            }

            if (data.type === "added") {
                setIsFavorite(true);

                toast.update(toastId, {
                    render: "Added to favorites ❤️",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            } else {
                setIsFavorite(false);

                toast.update(toastId, {
                    render: "Removed from favorites 💔",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast.update(toastId, {
                render: "Server error",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            {/* ⭐ Toast Container (fixed top-center) */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />

            {/* HERO */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">

                <div>
                    <img
                        src={classData.image}
                        alt={classData.className}
                        className="w-full h-[450px] object-cover rounded-3xl shadow-lg"
                    />
                </div>

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

                    <div className="grid grid-cols-2 gap-4 mt-8">

                        <div className="border rounded-2xl p-4">
                            <FaSignal className="text-orange-500 text-xl mb-2" />
                            <p className="text-sm text-gray-500">Difficulty</p>
                            <h3 className="font-semibold">
                                {classData.difficultyLevel}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-4">
                            <FaClock className="text-orange-500 text-xl mb-2" />
                            <p className="text-sm text-gray-500">Duration</p>
                            <h3 className="font-semibold">
                                {classData.duration}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-4">
                            <FaCalendarAlt className="text-orange-500 text-xl mb-2" />
                            <p className="text-sm text-gray-500">Schedule</p>
                            <h3 className="font-semibold text-sm">
                                {classData.schedule}
                            </h3>
                        </div>

                        <div className="border rounded-2xl p-4">
                            <FaUsers className="text-orange-500 text-xl mb-2" />
                            <p className="text-sm text-gray-500">Bookings</p>
                            <h3 className="font-semibold">
                                {classData.bookingCount}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

                        <div>
                            <p className="text-gray-500">Price</p>
                            <h2 className="text-3xl font-bold text-orange-500">
                                ${classData.price}
                            </h2>
                        </div>

                        <div className="flex gap-3">
                            <form action="/api/checkout_sessions" method="POST">
                                <input type="hidden" name="classId" value={classId || 'noid'} />
                                <input type="hidden" name="userId" value={userId || 'noid'} />
                                <section>
                                    <button
                                        disabled={booked || isBlocked}
                                        className={`px-8 py-3 rounded-xl font-medium text-white transition ${booked || isBlocked
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-orange-500 hover:bg-orange-600"
                                            }`}
                                        type="submit"
                                    >
                                        {isBlocked
                                            ? "Blocked User"
                                            : booked
                                                ? "Already Booked"
                                                : "Book Now"}
                                    </button>
                                </section>
                            </form>


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

        </div>
    );
};

export default ClassDetails;