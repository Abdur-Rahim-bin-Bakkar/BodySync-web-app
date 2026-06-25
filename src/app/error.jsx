'use client'
import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4">
      <div className="max-w-2xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <AlertTriangle className="w-12 h-12 text-orange-500" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-7xl md:text-9xl font-black text-orange-500">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
          The page you're looking for doesn't exist, may have been moved,
          or the URL might be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange-500/10 blur-[120px] rounded-full -z-10" />
      </div>
    </section>
  );
}