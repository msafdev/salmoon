"use client";

import { useState } from "react";
import { PiArrowClockwiseBold } from "react-icons/pi";

import Stagger from "@/components/lab/stagger";

export const DefaultAnimation = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setToggle((prev) => !prev)}
        className="inline-flex size-8 items-center justify-center whitespace-nowrap rounded-md bg-transparent text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground"
      >
        <PiArrowClockwiseBold size={14} />
      </button>

      <Stagger className="flex gap-4" trigger={toggle}>
        {Array.from({ length: 3 }, (_, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div className="mb-4 size-10 rounded-full bg-muted" />
            <div className="mb-2 h-3.5 w-16 rounded bg-muted" />
            <div className="h-3 w-9 rounded bg-muted" />
          </div>
        ))}
      </Stagger>
    </div>
  );
};
