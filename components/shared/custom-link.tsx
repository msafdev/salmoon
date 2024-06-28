"use client";

import Link from "next/link";

import { copyToClipboard } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";

import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

const CustomLink = ({ href, children }: { href: string; children: string }) => {
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (href.startsWith("mailto")) {
      copyToClipboard(href.replace("mailto:", ""));
      toast({
        title: "📧 Copied to clipboard",
        description: "Please use it wisely!",
        duration: 3000,
        action: (
          <Button asChild variant={"secondary"} size={"sm"}>
            <Link href={href}>Email</Link>
          </Button>
        ),
      });
      return;
    } else if (href.startsWith("http")) {
      window.open(href, "_blank");
      return;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center text-foreground anim gap-x-2 group relative w-fit pb-1 text-sm md:text-base"
    >
      <ArrowUpRight className="group-hover:text-foreground anim group-hover:rotate-45 md:w-4 aspect-square w-3" />
      <span>{children}</span>
      <div className="bottom-0 left-0 h-0.5 group-hover:w-full anim w-0 bg-foreground absolute" />
    </button>
  );
};

export default CustomLink;
