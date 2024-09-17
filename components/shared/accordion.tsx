"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

type AccordionProps = {
  title: string;
  color?: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  color = "text-foreground",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="group/accordion w-full rounded-[12px] bg-gradient-to-b from-zinc-200 to-zinc-300 p-[1px] dark:from-zinc-600 dark:to-zinc-700">
      <div className="anim w-full rounded-[11px] bg-card/90 group-hover/accordion:bg-card/70">
        <div
          className={`flex cursor-pointer items-center justify-between px-3.5 py-3 ${color}`}
          onClick={toggleAccordion}
        >
          <p className="font-semibold">{title}</p>
          <motion.span
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
            className="text-xl font-bold"
          >
            {isOpen ? "-" : "+"}
          </motion.span>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{
                type: "tween",
                ease: [0.34, 1.56, 0.64, 1],
                duration: 0.6,
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-y-3.5 border-t px-3.5 py-3 text-sm font-medium">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Accordion;
