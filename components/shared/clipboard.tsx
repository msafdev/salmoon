"use client";

import { toast } from "sonner";

import {
  PiCheckBold,
  PiClipboardDuotone,
  PiClipboardTextDuotone,
} from "react-icons/pi";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { copyToClipboard } from "@/lib/functions";

const Clipboard = ({
  className,
  string,
}: {
  className?: string;
  string: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    copyToClipboard(string);
    setIsCopied(true);
    toast("Copied to clipboard", {
      duration: 2000,
      icon: <PiClipboardTextDuotone className="info" size={20} />,
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className={className}
      onClick={handleClick}
      aria-label="Copy to clipboard"
    >
      <span className="sr-only">Copy to clipboard</span>
      {isCopied ? (
        <PiCheckBold className="h-3.5 w-3.5" />
      ) : (
        <PiClipboardDuotone className="h-3.5 w-3.5" />
      )}
    </Button>
  );
};

export default Clipboard;
