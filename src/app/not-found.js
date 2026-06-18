"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0F14] px-4">
      
      <div className="text-center max-w-md">

        {/* BIG 404 */}
        <h1 className="text-7xl font-extrabold text-[#FF6A1C] animate-pulse">
          404
        </h1>

        {/* TITLE */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* BUTTON */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-md bg-[#FF6A1C] text-black font-semibold hover:opacity-90 transition"
          >
            Go Back Home
          </Link>
        </div>

        {/* SMALL ANIMATION DOTS */}
        <div className="mt-8 flex justify-center gap-2">
          <span className="w-2 h-2 bg-[#FF6A1C] rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-[#FF6A1C] rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-[#FF6A1C] rounded-full animate-bounce delay-300"></span>
        </div>

      </div>
    </div>
  );
}