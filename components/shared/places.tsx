"use client";

import { Transition, motion } from "motion/react";

import { useMemo } from "react";

import { PolaroidCard } from "@/components/shared/cards/polaroid-card";
import { cn } from "@/lib/utils";

import { placeItems } from "@/lib/assets";

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

const Places = () => {
  return (
    <div className="relative w-full max-w-full">
      <div className="mx-auto flex w-fit flex-row items-center gap-2 -space-x-4 px-4 sm:gap-4 sm:-space-x-8">
        {placeItems.map((item, index) => (
          <PlaceCard
            key={item.id}
            item={item}
            priority={index < 3}
            className={index >= 3 ? "hidden sm:block" : ""}
          />
        ))}
      </div>
    </div>
  );
};

const PlaceCard = ({
  item,
  priority,
  className,
}: {
  item: (typeof placeItems)[number];
  priority?: boolean;
  className?: string;
}) => (
  <motion.div
    initial={{ rotate: item.rotation }}
    whileHover={{ rotate: 0, scale: 1.05 }}
    transition={transition as Transition}
    className={cn(
      "box-shadow shrink-0 overflow-hidden rounded-[1px]",
      className,
    )}
  >
    <PolaroidCard
      src={item.src}
      alt={`Image of place ${item.id}`}
      title={item.title}
      priority={priority}
      className="xs:w-[24vw] relative w-[28vw] sm:w-32"
    />
  </motion.div>
);

export default Places;
