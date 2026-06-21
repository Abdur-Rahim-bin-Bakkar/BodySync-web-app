"use client";

import { useState } from "react";
import { UploadCloud, ImageIcon } from "lucide-react";
import { useUserSessionClient } from "@/lib/session/client";
import { createForumPost } from "@/lib/post/forum";
import { useRouter } from "next/navigation";

export default function AddForumPostForm() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const session = useUserSessionClient()
  // const session = useUserSessionClient()
  const router = useRouter()

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Image Upload to IMGBB
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

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      image,
      userId: session?.user?.id
    };

    const postResult = await createForumPost(payload)
    if (postResult?.insertedId) {
      router.push('/dashboard/admin/my-forum')
    }

    console.log(payload, "forum post data");
    console.log(postResult, "forum post data");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Post Title
        </label>

        <input
          type="text"
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="Enter post title"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          required
          onChange={handleChange}
          rows={6}
          placeholder="Write your forum post..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Post Image
        </label>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-orange-400 rounded-2xl p-8 cursor-pointer hover:border-orange-500 transition">
          <UploadCloud className="w-10 h-10 text-orange-500 mb-2" />

          <p className="text-sm text-gray-500">
            Click to upload image
          </p>

          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {loading && (
          <p className="mt-2 text-orange-500 text-sm">
            Uploading image...
          </p>
        )}

        {image && (
          <div className="mt-4 border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 p-2 border-b">
              <ImageIcon size={16} />
              <span className="text-sm">Preview</span>
            </div>

            <img
              src={image}
              alt="post"
              className="w-full h-64 object-cover"
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
      >
        Publish Post
      </button>
    </form>
  );
}