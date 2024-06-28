"use client";

import { easeIn, easeOut, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const SwipeButton = () => {
  const duration = 0.5;

  const sliderVariants = {
    open: {
      width: "158px",
      transition: {
        duration,
        ease: [0.32, 0.72, 0, 1],
      },
    },
    closed: {
      width: "40px",
      transition: {
        duration,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };

  const textVariants = {
    open: {
      opacity: 0,
      translateX: 10,
      transition: {
        duration: 0.4,
        easeIn,
        bounce: 0,
      },
    },
    closed: {
      opacity: 1,
      translateX: 20,
      transition: {
        duration: 0.4,
        easeOut,
        bounce: 0,
      },
    },
  };

  const buttonVariants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 1,
    },
  };

  const childrenVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        easeIn,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.4,
        easeOut,
      },
    },
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="closed"
      whileHover="open"
      whileTap="open"
      className="relative h-[40px] min-w-[162px] rounded-[10px] bg-popover shadow-[0_0_0_1px_hsl(var(--border))]"
    >
      <motion.div
        variants={sliderVariants}
        className="absolute left-[2px] top-[2px] z-10 flex h-[36px] items-center justify-center -space-x-2 rounded-lg bg-primary bg-[linear-gradient(_180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0)_67.51%_)] dark:bg-[linear-gradient(_180deg,rgba(0,0,0,0.24)_0%,rgba(255,255,255,0)_67.51%_)]"
      >
        <motion.div variants={childrenVariants} className="h-5 w-5">
          <ChevronRight className="h-full w-full animate-pulse text-popover" />
        </motion.div>
        <ChevronRight className="h-5 w-5 animate-pulse text-popover delay-150" />
        <motion.div variants={childrenVariants} className="h-5 w-5">
          <ChevronRight className="h-full w-full animate-pulse text-popover delay-300" />
        </motion.div>
      </motion.div>
      <motion.div
        variants={textVariants}
        className="translate-x-5 text-xs font-medium text-popover-foreground"
      >
        Book a demo
      </motion.div>
    </motion.button>
  );
};

export default SwipeButton;
