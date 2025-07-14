"use client";

import { useState } from "react";
import { PiArrowClockwiseBold } from "react-icons/pi";

import { Button } from "@/components/ui/button";

import Stagger from "@/components/lab/stagger";

export const BasicAnimation = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Stagger className="flex flex-col gap-4 md:flex-row" trigger={toggle}>
        {Array.from({ length: 3 }, (_, index) => (
          <div
            className="flex aspect-video w-24 items-center gap-2 rounded border bg-accent p-2"
            key={index}
          />
        ))}
      </Stagger>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setToggle((prev) => !prev)}
        className="mx-auto size-8"
      >
        <PiArrowClockwiseBold size={14} />
      </Button>
    </div>
  );
};
