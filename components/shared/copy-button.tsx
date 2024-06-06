"use client";

import { ArrowUpRight } from "lucide-react";

const CopyButton = () => {
  const copyText = (entryText: string) => {
    navigator.clipboard.writeText(entryText);
  };

  return (
    <button
      onClick={() => copyText("salmanalfarisi261002@gmail.com")}
      className="flex items-center text-foreground anim gap-x-2 group relative w-fit pb-1"
    >
      <ArrowUpRight
        size={16}
        className="group-hover:text-foreground anim group-hover:rotate-45"
      />
      <span>hi@msaf.tech</span>
      <div className="bottom-0 left-0 h-0.5 group-hover:w-full anim w-0 bg-foreground absolute" />
    </button>
  );
};

export default CopyButton;
