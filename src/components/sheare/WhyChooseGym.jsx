"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell,
  HeartPulse,
  Clock3,
  Users,
  TrendingUp,
} from "lucide-react";

export default function WhyChooseGym() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    const bmiValue =
      Number(weight) /
      ((Number(height) / 100) * (Number(height) / 100));

    const bmi = bmiValue.toFixed(1);

    let status = "";
    let color = "";
    let bg = "";

    if (bmiValue < 18.5) {
      status = "Underweight";
      color = "text-blue-400";
      bg = "bg-blue-500/10";
    } else if (bmiValue < 25) {
      status = "Healthy";
      color = "text-green-400";
      bg = "bg-green-500/10";
    } else if (bmiValue < 30) {
      status = "Overweight";
      color = "text-yellow-400";
      bg = "bg-yellow-500/10";
    } else {
      status = "Obese";
      color = "text-red-400";
      bg = "bg-red-500/10";
    }

    const feedbackMap = {
      Underweight:
        "You are underweight. Increase calorie intake and focus on strength training.",
      Healthy:
        "Perfect! Your BMI is in a healthy range. Keep maintaining your routine.",
      Overweight:
        "You are slightly overweight. Add cardio and improve your diet.",
      Obese:
        "Your BMI is high. A structured workout and diet plan is recommended.",
    };

    setResult({
      bmi,
      status,
      color,
      bg,
      feedback: feedbackMap[status],
    });
  };

  return (
    <section className="py-24 px-4 bg-white dark:bg-[#0B0F14] text-gray-900 dark:text-white">
      <div className="max-w-11/12 mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose Our{" "}
            <span className="text-[#FF6A1C]">Gym</span>?
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            We build not just bodies, but discipline, strength, and confidence.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {[
            { icon: Dumbbell, title: "Expert Trainers", desc: "Certified professionals guide you." },
            { icon: HeartPulse, title: "Healthy Life", desc: "Fitness + nutrition balance." },
            { icon: Clock3, title: "Flexible Time", desc: "Workout anytime you want." },
            { icon: Users, title: "Community", desc: "Stay motivated together." },
            { icon: TrendingUp, title: "Progress", desc: "Track your improvement." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 text-center"
            >
              <item.icon className="mx-auto mb-4 text-[#FF6A1C]" size={38} />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalculator(!showCalculator)}
            className="px-8 py-4 rounded-full bg-[#FF6A1C] hover:bg-orange-600 text-white font-semibold shadow-lg"
          >
            Let’s Check Your Health
          </motion.button>
        </div>

        {/* BMI Calculator */}
        <AnimatePresence>
          {showCalculator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-14 max-w-2xl mx-auto"
            >
              <div className="p-8 rounded-3xl bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow-xl">

                <h3 className="text-3xl font-bold text-center mb-2">
                  BMI Calculator
                </h3>

                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                  Enter height (cm) and weight (kg)
                </p>

                {/* Inputs */}
                <div className="space-y-5">
                  <input
                    type="number"
                    placeholder="Height in cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-[#0B0F14] border border-gray-300 dark:border-gray-700"
                  />

                  <input
                    type="number"
                    placeholder="Weight in kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-[#0B0F14] border border-gray-300 dark:border-gray-700"
                  />

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={calculateBMI}
                    className="w-full py-3 rounded-xl bg-[#FF6A1C] text-white font-semibold"
                  >
                    Calculate BMI
                  </motion.button>
                </div>

                {/* RESULT */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`mt-8 p-6 rounded-2xl border ${result.bg}`}
                    >
                      <h4 className="text-xl font-bold mb-3">
                        Your Result
                      </h4>

                      <p className="text-lg">
                        BMI:{" "}
                        <span className={`font-bold ${result.color}`}>
                          {result.bmi}
                        </span>
                      </p>

                      <p className="text-lg mb-2">
                        Status:{" "}
                        <span className={`font-bold ${result.color}`}>
                          {result.status}
                        </span>
                      </p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-sm ${result.color}`}
                      >
                        {result.feedback}
                      </motion.p>

                      {/* 🔥 NEW LINK ADDED */}
                      <motion.a
                        href="/classes"
                        whileHover={{ x: 5 }}
                        className="inline-block mt-4 text-sm font-medium text-[#FF6A1C] underline underline-offset-4 hover:text-orange-500 transition"
                      >
                        See our classes →
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}