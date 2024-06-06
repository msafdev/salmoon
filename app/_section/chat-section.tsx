"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatFooter from "@/components/shared/chat-footer";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      ease: "easeInOut",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const chat = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      ease: "easeInOut",
    },
  },
};

const ChatSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="max-w-2xl flex flex-col gap-y-4 items-start w-full md:p-4"
    >
      {/* Avatar and First Chat */}
      <motion.div variants={chat} className="flex items-end gap-x-4 w-full">
        <motion.div variants={item} className="relative">
          <Avatar className="border overflow-hidden">
            <AvatarImage src="./ava.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* Status */}
          <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0.5 right-0.5 border" />
        </motion.div>
        <motion.div
          variants={item}
          className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border"
        >
          <p className="text-accent-foreground text-sm">
            Hi there, I'm Salman.
          </p>
        </motion.div>
      </motion.div>

      {/* Second Chat */}
      <motion.div variants={item} className="flex w-full">
        <div className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border">
          <p className="text-accent-foreground text-sm">
            A creative developer since 2020. I'm passionate about crafting
            beautiful interface designs and attention to detail.
          </p>
        </div>
      </motion.div>

      {/* Third Chat */}
      <motion.div variants={item} className="flex flex-col gap-y-2">
        <div className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border">
          <p className="text-accent-foreground text-sm">
            Now I'm creating my own freelancing business, exploring methods, and
            leveling up both my design and programming skills.
          </p>
        </div>

        <ChatFooter time={4}/>
      </motion.div>
    </motion.div>
  );
};

export default ChatSection;
