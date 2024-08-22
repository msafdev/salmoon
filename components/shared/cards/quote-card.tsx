"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { quoteItems } from "@/lib/constants";

const QuoteCard = () => {
  const [active, setActive] = useState<number>(0);

  const transitionVariants = {
    enter: {
      opacity: 0,
      filter: "blur(4px)",
      height: 0,
    },
    center: {
      opacity: 1,
      filter: "blur(0px)",
      height: "auto",
    },
    exit: {
      opacity: 0,
      filter: "blur(4px)",
      height: 0,
    },
  };

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
      <div className="flex h-8 w-full items-center justify-between gap-x-4">
        <h2 className="text-lg font-semibold">Word for word</h2>
        <Button
          onClick={() => setActive((prev) => (prev + 1) % quoteItems.length)}
          className="size-8 hover:bg-transparent"
          variant="ghost"
          size="icon"
        >
          <RefreshCcw size={16} />
        </Button>
      </div>
      <div className="relative flex w-full flex-col">
        <AnimatePresence initial={false} mode="popLayout">
          {quoteItems.map((item, index) => (
            <motion.blockquote
              key={index}
              initial="enter"
              animate={active === index ? "center" : "exit"}
              exit="exit"
              variants={transitionVariants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-y-2"
            >
              <p className="text-sm font-medium">{item.quote}</p>
              <code className="text-xs font-normal text-muted-foreground">
                {item.author}
              </code>
            </motion.blockquote>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuoteCard;
