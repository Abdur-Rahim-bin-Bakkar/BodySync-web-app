"use client";

import { useState } from "react";

export default function AddClassForm() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    className: "",
    category: "",
    difficulty: "",
    duration: "",
    schedule: "",
    price: "",
    description: "",
  });

  // 📸 Image Upload to IMGBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      image,
      status: "Pending", // ⚡ default requirement
    };

    console.log(payload);

    // TODO: API call here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#0B0F14] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl space-y-4"
    >
      {/* Class Name */}
      <input
        name="className"
        onChange={handleChange}
        placeholder="Class Name"
        className="w-full p-3 rounded-xl border dark:bg-transparent"
      />

      {/* Category */}
      <input
        name="category"
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-3 rounded-xl border dark:bg-transparent"
      />

      {/* Difficulty */}
      <select
        name="difficulty"
        onChange={handleChange}
        className="w-full p-3 rounded-xl border dark:bg-transparent"
      >
        <option value="">Select Difficulty</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      {/* Duration */}
      <input
        name="duration"
        onChange={handleChange}
        placeholder="Duration (e.g. 1 hour)"
        className="w-full p-3 rounded-xl border dark:bg-transparent"
      />

      {/* Schedule */}
      <input
        name="schedule"
        onChange={handleChange}
        placeholder="Days & Time"
        className="w-full p-3 rounded-xl border dark:bg-transparent"
      />

      {/* Price */}
      <input
        name="price"
        type="number"
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-3 rounded-xl border dark:bg-transparent"
      />

      {/* Description */}
      <textarea
        name="description"
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-3 rounded-xl border dark:bg-transparent"
      />

      {/* Image Upload */}
      <div className="space-y-2">
        <input type="file" onChange={handleImageUpload} />

        {loading && (
          <p className="text-sm text-orange-500">Uploading image...</p>
        )}

        {/* Conditional Image Preview */}
        {image && (
          <img
            src={image}
            alt="uploaded"
            className="w-full h-56 object-cover rounded-xl"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
      >
        Create Class
      </button>
    </form>
  );
}