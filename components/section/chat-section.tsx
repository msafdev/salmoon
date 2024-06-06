"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { CheckCheck, ThumbsDown, Heart } from "lucide-react";

// Dynamic import for Avatar components
const Avatar = dynamic(() =>
  import("@/components/ui/avatar").then((mod) => mod.Avatar)
);
const AvatarFallback = dynamic(() =>
  import("@/components/ui/avatar").then((mod) => mod.AvatarFallback)
);
const AvatarImage = dynamic(() =>
  import("@/components/ui/avatar").then((mod) => mod.AvatarImage)
);

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
          className="flex px-6 py-3 bg-muted rounded-3xl rounded-bl-md border"
        >
          <p className="text-muted-foreground text-sm">Hi there, I'm Salman.</p>
        </motion.div>
      </motion.div>

      {/* Second Chat */}
      <motion.div variants={item} className="flex flex-col gap-y-2">
        <div className="flex px-6 py-3 bg-muted rounded-3xl rounded-bl-md border">
          <p className="text-muted-foreground text-sm">
            Creative developer with more than 2 years of experience in web
            development. I mainly create magic with Next.js, Tailwind, and
            Typescript.
          </p>
        </div>

        <div className="flex w-full items-center gap-x-4 justify-between">
          <div className="flex gap-x-1 items-center">
            <p className="text-muted-foreground text-xs md:text-sm">4m ago</p>
            <CheckCheck className="text-blue-500 md:w-3 md:h-3 h-2.5 w-2.5" />
          </div>

          <div className="flex gap-x-4 items-center">
            <div className="flex gap-x-2 items-center">
              <ThumbsDown className="text-muted-foreground md:w-3 md:h-3 h-2.5 w-2.5" />
              <p className="text-muted-foreground text-xs md:text-sm">Report</p>
            </div>

            <div className="flex gap-x-2 items-center">
              <Heart className="text-muted-foreground md:w-3 md:h-3 h-2.5 w-2.5" />
              <p className="text-muted-foreground text-xs md:text-sm">
                Favorite
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatSection;
