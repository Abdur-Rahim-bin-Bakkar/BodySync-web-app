"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-white text-black dark:bg-zinc-950 dark:text-white px-4 py-12 md:py-0 transition-colors duration-300">

      {/* BACKGROUND BLUR EFFECT (Glow for Dark Mode) */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6A1C] opacity-[0.08] dark:opacity-[0.12] rounded-full blur-[120px] pointer-events-none z-0 hidden sm:block" />

      {/* CONTAINER FOR TWO COLUMNS */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-16">

        {/* LEFT COLUMN: CONTENT */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">

          {/* TITLE WITH TEXT SHADOW */}
          {mounted && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-sm"
            >
              Transform Your Body,
              <span className="block text-[#FF6A1C] drop-shadow-[0_4px_12px_rgba(255,106,28,0.15)]">
                {" "}Transform Your Life
              </span>
            </motion.h1>
          )}

          {/* DESCRIPTION */}
          {mounted && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed transition-colors duration-300"
            >
              Join BodySync — the ultimate fitness & gym management platform
              where trainers, members, and admins connect to achieve real results.
              Book classes, track progress, and stay motivated every day.
            </motion.p>
          )}

          {/* BUTTONS CONTAINER */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              {/* PRIMARY BUTTON */}
              <Link
                href="/classes"
                className="
                  inline-flex items-center justify-center
                  bg-[#FF6A1C]
                  text-white dark:text-black
                  font-bold
                  px-8 py-4
                  rounded-full
                  hover:scale-105 hover:bg-[#e05a18]
                  transition-all duration-300 ease-out
                  shadow-[0_10px_25px_-5px_rgba(255,106,28,0.4)]
                  dark:shadow-[0_10px_25px_-5px_rgba(255,106,28,0.2)]
                  text-lg
                "
              >
                Explore Classes
              </Link>

              {/* SECONDARY BUTTON */}
              <Link
                href="/forum"
                className="
                  inline-flex items-center justify-center
                  bg-gray-100 dark:bg-white/5
                  text-black dark:text-white
                  font-semibold
                  px-8 py-4
                  rounded-full
                  hover:bg-gray-200 dark:hover:bg-white/10
                  transition-all duration-300 ease-out
                  border border-gray-200 dark:border-white/10
                  text-lg
                "
              >
                Posts
              </Link>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: IMAGE WITH ADVANCED EFFECTS */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative p-6">
          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[480px] aspect-[4/5] z-10"
            >
              {/* Soft blur card-like effect behind the main image */}
              <div className="absolute inset-4 bg-gray-100/50 dark:bg-zinc-900/30 rounded-3xl blur-xl z-[-1]" />

              <Image
                src="/images/banner.png"
                alt="BodySync Fitness"
                fill
                priority
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
                sizes="(max-w-768px) 100vw, 50vw"
              />

              {/* DECORATIVE CORNER FRAMES */}
              <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-[3px] border-l-[3px] border-[#FF6A1C] rounded-bl-2xl opacity-70 pointer-events-none hidden sm:block" />
              <div className="absolute -top-2 -right-2 w-16 h-16 border-t-[3px] border-r-[3px] border-[#FF6A1C] rounded-tr-2xl opacity-70 pointer-events-none hidden sm:block" />
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}