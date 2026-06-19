"use client";

import { useState } from "react";
import { UploadCloud, ImageIcon } from "lucide-react";
import { useUserSessionClient } from "@/lib/session/client";
import { createClass } from "@/lib/post/class";
import { useRouter } from "next/navigation";

export default function AddClassForm() {
  const router = useRouter()
  const session = useUserSessionClient()
  const trainerId = session?.user?.id
  console.log(trainerId)
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [form, setForm] = useState({
    className: "",
    category: "",
    difficultyLevel: "",
    duration: "",
    schedule: [],
    time: "",
    price: "",
    description: "",
  });

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      setImage(data.data.url);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Schedule Day Select
  const handleDaySelect = (day) => {
    setForm((prev) => ({
      ...prev,
      schedule: prev.schedule.includes(day)
        ? prev.schedule.filter((d) => d !== day)
        : [...prev.schedule, day],
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {
      ...form,
      image,
      status: "Pending",
      trainerId,
      bookingCount: 0
    };
    const postResult = await createClass(payload)
    console.log(postResult, 'post result')
    if (postResult?.insertedId) {
      router.push('/dashboard/trainer/my-classes')
    }

    console.log(payload, "eta payload data");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create New Class
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Fill in the details below to create a new fitness class.
        </p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Class Name */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Class Name
          </label>

          <input
            type="text"
            name="className"
            value={form.className}
            onChange={handleChange}
            placeholder="Enter class name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131A22] focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131A22] focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Category</option>
            <option value="Yoga">Yoga</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength Training">Strength Training</option>
            <option value="HIIT">HIIT</option>
            <option value="CrossFit">CrossFit</option>
            <option value="Zumba">Zumba</option>
            <option value="Pilates">Pilates</option>
          </select>
        </div>

        {/* difficultyLevel */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            difficultyLevel Level
          </label>

          <select
            name="difficultyLevel"
            value={form.difficultyLevel}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131A22] focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select difficultyLevel</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Duration
          </label>

          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="e.g. 60 Minutes"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131A22] focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Class Time
          </label>

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131A22] focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Price ($)
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter class fee"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131A22] focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Schedule Days */}
      <div className="mt-5">
        <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Class Schedule (Select Days)
        </label>

        <div className="flex flex-wrap gap-3">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDaySelect(day)}
              className={`px-4 py-2 rounded-xl border transition-all ${form.schedule.includes(day)
                ? "bg-orange-500 text-white border-orange-500"
                : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Write detailed information about this class..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131A22] focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      {/* Upload Section */}
      <div className="mt-6">
        <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Class Thumbnail
        </label>

        <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-orange-400 rounded-2xl p-8 cursor-pointer hover:border-orange-500 transition">
          <UploadCloud className="w-12 h-12 text-orange-500 mb-3" />

          <h3 className="font-semibold text-gray-900 dark:text-white">
            Upload Class Image
          </h3>

          <p className="text-sm text-gray-500 mt-1 text-center">
            Click here to upload an image for your fitness class
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {loading && (
          <p className="mt-3 text-orange-500 font-medium">
            Uploading image...
          </p>
        )}

        {image && (
          <div className="mt-5 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700">
              <ImageIcon className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium">
                Uploaded Preview
              </span>
            </div>

            <img
              src={image}
              alt="Preview"
              className="w-full h-72 object-cover"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
      >
        Create Class
      </button>
    </form>
  );
}