"use client";

import { useState } from "react";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

import Stagger from "@/components/lab/stagger";

type Direction = "left" | "right";

export const VariantAnimation = () => {
  const [toggle, setToggle] = useState(false);
  const [direction, setDirection] = useState<Direction>("right");

  const getOffset = (dir: Direction) => {
    return dir === "left" ? { x: -12, y: 0 } : { x: 12, y: 0 };
  };

  const offset = getOffset(direction);

  const handleClick = (dir: Direction) => {
    setDirection(dir);
    setToggle((prev) => !prev); 
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => handleClick("left")}
          className="inline-flex size-8 items-center justify-center whitespace-nowrap rounded-md bg-transparent text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground"
          aria-label="Animate from left"
        >
          <PiArrowLeftBold size={14} />
        </button>
        <button
          onClick={() => handleClick("right")}
          className="inline-flex size-8 items-center justify-center whitespace-nowrap rounded-md bg-transparent text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground"
          aria-label="Animate from right"
        >
          <PiArrowRightBold size={14} />
        </button>
      </div>

      <Stagger
        className="space-y-4"
        trigger={toggle}
        staggerVariants={{
          child: {
            initial: {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              filter: "blur(4px)",
            },
            animate: {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              transition: { ease: "easeInOut", duration: 0.6 },
            },
            exit: {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              filter: "blur(4px)",
              transition: { ease: "easeInOut", duration: 0.4 },
            },
          },
        }}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <div className="flex items-center gap-2" key={index}>
            <div className="size-10 rounded-full bg-muted" />
            <div className="flex flex-col">
              <div className="mb-1 h-3.5 w-16 rounded bg-muted" />
              <div className="h-3 w-9 rounded bg-muted" />
            </div>
          </div>
        ))}
      </Stagger>
    </div>
  );
};
