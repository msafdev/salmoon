"use client";

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { motion } from "framer-motion";

const MenuButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="flex w-full justify-end relative"
    >
      <button
        ref={buttonRef}
        aria-label="Menu Button"
        onClick={() => setOpen(!open)}
        className="flex group flex-col z-20 bg-primary h-10 aspect-square anim ease-linear justify-center items-end gap-y-1 relative rounded-xl"
      >
        <div
          className={`w-[22px] anim ease-in-out rounded-full bg-background absolute snap-center top-1/2 left-1/2 -translate-x-1/2 ${
            open
              ? "-translate-y-1/2 rotate-45 bg-slate-400 h-1"
              : "-translate-y-[2.5px] h-0.5"
          }`}
        />
        <div
          className={`w-[22px] anim ease-in-out rounded-full bg-background absolute snap-center top-1/2 left-1/2 -translate-x-1/2 ${
            open
              ? "-translate-y-1/2 -rotate-45 h-1"
              : "translate-y-[2.5px] h-0.5"
          }`}
        />
      </button>

      {/* Desktop Menu Bar */}
      <div
        ref={menuRef}
        className={`absolute w-full rounded-2xl xs:max-w-xs overflow-hidden anim ease-linear -top-1 xs:top-1/2 -right-1 z-10 xs:-translate-y-1/2 ${
          open
            ? "w-full xs:h-12 bg-popover border pl-4 sm:pl-6 pr-16 opacity-100"
            : "w-0 xs:h-12 opacity-0"
        }`}
      >
        <div className="flex flex-col text-popover-foreground xs:flex-row items-center justify-center gap-x-8 h-fit xs:h-full gap-y-3 py-4 xs:py-0 w-full">
          <Link
            href="/about"
            className={`text-sm font-semibold font-mono anim ease-in-out flex items-center w-full xs:w-fit gap-x-3 xs:gap-x-2 group ${
              open ? "opacity-100" : "opacity-0"
            }`}
            aria-label="About Page"
          >
            <div className="w-4 xs:w-1 h-1 bg-orange-400 xs:bg-primary rounded-full group-hover:w-4 anim ease-in-out group-hover:bg-orange-400" />
            <span>About</span>
          </Link>
          <Link
            href="/"
            className={`text-sm font-semibold font-mono anim ease-in-out flex items-center w-full xs:w-fit gap-x-3 xs:gap-x-2 group ${
              open ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Blog Page"
          >
            <div className="w-4 xs:w-1 h-1 bg-orange-400 xs:bg-primary rounded-full group-hover:w-4 anim ease-in-out group-hover:bg-orange-400" />
            <span>Blog</span>
          </Link>
          <Link
            href="/work"
            className={`text-sm font-semibold font-mono anim ease-in-out flex items-center w-full xs:w-fit gap-x-3 xs:gap-x-2 group ${
              open ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Work Page"
          >
            <div className="w-4 xs:w-1 h-1 bg-orange-400 xs:bg-primary rounded-full group-hover:w-4 anim ease-in-out group-hover:bg-orange-400" />
            <span>Work</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuButton;
