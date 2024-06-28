"use client";

import Link from "next/link";

import { copyToClipboard } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="flex items-center text-muted-foreground anim gap-x-2 group relative w-fit text-sm md:text-base font-medium"
    >
      <ArrowUpRight className="text-foreground anim group-hover:rotate-45 md:w-4 aspect-square w-3" />
      <span className="group-hover:text-foreground anim-slow">{children}</span>
    </button>
  );
};

export default CustomLink;
