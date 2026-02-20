"use client";

import { type Variants, easeInOut, motion } from "motion/react";

import { Children, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  itemClassName?: string;
  disableAnimation?: boolean;
}

const DEFAULT_SECTION_CLASS = "flex h-auto w-full grow flex-col";
const DEFAULT_ITEM_CLASS = "flex w-full max-w-lg flex-col items-center";

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
    transition: {
      duration: 0.2,
    },
  },
};

const SectionWrapper = ({
  id,
  children,
  className,
  itemClassName,
  disableAnimation = false,
}: SectionWrapperProps) => {
  const childrenArray = Children.toArray(children);

  return (
    <motion.section
      id={id}
      variants={disableAnimation ? undefined : containerVariants}
      initial={disableAnimation ? undefined : "initial"}
      animate={disableAnimation ? undefined : "animate"}
      viewport={disableAnimation ? undefined : { once: true, margin: "-50px" }}
      exit={disableAnimation ? undefined : "exit"}
      className={cn(DEFAULT_SECTION_CLASS, className)}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={disableAnimation ? undefined : itemVariants}
          className={cn(DEFAULT_ITEM_CLASS, itemClassName)}
        >
          {child}
        </motion.div>
      ))}
    </motion.section>
  );
};

export default SectionWrapper;
