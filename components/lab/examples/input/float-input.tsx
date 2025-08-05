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
          "peer border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm",
          "focus-visible:border-border focus-visible:ring-ring/20 placeholder-transparent focus-visible:ring-2 focus-visible:outline-hidden",
        )}
        placeholder=" "
      />
      <Label
        htmlFor="float-input"
        className={cn(
          "origin-start text-foreground/40 absolute top-2 left-2 z-10 scale-100 transform px-1 text-sm transition-all",
          (isFocused || hasValue) &&
            "bg-background text-foreground -translate-y-[18px] text-xs font-medium",
        )}
      >
        Float Input
      </Label>
    </div>
  );
};
