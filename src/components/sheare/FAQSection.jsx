"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is BodySync?",
    answer:
      "BodySync is a modern fitness & gym management platform where users can book classes, trainers can manage sessions, and admins control the entire system.",
  },
  {
    question: "How do I book a class?",
    answer:
      "Simply go to All Classes, select a class, and click the Book Now button. After payment, your booking will be confirmed.",
  },
  {
    question: "Can I become a trainer?",
    answer:
      "Yes! You can apply as a trainer from your dashboard. Admin will review and approve your application.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes, we use Stripe integration for secure and reliable payment processing.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!mounted) return null;

  return (
    <section className="py-16 px-4 bg-white text-gray-900 dark:bg-[#0B0F14] dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Frequently Asked{" "}
          <span className="text-[#FF6A1C]">Questions</span>
        </motion.h2>

        {/* ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="
                border rounded-lg overflow-hidden
                border-gray-200 dark:border-white/10
                bg-white dark:bg-white/5
                transition-colors duration-300
              "
            >
              {/* QUESTION */}
              <button
                onClick={() => toggle(index)}
                className="
                  w-full flex justify-between items-center p-4 text-left
                  hover:bg-gray-100 dark:hover:bg-white/10 transition cursor-pointer
                "
              >
                <span className="font-medium">{faq.question}</span>

                <span className="text-[#FF6A1C] text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-600 dark:text-gray-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}