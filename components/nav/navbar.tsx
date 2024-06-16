"use client";

import React from "react";
import MenuButton from "@/components/nav/menu-button";

import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className="w-full flex justify-center px-4 sticky top-0 z-50">
      <div className="flex items-center w-full justify-between gap-x-4 max-w-2xl py-6 relative bg-background">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-2xl font-bold font-mono"
        >
          Moon
        </motion.span>
        <MenuButton />

        <div className="w-full h-12 absolute bg-gradient-to-b from-background to-transparent -bottom-12 pointer-events-none" />
      </div>
    </header>
  );
};

export default Navbar;
