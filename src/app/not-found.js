"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0F14] relative overflow-hidden px-4">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#FF6A1C] opacity-20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* Floating Gym Logo Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute opacity-10 text-[#FF6A1C]"
      >
        <Dumbbell size={260} />
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-md p-10 rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl"
      >

        {/* Small Icon */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-4 text-red-500"
        >
          <AlertTriangle size={34} />
        </motion.div>

        {/* 404 */}
        <motion.h1
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-8xl font-extrabold text-[#FF6A1C] drop-shadow-lg"
        >
          404
        </motion.h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
          Lost Your Rep?
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          This page didn’t complete the workout 😄
        </p>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          The page you are looking for doesn’t exist or has been moved from the gym floor.
        </p>

        {/* Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FF6A1C] text-black font-semibold shadow-lg hover:shadow-orange-500/30 transition"
          >
            <Home size={18} />
            Back to Gym
          </Link>
        </motion.div>

        {/* Loading Dots (kept same style but smoother) */}
        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2.5 h-2.5 bg-[#FF6A1C] rounded-full"
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

      </motion.div>
    </div>
  );
}