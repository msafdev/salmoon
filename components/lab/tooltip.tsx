"use client";

import { Ellipsis, Lock, Triangle, VenetianMask } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";

const Tooltip = () => {
  const [closed, setClosed] = useState(true);

  return (
    <div className="flex w-full max-w-64 flex-col overflow-hidden rounded-lg border">
      <div className="flex items-center gap-x-3 rounded-md bg-popover p-3">
      <div className="size-8 bg-muted animate-pulse rounded-full border"/>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm font-medium leading-none text-foreground">
            @msafdev
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            msaf.tech
          </p>
        </div>
        <Button
          onClick={() => setClosed(!closed)}
          variant={"ghost"}
          size={"icon"}
          className="ml-auto h-8 w-8"
        >
          <Ellipsis className="h-3 w-3" />
        </Button>
      </div>
      <div
        className={`flex flex-col divide-y border-t bg-background transition-all duration-500 ease-in-out ${
          closed ? "max-h-0 border-transparent" : "max-h-80 border-border"
        }`}
      >
        <div className="flex flex-col p-2.5">
          <Button
            variant={"ghost"}
            size={"sm"}
            className="h-8 justify-start text-xs text-muted-foreground hover:text-foreground"
          >
            Edit Profile
            <VenetianMask className="ml-auto h-3 w-3" />
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="h-8 justify-start text-xs text-muted-foreground hover:text-foreground"
          >
            Account Settings
            <Lock className="ml-auto h-3 w-3" />
          </Button>
        </div>

        <div className="flex flex-col p-2.5">
          <Button
            variant={"ghost"}
            size={"sm"}
            className="h-8 justify-start text-xs text-muted-foreground hover:text-foreground"
          >
            Home Page
            <Triangle className="ml-auto h-3 w-3" />
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="h-8 justify-start text-xs text-red-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-400/20"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
