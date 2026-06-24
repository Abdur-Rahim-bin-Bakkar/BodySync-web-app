"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ClassCard = ({ cls }) => {
  console.log(cls.image, ' image url')
  return (
    <div


      className="group bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md transition-all"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
       

        {
          cls.image &&
          <Image src={cls.image}
            alt={cls.className}
            width={400}
            height={350}
            className="h-44 w-full object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
        }

        {/* </Image> */}
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
            <Button className="w-full mt-3 relative overflow-hidden bg-orange-500 text-white py-2 rounded-lg font-medium transition-all cursor-pointer">

              {/* glow effect */}
              <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition"></span>

              View Details
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default ClassCard;