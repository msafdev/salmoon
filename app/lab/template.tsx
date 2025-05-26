"use client";

import { motion } from "framer-motion";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        filter: "blur(4px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ ease: "easeInOut", duration: 0.6 }}
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      {children}
    </motion.section>
  );
};

export default Template;
