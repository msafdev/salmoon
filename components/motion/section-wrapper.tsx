"use client";

import { easeInOut, motion } from "motion/react";

import clsx from "clsx";
import { Children, type ReactNode, useMemo } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  id?: string;
}

const DISABLE_ANIMATION = process.env.NEXT_PUBLIC_DISABLE_ANIMATION === "true";

const SectionWrapper = ({
  id,
  children,
  className = "flex h-auto w-full grow flex-col",
  staggerDelay = 0.2,
  duration = 0.4,
}: SectionWrapperProps) => {
  const childrenArray = Children.toArray(children);
  const isMultipleChildren = childrenArray.length > 1;

  const sharedVariants = useMemo(
    () => ({
      initial: {
        opacity: DISABLE_ANIMATION ? 1 : 0,
        filter: DISABLE_ANIMATION ? "none" : "blur(4px)",
      },
      animate: {
        opacity: 1,
        filter: "blur(0px)",
        transition: DISABLE_ANIMATION
          ? { duration: 0 }
          : {
              ease: easeInOut,
              duration: duration,
            },
      },
      exit: {
        opacity: DISABLE_ANIMATION ? 1 : 0,
        filter: DISABLE_ANIMATION ? "none" : "blur(4px)",
        transition: DISABLE_ANIMATION
          ? { duration: 0 }
          : {
              ease: easeInOut,
              duration: duration * 0.3,
            },
      },
    }),
    [duration],
  );

  const containerVariants = useMemo(
    () => ({
      initial: {},
      animate: {
        transition: DISABLE_ANIMATION
          ? { duration: 0 }
          : { staggerChildren: staggerDelay },
      },
      exit: {
        transition: DISABLE_ANIMATION
          ? { duration: 0 }
          : {
              staggerChildren: staggerDelay,
              staggerDirection: -1,
            },
      },
    }),
    [staggerDelay],
  );

  if (!isMultipleChildren) {
    return (
      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        variants={sharedVariants}
        className={className}
        id={id}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      className={className}
      id={id}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={sharedVariants}
          className="flex w-full max-w-lg flex-col items-center"
        >
          {child}
        </motion.div>
      ))}
    </motion.section>
  );
};

export default SectionWrapper;
