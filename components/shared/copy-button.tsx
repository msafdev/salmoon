"use client";

import { ClipboardList, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";

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
      variant={"link"}
      size={"icon"}
      className={className}
      onClick={handleClick}
    >
      {isCopied ? (
        <Check className="h-3.5 w-3.5 text-white" />
      ) : (
        <ClipboardList className="h-3.5 w-3.5 text-white" />
      )}
    </Button>
  );
};

export default CopyButton;
