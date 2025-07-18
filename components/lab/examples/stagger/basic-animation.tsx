"use client";

import { PiArrowClockwiseBold } from "react-icons/pi";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import Stagger from "@/components/lab/stagger";

export const BasicAnimation = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-4">
      <Stagger
        className="flex flex-col gap-2 sm:flex-row sm:gap-4"
        trigger={toggle}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <div
            className="flex aspect-video w-16 items-center gap-2 rounded border bg-accent p-2 sm:w-24"
            key={index}
          />
        ))}
      </Stagger>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setToggle((prev) => !prev)}
        className="absolute bottom-2 left-2 mx-auto size-8"
      >
        <PiArrowClockwiseBold size={14} />
      </Button>
    </div>
  );
};
