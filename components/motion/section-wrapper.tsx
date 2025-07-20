"use client";

import { easeInOut, motion } from "motion/react";

import { Children, type ReactNode } from "react";

interface StaggerWrapperProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  id?: string;
}

const SectionWrapper = ({
  id,
  children,
  className = "flex h-auto w-full grow flex-col",
  staggerDelay = 0.2,
  duration = 0.4,
}: StaggerWrapperProps) => {
  const childrenArray = Children.toArray(children);
  const isMultipleChildren = childrenArray.length > 0;

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerDelay,
        staggerDirection: -1,
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
      filter: "blur(4px)",
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        ease: easeInOut,
        duration: duration,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        ease: easeInOut,
        duration: duration * 0.3,
      },
    },
  };

  const singleChildVariants = {
    initial: {
      opacity: 0,
      filter: "blur(4px)",
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        ease: easeInOut,
        duration: duration,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(4px)",
      transition: {
        ease: easeInOut,
        duration: duration * 0.3,
      },
    },
  };

  if (!isMultipleChildren) {
    return (
      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        variants={singleChildVariants}
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
          variants={childVariants}
          className="flex w-full max-w-lg flex-col items-center"
        >
          {child}
        </motion.div>
      ))}
    </motion.section>
  );
};

export default SectionWrapper;
