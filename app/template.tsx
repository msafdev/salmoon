"use client";

import React, { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

const Template = ({ children }: { children: ReactNode }) => {
  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9 },
      enter: { opacity: 1, scale: 1 },
    }),
    []
  );

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-auto grow w-full"
    >
      {children}
    </motion.section>
  );
};

export default React.memo(Template);
