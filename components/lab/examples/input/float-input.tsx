"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

export const FloatInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
  };

  return (
    <div className="relative">
      <Input
        id="float-input"
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "peer h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm",
          "placeholder-transparent focus-visible:border-border focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/20",
        )}
        placeholder=" "
      />
      <Label
        htmlFor="float-input"
        className={cn(
          "origin-start absolute left-2 top-2 z-10 scale-100 transform px-1 text-sm text-foreground/40 transition-all",
          (isFocused || hasValue) &&
            "-translate-y-[18px] bg-background text-xs font-medium text-foreground",
        )}
      >
        Float Input
      </Label>
    </div>
  );
};
