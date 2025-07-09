"use client";

import {
  AnimatePresence,
  SpringOptions,
  Transition,
  Variant,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  useEffect(() => {
    if (typeof window !== "undefined") {
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    }
  }, []);

  useEffect(() => {
    if (!attachToParent) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    const updatePosition = (e: MouseEvent) => {
      if (attachToParent && cursorRef.current?.parentElement) {
        const parentRect =
          cursorRef.current.parentElement.getBoundingClientRect();
        const relativeX = e.clientX - parentRect.left;
        const relativeY = e.clientY - parentRect.top;
        cursorX.set(relativeX);
        cursorY.set(relativeY);
        onPositionChange?.(relativeX, relativeY);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        onPositionChange?.(e.clientX, e.clientY);
      }
    };

    document.addEventListener("mousemove", updatePosition);
    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, [cursorX, cursorY, attachToParent, onPositionChange]);

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

  useEffect(() => {
    const handleVisibilityChange = (visible: boolean) => {
      setIsVisible(visible);
    };

    if (attachToParent && cursorRef.current) {
      const parent = cursorRef.current.parentElement;
      if (parent) {
        const onEnter = () => {
          parent.style.cursor = "none";
          handleVisibilityChange(true);
        };
        const onLeave = () => {
          parent.style.cursor = "auto";
          handleVisibilityChange(false);
        };

        parent.addEventListener("mouseenter", onEnter);
        parent.addEventListener("mouseleave", onLeave);

        return () => {
          parent.removeEventListener("mouseenter", onEnter);
          parent.removeEventListener("mouseleave", onLeave);
        };
      }
    }
  }, [attachToParent]);

  return (
    <motion.div
      ref={cursorRef}
      className={cn(
        "pointer-events-none z-50",
        attachToParent ? "absolute left-0 top-0" : "fixed left-0 top-0",
        className,
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
