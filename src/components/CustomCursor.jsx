"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handlePointerEnter = () => {
      setIsPointer(true);
    };

    const handlePointerLeave = () => {
      setIsPointer(false);
    };

    window.addEventListener("mousemove", mouseMove);

    const clickableElements = document.querySelectorAll(
      "a, button, input, textarea, select"
    );

    clickableElements.forEach((element) => {
      element.addEventListener("mouseenter", handlePointerEnter);
      element.addEventListener("mouseleave", handlePointerLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);

      clickableElements.forEach((element) => {
        element.removeEventListener("mouseenter", handlePointerEnter);
        element.removeEventListener("mouseleave", handlePointerLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Glow */}
      <motion.div
        animate={{
          x: position.x - (isPointer ? 30 : 20),
          y: position.y - (isPointer ? 30 : 20),
          width: isPointer ? 60 : 40,
          height: isPointer ? 60 : 40,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
        className="fixed top-0 left-0 rounded-full bg-orange-500/20 blur-md pointer-events-none z-[9998]"
      />

      {/* Ring */}
      <motion.div
        animate={{
          x: position.x - (isPointer ? 18 : 12),
          y: position.y - (isPointer ? 18 : 12),
          width: isPointer ? 36 : 24,
          height: isPointer ? 36 : 24,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="fixed top-0 left-0 rounded-full border border-orange-400 pointer-events-none z-[9999]"
      />

      {/* Center Dot */}
      <motion.div
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 35,
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-orange-500 pointer-events-none z-[10000]"
      />
    </>
  );
}