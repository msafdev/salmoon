"use client";

import { useState } from "react";
import { easeInOut, motion } from "framer-motion";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { Beaker, Book, Home, Package2, SunMoon } from "lucide-react";

const tabs = [
  { id: 1, label: "Home", href: "/", icon: <Home className="h-full w-full" /> },
  {
    id: 2,
    label: "Lab",
    href: "/lab",
    icon: <Beaker className="h-full w-full" />,
  },
  {
    id: 3,
    label: "About",
    href: "/about",
    icon: <Package2 className="h-full w-full" />,
  },
  {
    id: 4,
    label: "Blog",
    href: "/blog",
    icon: <Book className="h-full w-full" />,
  },
  {
    id: 5,
    label: "Theme",
    icon: <SunMoon className="h-full w-full" />,
  },
];

const Dock = () => {
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.href === usePathname())?.id || 1
  );
  const { theme, setTheme } = useTheme();

  const duration = 0.5;

  const dockVariants = {
    open: {
      width: "fit-content",
      opacity: 1,
      transition: {
        easeInOut,
        duration,
      },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: {
        easeInOut,
        duration,
      },
    },
  };

  const initialX = (activeTab - 1) * 40;

  return (
    <motion.div
      variants={dockVariants}
      initial="closed"
      animate="open"
      className="rounded-2xl z-50 border bg-popover p-1 fixed bottom-8 inset-x-0 mx-auto"
    >
      <div className="flex items-center relative">
        <motion.span
          className="absolute w-10 top-0 bottom-0 z-[99] rounded-[12px] bg-primary/40 mix-blend-difference outline-none ring-0 dark:bg-primary/80"
          initial={{ translateX: initialX }}
          animate={{ translateX: (activeTab - 1) * 40 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
        {tabs.map((tab) =>
          tab.href ? (
            <Link
              key={tab.id}
              href={tab.href}
              scroll={true}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              } group/dock relative h-10 w-10 p-3 text-sm transition-all duration-500 ease-in-out focus-visible:outline-none`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {tab.icon}
              <span className="absolute -top-8 left-1/2 hidden md:block -translate-x-1/2 -translate-y-2 scale-75 rounded-md border bg-popover p-1 px-1.5 text-[10px] font-medium leading-none text-foreground opacity-0 transition-all duration-200 ease-in-out group-hover/dock:translate-y-0 group-hover/dock:scale-100 group-hover/dock:opacity-100">
                {tab.label}
              </span>
            </Link>
          ) : (
            <button
              key={tab.id}
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className={`${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              } group/dock relative h-10 w-10 p-3 text-sm transition-all duration-500 ease-in-out focus-visible:outline-none`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {tab.icon}
              <span className="absolute -top-8 left-1/2 hidden md:block -translate-x-1/2 -translate-y-2 scale-75 rounded-md border bg-popover p-1 px-1.5 text-[10px] font-medium leading-none text-foreground opacity-0 transition-all duration-200 ease-in-out group-hover/dock:translate-y-0 group-hover/dock:scale-100 group-hover/dock:opacity-100">
                {tab.label}
              </span>
            </button>
          )
        )}
      </div>
    </motion.div>
  );
};

export default Dock;
