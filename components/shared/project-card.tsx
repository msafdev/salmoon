"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

import { motion } from "framer-motion";

import { Sparkle } from "lucide-react";

import Macintosh from "@/public/project/macintosh.webp";
import Marquee from "./marquee";

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
      className="flex w-full aspect-[16/10] relative group border rounded-xl overflow-hidden shadow bg-gradient-to-br from-background to-sky-100"
    >
      <div className="z-10 flex flex-col justify-between anim-slow w-full p-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute aspect-[16/10]">
        <p className="text-sm text-accent-foreground font-semibold font-mono px-2 py-1 bg-accent backdrop-blur-sm border w-fit rounded-md">
          {title}
        </p>

        {/* Stack */}
        <div className="flex pointer-events-none gap-x-2 items-center py-1 bg-accent backdrop-blur-sm border rounded-md justify-around overflow-hidden relative">
          <Marquee className="[--duration:10s]">
            {stack.map((item, index) => (
              <React.Fragment key={index}>
                <p className="text-xs text-accent-foreground font-mono">
                  {item}
                </p>
                <Sparkle className="text-foreground" size={10} />
              </React.Fragment>
            ))}
          </Marquee>

          {/* Blur */}
          <div className="w-4 h-full absolute left-0 top-0 bg-gradient-to-r from-muted to-transparent" />
          <div className="w-4 h-full absolute right-0 top-0 bg-gradient-to-r to-muted from-transparent" />
        </div>
      </div>

      <Image
        src={Macintosh}
        alt="Macintosh"
        fill
        className="object-contain anim p-8 group-hover:p-4 shadow bg-transparent"
        placeholder="blur"
      />
    </motion.div>
  );
};

export default ProjectCard;
