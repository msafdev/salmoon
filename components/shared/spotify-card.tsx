"use client";

import { motion } from "framer-motion";

import Image from "next/image";

const SpotifyCard = () => {
  const circles = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div className="flex flex-col gap-y-1.5">
      <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-muted">
        <Image
          fill
          src="/pin.webp"
          alt="Album cover"
          className="h-full w-full object-cover brightness-75"
        />
        <div className="absolute z-10 flex h-full w-full items-end justify-center gap-x-[2px] p-2 bg-blend-difference">
          {circles.map((index) => (
            <motion.div
              key={index}
              animate={{
                height: [4, 12, 4],
                backgroundColor: ["#ff708d", "#ff073a", "#ff708d"],
              }}
              transition={{
                duration: 0.7,
                delay: (0.7 / 3) * index,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="w-1 shrink-0 rounded-full"
            />
          ))}
        </div>
      </div>
      <p className="text-xs font-medium text-muted-foreground">
        listening to them good stuffs
      </p>
    </div>
  );
};

export default SpotifyCard;
