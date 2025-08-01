"use client";

import { easeInOut, motion } from "motion/react";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/lib/config";

const Dock = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<number | null>(
    navItems.find((item) => item.href === pathname)?.id || null,
  );

  useEffect(() => {
    setActiveTab(navItems.find((item) => item.href === pathname)?.id || null);
  }, [pathname]);

  const duration = 0.4;

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

  const initialX = activeTab !== null ? (activeTab - 1) * 40 : 0;

  return (
    <motion.div
      variants={dockVariants}
      initial="closed"
      animate="open"
      className="dock-shadow bg-popover fixed inset-x-0 bottom-8 z-50 mx-auto rounded-xl p-1"
    >
      <div className="relative flex items-center">
        {activeTab !== null && (
          <motion.span
            className="bg-primary/40 dark:bg-primary/20 absolute top-0 bottom-0 z-99 w-10 rounded-[8px] mix-blend-difference ring-0 outline-hidden"
            initial={{ translateX: initialX, opacity: 0, scale: 0 }}
            animate={{ translateX: (activeTab - 1) * 40, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
              opacity: { delay: 0.6 },
            }}
          />
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const commonClass =
            "group/dock relative size-10 p-3 text-sm transition-all duration-300 ease-in-out focus-visible:outline-hidden";

          const tooltip = (
            <span className="bg-popover text-foreground pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 -translate-y-2 scale-75 rounded-md border p-1 px-1.5 text-[10px] leading-none font-medium opacity-0 transition-all duration-200 ease-in-out group-hover/dock:translate-y-0 group-hover/dock:scale-100 group-hover/dock:opacity-100 md:block">
              {item.label}
            </span>
          );

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                scroll={true}
                onClick={() => setActiveTab(item.id)}
                className={`${commonClass} ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
                aria-label={item.label}
              >
                <Icon className="h-full w-full" />
                {tooltip}
              </Link>
            );
          }

          if (item.function === "toggle-theme") {
            return (
              <button
                key={item.id}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`${commonClass} cursor-pointer text-yellow-500 dark:text-indigo-600 [&>svg]:fill-yellow-400 dark:[&>svg]:fill-indigo-500`}
                aria-label="Change theme button"
              >
                <Icon className="h-full w-full" />
                {tooltip}
              </button>
            );
          }

          return null;
        })}
      </div>
    </motion.div>
  );
};

export default Dock;
