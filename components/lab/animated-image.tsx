"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const items = [
  {
    name: "Place 1",
    imageUrl:
      "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Place 2",
    imageUrl:
      "https://images.unsplash.com/photo-1476158085676-e67f57ed9ed7?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Place 3",
    imageUrl:
      "https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const AnimatedImage = () => {
  return (
    <div className="flex items-center -space-x-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="-rotate-[19deg] first:rotate-[6deg] last:rotate-[8deg]"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1.2,
              repeatType: "reverse",
            }}
            className="relative h-12 w-12 overflow-hidden rounded-md border-2 bg-accent"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              quality={40}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedImage;