import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

const VinylPlate = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex size-20 animate-vinyl-spin items-center justify-center rounded-full border bg-gradient-to-r from-black via-zinc-800 to-black",
        className,
      )}
    >
      <div className="relative flex size-[50%] rounded-full">
        <Image
          src="https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26"
          alt="Center Label"
          fill
          className="absolute inset-0 flex size-full items-center justify-center rounded-full bg-zinc-600"
        />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background" />
      </div>
      <div className="absolute size-[90%] rounded-full shadow-[rgba(17,_17,_26,_1)_0px_0px_16px]" />
      <div className="absolute size-[80%] rotate-12 rounded-full shadow-[rgba(17,_17,_26,_1)_0px_0px_8px]" />
      <div className="absolute size-[70%] rotate-45 rounded-full shadow-[rgba(17,_17,_26,_1)_0px_0px_8px]" />
      <div className="absolute size-[60%] -rotate-45 rounded-full shadow-[rgba(17,_17,_26,_1)_0px_0px_8px]" />
      <div className="absolute size-[50%] -rotate-12 rounded-full shadow-[rgba(17,_17,_26,_1)_0px_0px_8px]" />
    </div>
  );
};

const VinylRecord = () => {
  return (
    <div className="relative w-full max-w-56 overflow-hidden rounded-lg border-2 bg-popover">
      <div className="flex flex-col p-2 pl-16 md:pl-[72px]">
        <p className="text-sm font-semibold text-foreground md:text-sm">
          Timur
        </p>
        <p className="text-xs font-medium text-muted-foreground md:text-sm">
          The Adams
        </p>
      </div>
      <VinylPlate className="absolute -left-8 -top-3.5 md:-left-7 md:-top-2.5" />
    </div>
  );
};

export default VinylRecord;
