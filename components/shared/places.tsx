"use client";

import { Transition, motion } from "motion/react";

import { useMemo } from "react";

import { PolaroidCard } from "@/components/shared/cards/polaroid-card";

import { useDesktop } from "@/hooks/use-desktop";
import { placeItems } from "@/lib/assets";

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
};

const Places = () => {
  const { isDesktop, isMounted } = useDesktop(640);

  const itemsToRender = useMemo(() => {
    if (!isMounted) return [];
    return isDesktop ? placeItems : placeItems.slice(1, 4);
  }, [isDesktop, isMounted]);

  return (
    <div className="relative w-full max-w-full">
      <div className="mx-auto flex w-fit flex-row items-center gap-4 -space-x-8 overflow-visible px-4">
        {itemsToRender.map((item) => (
          <PlaceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const PlaceCard = ({ item }: { item: (typeof placeItems)[number] }) => (
  <motion.div
    initial={{ rotate: item.rotation }}
    whileHover={{ rotate: 0, scale: 1.05 }}
    transition={transition as Transition}
    className="box-shadow shrink-0 overflow-hidden rounded-[1px]"
  >
    <PolaroidCard
      src={item.src}
      alt={`Image of place ${item.id}`}
      title={item.title}
      className="relative w-[28vw] xs:w-[24vw] sm:w-32"
    />
  </motion.div>
);

export default Places;
