"use client";

import { ArrowUpRight } from "lucide-react";

import Link from "next/link";

import { useToast } from "@/components/ui/use-toast";

import { copyToClipboard } from "@/lib/utils";

const CopyEmail = ({ email }: { email: string }) => {
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    copyToClipboard(email);
    toast({
      title: "📧 Copied to clipboard",
      description: "Please use it wisely!",
      duration: 2000,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="anim group relative flex w-fit items-center gap-x-2 text-sm font-medium text-muted-foreground md:text-sm"
    >
      <ArrowUpRight className="anim aspect-square w-3 text-foreground group-hover:rotate-45 md:w-4" />
      <span className="anim-slow group-hover:text-foreground">Email</span>
    </button>
  );
};

const CustomLink = ({ href, children }: { href: string; children: string }) => {
  if (href.startsWith("mailto:"))
    return <CopyEmail email={href.replace("mailto:", "")} />;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Go to ${href}`}
      className="anim group relative flex w-fit items-center gap-x-2 text-sm font-medium text-muted-foreground md:text-sm"
    >
      <ArrowUpRight className="anim aspect-square w-3 text-foreground group-hover:rotate-45 md:w-4" />
      <span className="anim-slow group-hover:text-foreground">{children}</span>
    </Link>
  );
};

export default CustomLink;
