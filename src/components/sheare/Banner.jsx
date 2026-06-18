"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/gym.png')" }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl text-center px-4">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
        >
          Transform Your Body,
          <span className="text-[#FF6A1C]"> Transform Your Life</span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-gray-300 text-base md:text-lg"
        >
          Join BodySync — the ultimate fitness & gym management platform
          where trainers, members, and admins connect to achieve real results.
          Book classes, track progress, and stay motivated every day.
        </motion.p>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8"
        >
          <Link
            href="/classes"
            className="inline-block bg-[#FF6A1C] text-black font-semibold px-6 py-3 rounded-md hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Explore Classes
          </Link>
        </motion.div>

      </div>
    </section>
  );
}