import React from "react";

import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex items-end gap-x-4 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative"
      >
        <Avatar className="border overflow-hidden">
          <AvatarImage src="./ava.png" />
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
        <p className="text-muted-foreground text-sm">{title}</p>
      </motion.div>
    </div>
  );
};

export default Title;
