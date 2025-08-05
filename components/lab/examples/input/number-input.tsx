"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

import { useCallback, useState } from "react";

import { Label } from "@/components/ui/label";

export const NumberInput = () => {
  const [value, setValue] = useState("");

  const increment = useCallback(() => {
    setValue((prev) => (prev === "" ? "1" : String(Number(prev) + 1)));
  }, []);

  const decrement = useCallback(() => {
    setValue((prev) => {
      if (prev === "") return "0";
      const num = Number(prev);
      return String(Math.max(0, num - 1));
    });
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === "" || /^\d+$/.test(inputValue)) {
      setValue(inputValue);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        increment();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        decrement();
      }
    },
    [increment, decrement],
  );

  return (
    <div className="space-y-3">
      <Label htmlFor="number-input">Number input</Label>
      <div className="relative">
        <input
          id="number-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:border-border focus-visible:ring-ring/40 dark:bg-input/30 flex h-9 w-full rounded-md border bg-transparent px-3 py-2 pr-12 text-sm focus-visible:ring-[3px] focus-visible:outline-hidden"
        />
        <div className="absolute top-1/2 right-px flex -translate-y-1/2 flex-col border-l">
          <button
            type="button"
            onClick={increment}
            className="text-muted-foreground hover:text-accent-foreground flex h-[17px] w-7 items-center justify-center rounded-none border-b bg-transparent p-0 focus-visible:ring-0 focus-visible:outline-hidden"
            aria-label="Increment"
          >
            <ChevronUp className="size-3" />
          </button>
          <button
            type="button"
            onClick={decrement}
            className="text-muted-foreground hover:text-accent-foreground flex h-[17px] w-7 items-center justify-center rounded-none bg-transparent p-0 focus-visible:ring-0 focus-visible:outline-hidden"
            aria-label="Decrement"
          >
            <ChevronDown className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
