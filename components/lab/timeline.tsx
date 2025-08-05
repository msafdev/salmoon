"use client";

import { HTMLMotionProps, motion } from "motion/react";

import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type TimelineContextValue = {
  activeStep: number;
  setActiveStep: (val: number) => void;
  isInView: boolean;
  orientation: "horizontal" | "vertical";
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

const useTimeline = () => {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("useTimeline must be used within a Timeline");
  return ctx;
};

interface TimelineProps extends HTMLMotionProps<"div"> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (val: number) => void;
  orientation?: "horizontal" | "vertical";
}

const Timeline = ({
  defaultValue = 1,
  value,
  onValueChange,
  orientation = "vertical",
  className,
  ...rest
}: TimelineProps) => {
  const [internal, setInternal] = useState(defaultValue);
  const [isInView, setIsInView] = useState(false);

  const update = useCallback(
    (val: number) => {
      if (value == null) setInternal(val);
      onValueChange?.(val);
    },
    [value, onValueChange],
  );

  const current = value ?? internal;

  return (
    <TimelineContext.Provider
      value={{
        activeStep: current,
        setActiveStep: update,
        isInView,
        orientation,
      }}
    >
      <motion.div
        data-slot="timeline"
        data-orientation={orientation}
        className={cn(
          "group/timeline flex",
          "data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row",
          "data-[orientation=vertical]:flex-col",
          className,
        )}
        onViewportEnter={() => setIsInView(true)}
        viewport={{ once: true, margin: "-100px" }}
        {...rest}
      />
    </TimelineContext.Provider>
  );
};

const TimelineContent = ({ className, ...rest }: HTMLMotionProps<"div">) => {
  const { isInView } = useTimeline();
  return (
    <motion.div
      data-slot="timeline-content"
      className={cn("text-muted-foreground text-sm", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...rest}
    />
  );
};

interface TimelineDateProps extends React.HTMLAttributes<HTMLTimeElement> {
  asChild?: boolean;
}

const TimelineDate = ({
  asChild = false,
  className,
  ...rest
}: TimelineDateProps) => {
  const Component = asChild ? Slot : "time";
  const { isInView } = useTimeline();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
    >
      <Component
        data-slot="timeline-date"
        className={cn(
          "text-muted-foreground mb-1 block text-xs font-medium",
          className,
        )}
        {...rest}
      />
    </motion.div>
  );
};

const TimelineHeader = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="timeline-header" className={cn(className)} {...rest} />
);

interface TimelineIndicatorProps extends HTMLMotionProps<"div"> {}

const TimelineIndicator = ({
  className,
  children,
  ...rest
}: TimelineIndicatorProps) => {
  const { isInView, orientation } = useTimeline();

  return (
    <motion.div
      data-slot="timeline-indicator"
      className={cn(
        "absolute size-4 rounded-full border-2",
        "border-primary/20 group-data-completed/timeline-item:border-primary group-data-completed/timeline-item:bg-primary",
        orientation === "vertical"
          ? "top-0 -left-8 -translate-x-1/2"
          : "-top-8 left-0 -translate-y-1/2",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface TimelineItemProps extends HTMLMotionProps<"div"> {
  step: number;
}

const TimelineItem = ({
  step,
  className,
  children,
  ...rest
}: TimelineItemProps) => {
  const { activeStep, isInView, orientation } = useTimeline();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      const rect = ref.current?.getBoundingClientRect();
      setSize(
        orientation === "vertical" ? (rect?.height ?? 0) : (rect?.width ?? 0),
      );
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [orientation]);

  return (
    <motion.div
      ref={ref}
      data-slot="timeline-item"
      data-completed={step <= activeStep || null}
      className={cn(
        "group/timeline-item relative flex flex-1 flex-col gap-0.5",
        "group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8",
        "group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-6",
        className,
      )}
      style={
        {
          "--item-size": `${size}px`,
        } as React.CSSProperties
      }
      initial={{ opacity: 0, filter: "blur(2px)" }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(2px)" }
      }
      transition={{ duration: 0.6, ease: "easeOut", delay: step * 0.1 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface TimelineSeparatorProps extends HTMLMotionProps<"div"> {
  variant?: "solid" | "dashed" | "dotted";
}

const TimelineSeparator = ({
  className,
  variant = "solid",
  ...rest
}: TimelineSeparatorProps) => {
  const { isInView, orientation } = useTimeline();

  return (
    <motion.div
      data-slot="timeline-separator"
      aria-hidden="true"
      className={cn(
        "border-primary/20 group-data-completed/timeline-item:border-primary absolute self-start group-last/timeline-item:hidden",
        orientation === "vertical"
          ? "top-5 -left-8 -translate-x-1/2 border-l-2"
          : "-top-8 left-5 -translate-y-1/2 border-t-2",
        {
          "border-solid": variant === "solid",
          "border-dashed": variant === "dashed",
          "border-dotted": variant === "dotted",
        },
        className,
      )}
      style={
        orientation === "vertical"
          ? { height: "calc(var(--item-size) - 24px)" }
          : { width: "calc(var(--item-size) - 24px)" }
      }
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      {...rest}
    />
  );
};

const TimelineTitle = ({ className, ...rest }: HTMLMotionProps<"div">) => {
  const { isInView } = useTimeline();

  return (
    <motion.h3
      data-slot="timeline-title"
      className={cn("text-sm font-medium", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      {...rest}
    />
  );
};

export {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
};
