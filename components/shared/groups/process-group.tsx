"use client";

import { easeOut, motion, useInView } from "motion/react";

import { useRef } from "react";

import { useDesktop } from "@/hooks/use-desktop";
import { processItems } from "@/lib/constants";

type ProcessProps = {
  name: string;
  description: string;
  index: number;
};

function ProcessStep({ name, description, index }: ProcessProps) {
  return (
    <div className="xs:gap-x-4 relative grid grid-cols-6 gap-x-6 sm:grid-cols-8 [&:not(:last-child)]:mb-4">
      {/* Step Number & Mobile Title */}
      <div className="not-xs:flex items-center gap-x-4">
        <div className="bg-accent text-accent-foreground z-10 flex size-6 shrink-0 items-center justify-center rounded border">
          <span className="text-xs font-semibold">{index + 1}</span>
        </div>
        <h3 className="text-foreground xs:hidden text-sm font-semibold">
          {name}
        </h3>
      </div>

      {/* Desktop Content */}
      <div className="xs:gap-y-2 not-xs:flex-row not-xs:items-center col-span-5 flex flex-col gap-y-1 sm:col-span-7">
        <h3 className="text-foreground xs:block hidden text-sm font-semibold">
          {name}
        </h3>
        <p className="text-muted-foreground not-xs:hidden text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* Mobile Description */}
      <p className="text-muted-foreground xs:hidden col-span-full mt-3 text-sm">
        {description}
      </p>
    </div>
  );
}

export default function ProcessGroup() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-10% 0px",
  });
  const { isDesktop, isMounted } = useDesktop(440);

  return (
    <div ref={containerRef} className="relative flex w-full max-w-lg flex-col">
      {/* Connecting Line - Desktop Only */}
      {isMounted && isDesktop && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{
            scaleY: isInView ? 1 : 0,
            borderColor: isInView
              ? "var(--color-accent)"
              : "var(--color-primary)",
          }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.2 }}
          className="absolute top-[24px] left-[11px] h-[73%] origin-top border-r-2 border-dashed"
        />
      )}

      {/* Process Steps */}
      {processItems.map((item, index) => (
        <ProcessStep key={index} {...item} index={index} />
      ))}
    </div>
  );
}
