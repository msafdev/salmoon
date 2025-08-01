"use client";

import { motion } from "motion/react";

import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";

import { useState } from "react";
import useMeasure from "react-use-measure";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export default function CodeWrapper({
  children,
  defaultExpanded = false,
  className,
}: {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [ref, bounds] = useMeasure();

  return (
    <div className={cn("relative", className)}>
      <motion.div
        animate={{ height: expanded ? bounds.height : 200 }}
        initial={false}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="overflow-hidden"
      >
        <div ref={ref}>{children}</div>
      </motion.div>

      {!expanded && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent" />
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setExpanded((prev) => !prev)}
        className="absolute bottom-2 right-2 size-8"
      >
        {expanded ? (
          <PiEyeClosedDuotone size={14} />
        ) : (
          <PiEyeDuotone size={14} />
        )}
      </Button>
    </div>
  );
}
