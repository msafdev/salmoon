"use client";

import { useRef } from "react";

import { motion, useInView } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";

import Badge from "@/components/shared/badge";
import CopyButton from "@/components/shared/copy-button";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const HomeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-2xl w-full flex flex-col gap-y-4"
    >
      <Badge />

      <h1
        className={`${plusJakartaSans.className} text-balance text-3xl md:text-5xl font-bold leading-9 md:leading-[52px] group`}
      >
        creative mind for a more unique perspective
        <span className="group-hover:text-pink-500 anim">.</span>
      </h1>

      <CopyButton />
    </motion.div>
  );
};

export default HomeSection;
