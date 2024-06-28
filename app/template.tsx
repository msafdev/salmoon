"use client";

import { motion } from "framer-motion";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        translateY: 24,
        filter: "blur(4px)",
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        filter: "blur(0px)",
      }}
      exit={{ opacity: 0, translateY: 24 }}
      transition={{ ease: "easeInOut", duration: 0.6 }}
      className="flex flex-col h-auto grow w-full"
    >
      {children}
    </motion.section>
  );
};

export default Template;
