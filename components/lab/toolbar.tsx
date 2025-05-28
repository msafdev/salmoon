"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeft, Search, User, X } from "lucide-react";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

const transition = {
  type: "spring",
  bounce: 0.3,
  duration: 0.4,
};

type modeType = "search" | "default" | "schedule";

const Toolbar = () => {
  const [mode, setMode] = useState<modeType>("default");

  return (
    <MotionConfig transition={transition}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={false}
          animate={{ width: mode === "default" ? 84 : 254 }}
          transition={transition}
          layout
          className="h-full w-full overflow-hidden rounded-[16px] border bg-popover text-popover-foreground"
        >
          <AnimatePresence mode="wait">
            {mode === "default" ? (
              <motion.div
                key={mode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  delay: mode === "default" ? 0 : 0.2,
                }}
                className="flex items-center p-1"
              >
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-[12px]"
                  aria-label="Make schedule"
                  onClick={() => setMode("schedule")}
                >
                  <User className="size-4" />
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-[12px]"
                  onClick={() => setMode("search")}
                  aria-label="Search notes"
                >
                  <Search className="size-4" />
                </Button>
              </motion.div>
            ) : mode === "search" ? (
              <motion.div
                key={mode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  delay: mode === "search" ? 0 : 0.2,
                }}
                className="flex items-center p-1"
              >
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-[12px]"
                  onClick={() => setMode("default")}
                  aria-label="Back button"
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <div className="relative min-w-52">
                  <input
                    className="h-auto w-full rounded-lg bg-transparent p-1 focus:outline-none"
                    placeholder="Search notes"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={mode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.2,
                  delay: mode === "schedule" ? 0 : 0.2,
                }}
                className="flex items-center p-1"
              >
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-[12px]"
                  onClick={() => setMode("default")}
                  aria-label="Back button"
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <div className="relative flex min-w-52 items-center">
                  <span className="mr-auto px-3 text-sm font-medium text-muted-foreground">
                    John Doe's Birthday
                  </span>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => setMode("default")}
                    aria-label="Placeholder button"
                    className="rounded-[12px] hover:bg-red-500/20"
                  >
                    <X className="size-4 text-red-600" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionConfig>
  );
};

export default Toolbar;
