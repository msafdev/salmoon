"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

import { motion } from "framer-motion";

import { Sparkle } from "lucide-react";

import Macintosh from "@/public/project/macintosh.webp";

const ProjectCard = ({
  title,
  stack,
  image,
}: {
  title: string;
  stack: string[];
  image: StaticImageData;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex w-full aspect-[16/10] relative group border rounded-xl overflow-hidden shadow"
    >
      <div className="z-10 flex flex-col justify-between anim-slow w-full p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute aspect-[16/10]">
        <p className="text-sm text-muted-foreground font-semibold font-mono px-2 py-1 bg-muted/50 backdrop-blur-sm border w-fit rounded-md">
          {title}
        </p>

        {/* Stack */}
        <div className="flex gap-x-2 items-center px-2 py-1 bg-muted/60 backdrop-blur-sm border rounded-md justify-around">
          {stack.map((item, index) => (
            <React.Fragment key={index}>
              <p className="text-xs text-muted-foreground font-mono">{item}</p>
              {index !== stack.length - 1 && (
                <Sparkle className="text-foreground" size={10} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Image
        src={Macintosh}
        alt="Macintosh"
        fill
        className="object-contain anim bg-gradient-to-br from-background to-sky-100 p-3 shadow"
      />
    </motion.div>
  );
};

export default ProjectCard;
