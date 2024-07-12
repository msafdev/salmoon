"use client";

import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const badgeMotion = {
  rest: {
    width: 16,
    height: 16,
  },
  hover: {
    width: 48,
    height: 20,
    transition: {
      duration: 0.4,
    },
  },
};

const textMotion = {
  rest: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const AvatarStatus = () => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group/status relative h-fit w-fit cursor-default rounded-full border-2 border-background"
    >
      <Avatar className="size-12 overflow-hidden border">
        <AvatarImage
          src="https://github.com/msafdev.png"
          alt="User"
          className="rounded-full"
        />
        <AvatarFallback className="rounded-full bg-primary text-white">
          A
        </AvatarFallback>
      </Avatar>
      <motion.div
        variants={badgeMotion}
        className="absolute bottom-0 left-8 flex items-center justify-center overflow-hidden rounded-full border-2 border-background bg-green-500 text-xs font-medium text-white"
      >
        <motion.span variants={textMotion} className="text-[10px]">
          Online
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default AvatarStatus;
