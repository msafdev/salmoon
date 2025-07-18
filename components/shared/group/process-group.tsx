"use client";

import { motion, useInView } from "framer-motion";

import { useRef } from "react";

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
      className={`relative grid grid-cols-6 gap-4 ${index !== total - 1 ? "mb-4" : ""} `}
      key={id}
    >
      {/* Step Dot */}
      <div className="relative hidden sm:block">
        <div className="z-10 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="text-xs font-semibold">{index + 1}</span>
        </div>
      </div>

      {/* Content */}
      <div className="col-span-full flex flex-col gap-y-2 sm:col-span-5">
        <div className="flex">
          <div className="mr-2 inline min-w-6 shrink-0 text-sm font-medium text-muted-foreground sm:hidden">
            0{index + 1}.
          </div>
          <h3 className="text-sm font-semibold text-foreground">{name}</h3>
        </div>
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

  return (
    <div ref={containerRef} className="relative flex w-full max-w-lg flex-col">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isInView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="absolute left-[15.5px] top-[32px] hidden origin-top scale-y-0 transform border-r-2 border-dashed border-primary sm:block"
        style={{ height: `calc(70%)` }}
      />

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
