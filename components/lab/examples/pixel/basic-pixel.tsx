"use client";

import { useState } from "react";

import { Pixel } from "@/components/lab/pixel";

const images = [
  {
    src: "/assets/ava.webp",
    alt: "Salman's avatar",
  },
];

export const BasicPixel = () => {
  const [version, setVersion] = useState(0);

  return (
    <div className="space-y-4">
      <Pixel key={version} {...images[0]} className="size-32" />
      <button
        type="button"
        className="hover:bg-accent hover:text-accent-foreground inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium shadow-sm transition-colors"
        onClick={() => setVersion((prev) => prev + 1)}
      >
        Regenerate effect
      </button>
    </div>
  );
};
