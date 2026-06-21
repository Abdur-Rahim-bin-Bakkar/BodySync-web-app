"use client";

import { applyTrainer } from "@/lib/post/applyAsTrainer";
import { useUserSessionClient } from "@/lib/session/client";
// import { useUserSessionClient } from "@/lib/session/client";
import { useState } from "react";
import toast from "react-hot-toast";

const ApplyTrainerForm = ({ isApplied, userId }) => {
    const [experience, setExperience] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const session = useUserSessionClient()

    const data = isApplied?.data;

    // 🚨 IF ALREADY APPLIED
    if (data) {

        const status = data.status;

        return (
            <div className="w-full bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl text-center shadow-sm">

                {/* STATUS BADGE */}
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4
                    ${status === "Approved"
                        ? "bg-green-500 text-white"
                        : status === "Rejected"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-white"
                    }
                `}>
                    {status}
                </span>

                {/* TITLE */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Trainer Application Status
                </h2>

                {/* MESSAGE */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {status === "Approved" &&
                        "🎉 Congratulations! You are now a Trainer."}

                    {status === "Rejected" &&
                        "❌ Your application was not approved."}

                    {status === "Pending" &&
                        "⏳ Your application is under review."}
                </p>

                {/* FEEDBACK */}
                {data.feedback && (
                    <div className="mt-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                        <b>Admin Feedback:</b> {data.feedback}
                    </div>
                )}
            </div>
        );
    }

    // 📝 SUBMIT
    const handleSubmit = async (e) => {
        // const session = 
        e.preventDefault();

        if (session?.user?.status === 'blocked') {
            toast.error('blocked by admin')
            return
        }

        if (!experience || !specialty || !description) {
            return toast.error("All fields are required");
        }

        try {
            setLoading(true);

            await applyTrainer({
                userId,
                experience,
                specialty,
                description,
            });

            toast.success("Application submitted");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // 🧾 FORM UI
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl space-y-5 shadow-sm"
        >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Apply as Trainer
            </h2>

            {/* EXPERIENCE */}
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Experience (years)
                </label>
                <input
                    type="number"
                    value={experience}
                    required
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="e.g. 2"
                />
            </div>

            {/* SPECIALTY */}
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Specialty
                </label>
                <input
                    type="text"
                    value={specialty}
                    required
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Yoga, Weights, Cardio..."
                />
            </div>

            {/* DESCRIPTION */}
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                </label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="Tell us about your experience..."
                    rows={4}
                />
            </div>

            {/* SUBMIT */}
            <button
                disabled={loading}
                className="w-full py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition"
            >
                {loading ? "Submitting..." : "Apply Now"}
            </button>
        </form>
    );
};

export default ApplyTrainerForm;