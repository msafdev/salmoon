"use client";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.section>
  );
}
