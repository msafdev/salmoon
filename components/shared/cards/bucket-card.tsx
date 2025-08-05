"use client";

import { Variants, easeOut, motion } from "motion/react";

import { PiCheckSquareDuotone, PiSquareDuotone } from "react-icons/pi";

import { cn } from "@/lib/utils";

type BucketCardProps = {
  index: number;
  title: string;
  description?: string;
  done: boolean;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: easeOut,
    },
  }),
};

const BucketCard = ({ index, title, description, done }: BucketCardProps) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className={`group bg-background flex w-full items-start gap-x-3 rounded-md px-2 py-2 text-sm ${
        done ? "opacity-50" : ""
      }`}
    >
      {done ? (
        <PiCheckSquareDuotone className="text-foreground mt-0.5 size-4 shrink-0" />
      ) : (
        <PiSquareDuotone className="text-muted-foreground mt-0.5 size-4 shrink-0" />
      )}

      <div className="space-y-0.5">
        <div className="relative w-fit shrink-0">
          <h3
            className={cn(
              "font-semibold",
              done ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {title}
          </h3>
        </div>
        {description && (
          <p className="text-muted-foreground line-clamp-1 text-sm">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default BucketCard;
