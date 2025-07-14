"use client";

import { useState } from "react";
import { PiCheckBold, PiClipboardDuotone } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { copyToClipboard } from "@/lib/functions";

const CopyButton = ({
  className,
  string,
}: {
  className?: string;
  string: string;
}) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    copyToClipboard(string);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Don't forget to leave a ⭐️ on the repo!",
      duration: 2000,
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

export default CopyButton;
