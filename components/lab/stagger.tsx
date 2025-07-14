"use client";

import {
  AnimatePresence,
  MotionConfig,
  type MotionProps,
  motion,
  useInView,
} from "framer-motion";

import React, {
  Children,
  forwardRef,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface StaggerVariants {
  container?: MotionProps["variants"];
  child?: MotionProps["variants"];
}

interface StaggerProps extends Omit<MotionProps, "variants"> {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  staggerVariants?: StaggerVariants;
  trigger?: boolean;
  inView?: boolean;
  once?: boolean;
  margin?: string;
}

const defaultContainerVariants = (delay = 0.1) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: delay,
    },
  },
  exit: {
    transition: {
      staggerChildren: delay,
      staggerDirection: -1,
    },
  },
});

const defaultChildVariants = (duration = 0.6) => ({
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ease: "easeInOut", duration },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { ease: "easeInOut", duration },
  },
});

const defaultSingleVariants = (duration = 0.6) => ({
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { ease: "easeInOut", duration },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: { ease: "easeInOut", duration },
  },
});

const Stagger = forwardRef<HTMLElement, StaggerProps>(
  (
    {
      children,
      className = "flex h-auto w-full grow flex-col",
      staggerDelay = 0.1,
      duration = 0.6,
      transition,
      staggerVariants,
      trigger,
      inView = false,
      once = true,
      margin = "0px",
      ...props
    },
    _ref,
  ) => {
    const localRef = useRef(null);
    const isInView = useInView(localRef, {
      once,
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      margin: margin as any,
    });

    const [internalKey, setInternalKey] = useState(0);

    useEffect(() => {
      if (trigger !== undefined) {
        setInternalKey((prev) => prev + 1);
      }
    }, [trigger]);

    const childrenArray = Children.toArray(children);
    const hasMultiple = childrenArray.length > 1;

    const containerVariants =
      staggerVariants?.container ?? defaultContainerVariants(staggerDelay);
    const childVariants =
      staggerVariants?.child ?? defaultChildVariants(duration);
    const singleVariants = defaultSingleVariants(duration);

    const shouldUseAnimatePresence = trigger !== undefined;
    const animationState = inView
      ? isInView
        ? "animate"
        : "initial"
      : "animate";

    return (
      <MotionConfig transition={transition}>
        {shouldUseAnimatePresence ? (
          <AnimatePresence mode="wait">
            {(!inView || isInView) &&
              (hasMultiple ? (
                <motion.section
                  key={internalKey}
                  ref={localRef}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={cn(className)}
                  {...props}
                >
                  {childrenArray.map((child, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={childVariants}
                    >
                      {child}
                    </motion.div>
                  ))}
                </motion.section>
              ) : (
                <motion.section
                  key={internalKey}
                  ref={localRef}
                  variants={singleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={cn(className)}
                  {...props}
                >
                  {children}
                </motion.section>
              ))}
          </AnimatePresence>
        ) : hasMultiple ? (
          <motion.section
            ref={localRef}
            variants={containerVariants}
            initial="initial"
            animate={animationState}
            className={cn(className)}
            {...props}
          >
            {childrenArray.map((child, index) => (
              <motion.div key={index} custom={index} variants={childVariants}>
                {child}
              </motion.div>
            ))}
          </motion.section>
        ) : (
          <motion.section
            ref={localRef}
            variants={singleVariants}
            initial="initial"
            animate={animationState}
            className={cn(className)}
            {...props}
          >
            {children}
          </motion.section>
        )}
      </MotionConfig>
    );
  },
);

Stagger.displayName = "Stagger";

export default memo(Stagger);
