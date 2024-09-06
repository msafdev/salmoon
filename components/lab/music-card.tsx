"use client";

import { motion } from "framer-motion";

import Image from "next/image";

import Pin from "@/public/assets/pin.webp";

const MusicCard = () => {
  const circles = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-muted">
      <Image
        fill
        src={Pin}
        alt="Album cover"
        className="h-full w-full object-cover brightness-50"
      />
      <div className="absolute z-10 flex h-full w-full items-end justify-center gap-x-[3px] p-2 bg-blend-difference">
        {circles.map((index) => (
          <motion.div
            key={index}
            animate={{
              height: [6, 16, 6],
              backgroundColor: ["#ff708d", "#ff073a", "#ff708d"],
            }}
            transition={{
              duration: 1.2,
              delay: (1.2 / 3) * index,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="w-1.5 shrink-0 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default MusicCard;
