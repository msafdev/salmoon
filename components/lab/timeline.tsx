"use client";

import { motion } from "framer-motion";

import { useState } from "react";

const years = Array.from({ length: 2024 - 2000 + 1 }, (_, i) => 2024 - i);

const Timeline = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleHover = (index: number) => {
    setHovered(index);
  };

  const handleLeave = () => {
    setHovered(null);
  };

  const calculateHeight = (index: number) => {
    if (hovered === null) return 0.6;
    const distance = Math.abs(index - hovered);
    return Math.max(1 - distance * 0.2, 0.6);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      {years.map((year, index) => {
        const isSelect = selected === index;

        return (
          <div
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleLeave}
            onClick={() => setSelected(index)}
            className="group/timeline relative inline-flex cursor-pointer px-0.5"
            key={index}
          >
            <motion.div
              className={`h-8 w-1 rounded-full transition-colors duration-300 ease-in-out ${
                isSelect ? "bg-primary" : "bg-primary/20"
              }`}
              initial={{ scale: 0.6 }}
              animate={{ scale: calculateHeight(index) }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            {isSelect && (
              <motion.code
                className={`absolute -top-5 left-1/2 -translate-x-1/2 text-sm text-foreground transition-all duration-200 ease-in-out group-hover/timeline:-top-6`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.2, delay: 0.3, ease: "easeInOut" }}
              >
                {year}
              </motion.code>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
