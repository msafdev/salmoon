import { motion } from "framer-motion";

import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full items-end gap-x-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative"
      >
        <Avatar className="overflow-hidden border">
          <AvatarImage src="./ava.png" alt="Avatar" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>

        {/* Status */}
        <div className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full border bg-green-500" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex rounded-2xl rounded-bl-md border bg-accent px-6 py-3"
      >
        <p className="text-sm text-accent-foreground">{title}</p>
      </motion.div>
    </div>
  );
};

export default Title;
