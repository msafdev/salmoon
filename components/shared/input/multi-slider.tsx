"use client";

import React, { useEffect, useState } from "react";

interface MultiSliderProps {
  min?: number;
  max?: number;
  step?: number;
  mode?: "number" | "currency";
  className?: string;
  onChange?: (value: number[] | string[]) => void;
  value?: number[] | string[];
  defaultValue?: [number, number];
}

const formatCurrency = (value: number) => `$${value.toLocaleString("en-US")}`;

export default function MultiSlider({
  min = 0,
  max = 100,
  step = 1,
  mode = "number",
  className = "",
  onChange,
  value,
  defaultValue,
}: MultiSliderProps) {
  const getInitialRange = (): [number, number] => {
    if (value && Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const nums = value.map((v) =>
          typeof v === "string" ? parseInt(v.replace(/[$,]/g, "")) : v,
        ) as number[];
        return [nums[0] || min, nums[1] || max];
      }
      return [(value[0] as number) || min, (value[1] as number) || max];
    }
    if (defaultValue) {
      return defaultValue;
    }
    return [min, max];
  };

  const [range, setRange] = useState<[number, number]>(getInitialRange);

  useEffect(() => {
    if (value && Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const nums = value.map((v) =>
          typeof v === "string" ? parseInt(v.replace(/[$,]/g, "")) : v,
        ) as number[];
        setRange([nums[0] || min, nums[1] || max]);
      } else {
        setRange([(value[0] as number) || min, (value[1] as number) || max]);
      }
    }
  }, [value, min, max]);

  const handleChange = (index: 0 | 1, newValue: number) => {
    const newRange: [number, number] =
      index === 0
        ? [Math.min(newValue, range[1]), range[1]]
        : [range[0], Math.max(newValue, range[0])];

    setRange(newRange);

    if (onChange) {
      if (mode === "currency") {
        onChange(newRange.map((v) => formatCurrency(v)) as string[]);
      } else {
        onChange(newRange);
      }
    }
  };

  const percentage = (value: number) => ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full space-y-3 ${className}`}>
      <div className="relative h-4 w-full">
        {/* Track */}
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 transform rounded bg-accent" />

        {/* Active range */}
        <div
          className="pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 transform rounded bg-primary"
          style={{
            left: `${percentage(range[0])}%`,
            width: `${percentage(range[1]) - percentage(range[0])}%`,
          }}
        />

        {/* Lower thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range[0]}
          onChange={(e) => handleChange(0, Number(e.target.value))}
          className="range-thumb pointer-events-none absolute top-0 h-4 w-full appearance-none bg-transparent"
          style={{
            zIndex: range[0] === range[1] ? 40 : 50,
            pointerEvents: "none",
          }}
        />

        {/* Upper thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range[1]}
          onChange={(e) => handleChange(1, Number(e.target.value))}
          className="range-thumb pointer-events-none absolute top-0 h-4 w-full appearance-none bg-transparent"
          style={{
            zIndex: 60,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        {mode === "currency" ? (
          <>
            <span>{formatCurrency(range[0])}</span>
            <span>{formatCurrency(range[1])}</span>
          </>
        ) : (
          <>
            <span>{range[0]}</span>
            <span>{range[1]}</span>
          </>
        )}
      </div>
    </div>
  );
}
