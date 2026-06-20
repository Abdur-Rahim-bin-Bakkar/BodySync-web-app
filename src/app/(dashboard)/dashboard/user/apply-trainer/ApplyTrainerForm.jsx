// import toast from "react-hot-toast";
"use client";

import { applyTrainer } from "@/lib/post/applyAsTrainer";
// import { applyAsTrainer } from "@/lib/post/applyAsTrainer";
import { useState } from "react";
import toast from "react-hot-toast";

const ApplyTrainerForm = ({ isApplied, userId }) => {
    const [experience, setExperience] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(experience, specialty, description)
    console.log(isApplied?.data)

    // 🚨 If already applied
    if (isApplied?.data) {
        return (
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
                <h2 className="text-xl font-semibold text-green-700">
                    Application Submitted
                </h2>

                <p className="text-sm text-green-600 mt-2">
                    Your application is currently under review. Status: <b>Pending</b>
                </p>
            </div>
        );
    }

    // 📝 Submit handler
    //  userId,
    //                 experience,
    //                 specialty,
    //                 status: "Pending",
    // import { applyAsTrainer } from "@/lib/api/applyAsTrainer";

    const handleSubmit = async (e) => {
        e.preventDefault();

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

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border p-6 rounded-xl space-y-4"
        >
            {/* Experience */}
            <div>
                <label className="text-sm font-medium">Experience (years)</label>
                <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="e.g. 2"
                    required
                />
            </div>

            {/* Specialty */}
            <div>
                <label className="text-sm font-medium">Specialty</label>
                <input
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="Yoga, Weights, Cardio..."
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="text-sm font-medium">Description</label>
                <textarea

                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="Write about your experience, skills, and background..."
                    rows={4}
                    required
                />
            </div>

            {/* Submit */}
            <button
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded-lg"
            >
                {loading ? "Submitting..." : "Apply Now"}
            </button>
        </form>
    );
};

export default ApplyTrainerForm;