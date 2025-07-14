"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import React, {
  Children,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface CursorContextProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isInside: boolean;
  isClicking: boolean;
}

interface CursorProps {
  children: ReactNode;
  spring?: boolean;
}

interface CursorPointerProps extends HTMLMotionProps<"div"> {
  className?: string;
  children: ReactNode;
}

interface CursorBodyProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

const CursorContext = createContext<CursorContextProps | null>(null);

const useCursor = () => {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("Cursor components must be used within a Cursor Provider");
  }
  return context;
};

const Cursor = ({ children, spring = false }: CursorProps) => {
  const [isClicking, setIsClicking] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = spring ? useSpring(rawX, { stiffness: 300, damping: 30 }) : rawX;
  const y = spring ? useSpring(rawY, { stiffness: 300, damping: 30 }) : rawY;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const insideX = e.clientX >= rect.left && e.clientX <= rect.right;
      const insideY = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (insideX && insideY) {
        setIsInside(true);
        rawX.set(e.clientX - rect.left);
        rawY.set(e.clientY - rect.top);
      } else {
        setIsInside(false);
      }
    };

    const handleClickDown = () => setIsClicking(true);
    const handleClickUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleClickDown);
    window.addEventListener("mouseup", handleClickUp);

    return () => {
      window.removeEventListener("mousedown", handleClickDown);
      window.removeEventListener("mouseup", handleClickUp);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [rawX, rawY]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      <CursorContext.Provider value={{ x, y, isInside, isClicking }}>
        <AnimatePresence>
          {isInside ? <>{children}</> : null}
        </AnimatePresence>
      </CursorContext.Provider>
    </div>
  );
};
Cursor.displayName = "Cursor";

const CursorPointer = forwardRef<HTMLDivElement, CursorPointerProps>(
  ({ className, children, ...props }, ref) => {
    const { x, y, isClicking } = useCursor();

    return (
      <motion.div
        ref={ref}
        className={cn("absolute", className)}
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: isClicking ? 0.8 : 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
CursorPointer.displayName = "CursorPointer";

const CursorBody = forwardRef<HTMLDivElement, CursorBodyProps>(
  ({ className, children, ...props }, ref) => {
    const { x, y } = useCursor();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "absolute flex flex-col whitespace-nowrap text-xs font-medium",
          Children.count(children) > 1
            ? "rounded-xl rounded-tl pb-1.5 pl-2.5 pr-3 pt-1 [&>:first-child]:opacity-70"
            : "rounded-full px-2.5 py-1.5",
          "bg-primary text-primary-foreground",
          className,
        )}
        style={{
          x,
          y,
          translateX: "10px",
          translateY: "10px",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
CursorBody.displayName = "CursorBody";

export { Cursor, CursorPointer, CursorBody };
