"use client";

import { useRef } from "react";

import dynamic from "next/dynamic";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const ShinyText = dynamic(() => import("@/components/shared/shiny-text"));

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const HomeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const copyText = (entryText: string) => {
    navigator.clipboard.writeText(entryText);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-2xl w-full flex flex-col gap-y-4"
    >
      <div className="group mx-auto w-fit rounded-full border border-slate-200 bg-slate-100 text-sm font-mono text-white transition-all ease-in hover:bg-slate-200">
        <ShinyText className="inline-flex items-center justify-center px-3 py-1 transition ease-out hover:text-slate-600 hover:duration-300">
          <span>✨ Open for projects</span>
        </ShinyText>
      </div>

      <h1
        className={`${plusJakartaSans.className} text-balance text-4xl md:text-5xl font-bold leading-10 md:leading-[52px]`}
      >
        creative mind for a more unique perspective
      </h1>

      <button
        onClick={() => copyText("salmanalfarisi261002@gmail.com")}
        className="flex items-center text-foreground anim gap-x-2 group relative w-fit pb-1"
      >
        <ArrowUpRight
          size={16}
          className="group-hover:text-foreground anim group-hover:rotate-45"
        />
        <span>hi@msaf.tech</span>
        <div className="bottom-0 left-0 h-0.5 group-hover:w-full anim w-0 bg-foreground absolute" />
      </button>
    </motion.div>
  );
};

export default HomeSection;
