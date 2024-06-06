"use client";

import React, { useRef } from "react";

import Link from "next/link";
import { motion, useInView } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatFooter from "@/components/shared/chat-footer";

import { FaPaperPlane } from "react-icons/fa6";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      ease: "easeInOut",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const ActionSection = () => {
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
      <motion.div variants={item} className="flex items-end gap-x-4 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative"
        >
          <Avatar className="border overflow-hidden">
            <AvatarImage src="./ava.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* Status */}
          <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0.5 right-0.5 border" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border"
        >
          <p className="text-accent-foreground text-sm">
            Have a project in mind? Do let me know.
          </p>
        </motion.div>
      </motion.div>

      {/* Second Chat */}
      <motion.div variants={item} className="flex flex-col w-full gap-y-2">
        <Link
          href={"/"}
          className="flex items-center group justify-between pl-6 pr-1 py-1 bg-background hover:bg-green-200 rounded-tl-3xl rounded-e-[50px] rounded-bl-md border anim hover:border-green-500 w-full"
        >
          <p className="text-muted-foreground group-hover:text-green-700 font-medium group-hover:text-primary anim text-sm">
            Get in touch.
          </p>
          <div className="h-auto w-fit px-6 py-2.5 bg-[#878787] group-hover:bg-green-500 anim rounded-full">
            <FaPaperPlane
              size={24}
              className="group-hover:p-0 anim text-background p-1"
            />
          </div>
        </Link>

        <ChatFooter />
      </motion.div>
    </motion.div>
  );
};

export default ActionSection;
