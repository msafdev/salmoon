"use client";

import { ArrowUpRight } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { copyToClipboard } from "@/lib/utils";

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
      className="anim group relative flex w-fit items-center gap-x-2 text-sm font-medium text-muted-foreground md:text-base"
    >
      <ArrowUpRight className="anim aspect-square w-3 text-foreground group-hover:rotate-45 md:w-4" />
      <span className="anim-slow group-hover:text-foreground">{children}</span>
    </button>
  );
};

export default CustomLink;
