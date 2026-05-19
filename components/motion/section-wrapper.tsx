"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";

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

const SectionWrapper = ({
  id,
  children,
  className,
  itemClassName,
  disableAnimation = false,
}: SectionWrapperProps) => {
  const childrenArray = Children.toArray(children);
  const [isInView, setIsInView] = useState(disableAnimation);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (disableAnimation) return;

    // Disable animation on mobile viewports for performance
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setIsInView(true);
      return;
    }

    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "-50px",
        threshold: 0,
      },
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, [disableAnimation]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(DEFAULT_SECTION_CLASS, className)}
    >
      {childrenArray.map((child, index) => {
        const delay = 0.1 + index * 0.08;
        return (
          <div
            key={index}
            style={
              !disableAnimation
                ? {
                    transitionDelay: `${delay}s`,
                  }
                : undefined
            }
            className={cn(
              DEFAULT_ITEM_CLASS,
              itemClassName,
              !disableAnimation &&
                "md:transition-all md:duration-400 md:ease-in-out",
              !disableAnimation &&
                (isInView
                  ? "md:translate-y-0 md:opacity-100 md:blur-none"
                  : "translate-y-0 opacity-100 blur-none md:translate-y-4 md:opacity-0 md:blur-[4px]"),
            )}
          >
            {child}
          </div>
        );
      })}
    </section>
  );
};

export default SectionWrapper;
