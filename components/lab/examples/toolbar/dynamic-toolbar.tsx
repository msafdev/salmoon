"use client";

import { PiPlusCircleDuotone, PiSealCheckFill } from "react-icons/pi";

import { useState } from "react";

import {
  Toolbar,
  ToolbarButton,
  ToolbarContent,
  ToolbarItem,
} from "@/components/lab/toolbar";

export const DynamicToolbar = () => {
  const [mode, setMode] = useState<"default" | "finished">("default");

  const handleClick = () => {
    setMode("finished");

    setTimeout(() => {
      setMode("default");
    }, 2000);
  };

  return (
    <Toolbar defaultMode="default" mode={mode}>
      <ToolbarContent mode="default" className="min-w-52">
        <ToolbarItem className="flex w-full items-center justify-center">
          <ToolbarButton
            onClick={handleClick}
            className="w-full items-center gap-2 rounded-[12px]"
          >
            <PiPlusCircleDuotone size={16} />
            Create Index
          </ToolbarButton>
        </ToolbarItem>
      </ToolbarContent>

      <ToolbarContent mode="finished" className="min-h-36 min-w-52">
        <ToolbarItem className="flex w-full items-center justify-between">
          <div className="flex w-full flex-col items-center text-center">
            <PiSealCheckFill className="mb-2 size-6 fill-green-500" />
            <h3 className="text-base font-semibold">Finished</h3>
          </div>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
