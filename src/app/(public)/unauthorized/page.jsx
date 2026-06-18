import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0F14] px-4">

      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-full bg-red-100 dark:bg-red-500/10">
            <FaLock className="text-4xl text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Unauthorized Access
        </h1>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          You don’t have permission to access this page. Please contact the admin
          or go back to the homepage.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <button className="px-5 py-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:opacity-80 transition">
              Go Home
            </button>
          </Link>

          <Link href="/login">
            <button className="px-5 py-3 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition">
              Login Again
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}