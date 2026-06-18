"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleSignIn = async () => {
    console.log('click hocche login')
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data, 'data')
  };

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!form.email || !form.password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      const { data, error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setError(error.message || "Login failed");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex bg-[#0B0F14] text-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-bold">
            Welcome Back to{" "}
            <span className="text-[#FF6A1C]">BodySync</span>
          </h1>

          <p className="text-gray-400 mt-4">
            Login to access dashboard, classes, trainers and fitness progress.
          </p>
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
            Login
          </h2>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">

            {/* EMAIL */}
            <input
              key="login-email"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 outline-none focus:border-[#FF6A1C]"
            />

            {/* PASSWORD */}
            <input
              key="login-password"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 outline-none focus:border-[#FF6A1C]"
            />

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
              {loading ? "Logging in..." : "Login"}
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

          {/* REGISTER LINK */}
          <p className="text-center text-gray-400 text-sm mt-5">
            Don’t have an account?{" "}
            <Link href="/register" className="text-[#FF6A1C]">
              Register
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}