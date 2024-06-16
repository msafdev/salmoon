"use client";

import { motion } from "framer-motion";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "linear", duration: 0.5 }}
      className="flex flex-col h-auto grow w-full"
    >
      {children}
    </motion.section>
  );
};

export default Template;
