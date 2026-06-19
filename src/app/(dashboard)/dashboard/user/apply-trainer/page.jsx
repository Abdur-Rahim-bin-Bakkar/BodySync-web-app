"use client";

import { useState } from "react";

export default function ApplyTrainerPage({ application }) {
  const [experience, setExperience] = useState("");
  const [specialty, setSpecialty] = useState("");

  // if already applied → show status UI
  if (application) {
    return (
      <div className="p-6">
        <div className="max-w-xl mx-auto bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4">

          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Trainer Application Status
          </h2>

          {/* Status Badge */}
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
              ${
                application.status === "Approved"
                  ? "bg-green-500 text-white"
                  : application.status === "Rejected"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-500 text-white"
              }
            `}
          >
            {application.status || "Pending"}
          </span>

          {/* Details */}
          <div className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
            <p><strong>Experience:</strong> {application.experience} years</p>
            <p><strong>Specialty:</strong> {application.specialty}</p>
          </div>

          {/* Feedback */}
          {application.status === "Rejected" && (
            <p className="text-sm text-red-500">
              Admin Feedback: {application.feedback}
            </p>
          )}

        </div>
      </div>
    );
  }

  // APPLY FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      experience,
      specialty,
      status: "Pending",
    };

    console.log("Submitted:", data);

    // later: API call
    alert("Application Submitted (Pending)");
  };

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Apply as Trainer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Experience */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Experience (years)
            </label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              required
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Specialty
            </label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              required
            >
              <option value="">Select Specialty</option>
              <option value="Yoga">Yoga</option>
              <option value="Weights">Weights</option>
              <option value="Cardio">Cardio</option>
              <option value="CrossFit">CrossFit</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
          >
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}