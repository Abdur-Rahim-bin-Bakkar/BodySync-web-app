"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ClassCard = ({ cls }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 120,
        damping: 12,
      }}
      whileHover={{
        scale: 1.07,
        rotate: 0.5,
        boxShadow: "0px 10px 30px rgba(255, 106, 28, 0.25)",
      }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md transition-all"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <motion.img
          src={cls.image}
          alt={cls.className}
          className="h-44 w-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="font-bold text-gray-800 dark:text-white"
        >
          {cls.className}
        </motion.h3>

        {/* Category */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm text-gray-500"
        >
          📌 {cls.category}
        </motion.p>

        {/* Price + Duration */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 dark:text-gray-300"
        >
          💰 ${cls.price} | ⏱ {cls.duration}
        </motion.p>

        {/* Booking */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="text-sm text-orange-500 font-semibold"
        >
          🔥 {cls.bookingCount} Bookings
        </motion.p>

        {/* BUTTON */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={`/classes/${cls._id}`}>
            <button className="w-full mt-3 relative overflow-hidden bg-orange-500 text-white py-2 rounded-lg font-medium transition-all">

              {/* glow effect */}
              <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition"></span>

              View Details
            </button>
          </Link>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ClassCard;