"use client";

import { motion, useInView } from "motion/react";

import { useRef } from "react";

import { useDesktop } from "@/hooks/use-desktop";
import { processItems } from "@/lib/constants";

type ProcessProps = {
  id: number;
  name: string;
  description: string;
  index: number;
  total: number;
};

function ProcessStep({ id, name, description, index, total }: ProcessProps) {
  return (
    <div
      className={`relative col-span-7 grid gap-3 sm:grid-cols-8 sm:gap-4 ${index !== total - 1 ? "mb-4" : ""}`}
      key={id}
    >
      {/* Step Dot */}
      <div className="relative">
        <div className="z-10 flex size-6 items-center justify-center rounded border bg-accent text-accent-foreground">
          <span className="text-xs font-semibold">{index + 1}</span>
        </div>
      </div>

      {/* Content */}
      <div className="col-span-full flex flex-col gap-y-1 sm:col-span-7 sm:gap-y-2">
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ProcessGroup() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-10% 0px",
  });

  const { isDesktop, isMounted } = useDesktop(640);

  return (
    <div ref={containerRef} className="relative flex w-full max-w-lg flex-col">
      {isMounted && isDesktop && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="absolute left-[11px] top-[24px] hidden origin-top scale-y-0 transform border-r-2 border-dashed border-accent sm:block"
          style={{ height: `calc(73%)` }}
        />
      )}

      {processItems.map((item, index) => (
        <ProcessStep
          key={item.id}
          {...item}
          index={index}
          total={processItems.length}
        />
      ))}
    </div>
  );
}
