"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const googleSignIn = async () => {
        const res = await authClient.signIn.social({
            provider: "google",
        });

        if (res?.user) {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/users/sync`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(res.user),
            });
        }
    };
    const router = useRouter()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // validation
    const validatePassword = (password) => {
        return (
            password.length >= 6 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password)
        );
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // upload image to imgbb
    const uploadImage = async (file) => {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        return data.data.url;
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);

        if (selected) {
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 🔴 REQUIRED VALIDATION
            if (!form.name || !form.email || !form.password || !file) {
                setError("All fields including image are required");
                setLoading(false);
                return;
            }

            // 🔴 PASSWORD VALIDATION
            if (!validatePassword(form.password)) {
                setError(
                    "Password must be 6+ chars with uppercase & lowercase letters"
                );
                setLoading(false);
                return;
            }

            let imageUrl = "";

            if (file) {
                imageUrl = await uploadImage(file);
            }

            const payload = {
                ...form,
                image: imageUrl,
                role: "user",
            };

            const { data, error } = await authClient.signUp.email(payload);
            if (data) {
                router.push('/')
            }

            console.log("REGISTER DATA:", payload);
            console.log("DATA:", data);
            console.log("ERROR:", error);

            // alert("Registration Successful 🚀");
        } catch (err) {
            console.log(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex bg-[#1d2f45] text-white py-10">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-md"
                >
                    {/* TITLE */}
                    <h1 className="text-4xl font-bold leading-tight">
                        Join <span className="text-[#FF6A1C]">BodySync</span>
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="text-gray-400 mt-4">
                        A modern fitness & gym management platform designed for users,
                        trainers, and admins to connect, grow, and transform fitness journeys.
                    </p>

                    {/* FEATURE LIST */}
                    <div className="mt-6 space-y-3 text-gray-300 text-sm">

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            ✔ Book fitness classes anytime, anywhere
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            ✔ Connect with professional trainers
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            ✔ Track workout progress & performance
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            ✔ Join community discussions & forums
                        </motion.p>
                    </div>

                    {/* HIGHLIGHT BOX */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 p-4 border border-white/10 rounded-lg bg-white/5"
                    >
                        <p className="text-sm text-gray-300">
                            💡 Build your fitness journey with <span className="text-[#FF6A1C] font-semibold">BodySync</span> and stay consistent with smart tracking.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-6"
                >

                    <h2 className="text-2xl font-bold text-center">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                        {/* NAME */}
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            autoComplete="off"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10"
                        />

                        {/* EMAIL */}
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            autoComplete="off"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10"
                        />

                        {/* PASSWORD */}
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            autoComplete="new-password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10"
                        />

                        {/* IMAGE UPLOAD */}
                        <label className="w-full flex flex-col items-center justify-center border border-white/10 rounded-md p-4 cursor-pointer hover:border-[#FF6A1C] transition">

                            <Upload className="text-[#FF6A1C]" />

                            <span className="text-sm text-gray-300 mt-2">
                                Upload Profile Image
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>

                        {/* IMAGE PREVIEW */}
                        {preview && (
                            <div className="flex justify-center">
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="h-20 w-20 rounded-full object-cover border border-[#FF6A1C]"
                                />
                            </div>
                        )}

                        {/* ERROR */}
                        {error && (
                            <p className="text-red-400 text-sm">{error}</p>
                        )}

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF6A1C] text-black font-semibold py-3 rounded-md hover:scale-105 transition"
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>
                    </form>

                    {/* GOOGLE LOGIN */}
                    <button
                        onClick={googleSignIn}
                        className="w-full mt-4 flex items-center justify-center gap-2 border border-white/10 py-2 rounded-md hover:border-[#FF6A1C] transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            className="w-5 h-5"
                            alt="google"
                        />
                        Continue with Google
                    </button>

                    <p className="text-center text-gray-400 text-sm mt-5">
                        Already have account?{" "}
                        <Link href={`/login?callbackUrl=${callbackUrl}`} className="text-[#FF6A1C]">
                            Login
                        </Link>
                    </p>

                </motion.div>
            </div>
        </div>
    );
}