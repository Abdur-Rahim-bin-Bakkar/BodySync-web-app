"use client";

import { updateClass } from "@/lib/patch/updateClass";
import { useState } from "react";
// import { updateClass } from "@/lib/update/updateClass";
import toast from "react-hot-toast";

const UpdateClassModal = ({
    cls,
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        className: cls?.className || "",
        category: cls?.category || "",
        difficultyLevel: cls?.difficultyLevel || "",
        duration: cls?.duration || "",
        price: cls?.price || "",
        image: cls?.image || "",
        time: cls?.time || "",
        description: cls?.description || "",
        schedule: cls?.schedule || [],
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        cls?.image || ""
    );
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleScheduleChange = (day) => {
        setFormData((prev) => ({
            ...prev,
            schedule: prev.schedule.includes(day)
                ? prev.schedule.filter((d) => d !== day)
                : [...prev.schedule, day],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            let imageUrl = formData.image;

            if (imageFile) {
                const imageFormData = new FormData();
                imageFormData.append("image", imageFile);

                const uploadRes = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: imageFormData,
                    }
                );

                const uploadData = await uploadRes.json();

                if (!uploadData.success) {
                    throw new Error("Image upload failed");
                }

                imageUrl = uploadData.data.url;
            }

            const result = await updateClass(
                cls._id,
                {
                    ...formData,
                    image: imageUrl,
                }
            );

            if (result.success) {
                toast.success("Class updated successfully");

                onSuccess?.();
                onClose?.();

                window.location.reload();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">

            <div className="bg-white dark:bg-[#111827] w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                        Update Class
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* Class Name */}
                    <input
                        type="text"
                        name="className"
                        value={formData.className}
                        onChange={handleChange}
                        placeholder="Class Name"
                        className="w-full border p-3 rounded-lg"
                    />

                    {/* Category */}
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="w-full border p-3 rounded-lg"
                    />

                    {/* Difficulty */}
                    <input
                        type="text"
                        name="difficultyLevel"
                        value={formData.difficultyLevel}
                        onChange={handleChange}
                        placeholder="Difficulty"
                        className="w-full border p-3 rounded-lg"
                    />

                    {/* Duration */}
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Duration"
                        className="w-full border p-3 rounded-lg"
                    />

                    {/* Time */}
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    {/* Price */}
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border p-3 rounded-lg"
                    />

                    {/* Image */}
                    {/* Image Preview */}
                    <div className="space-y-3">
                        <img
                            src={previewImage}
                            alt="Class Preview"
                            className="w-full h-52 object-cover rounded-xl border"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    {/* Schedule */}
                    <div>
                        <h3 className="font-medium mb-2">
                            Schedule
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {days.map((day) => (
                                <label
                                    key={day}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.schedule.includes(
                                            day
                                        )}
                                        onChange={() =>
                                            handleScheduleChange(day)
                                        }
                                    />
                                    {day}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <textarea
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border p-3 rounded-lg"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 text-white py-3 rounded-lg"
                    >
                        {loading
                            ? "Updating..."
                            : "Update Class"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateClassModal;