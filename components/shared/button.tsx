"use client";

import { ContainerIcon } from "lucide-react";

import Link from "next/link";

import { cn } from "@/lib/utils";

const Button = ({
  onClick,
  children,
  className,
  disabled,
  type = "button",
  asLink,
  href,
  size = "md",
  ...rest
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  [x: string]: any;
  asLink?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg" | "icon";
}) => {
  const buttonSizes = {
    sm: "px-3 h-9",
    md: "px-4 h-10",
    lg: "px-6 h-11",
    icon: "px-4 py-3 h-10 w-fit",
  };

  const containerSizes = {
    sm: "w-full",
    md: "w-full",
    lg: "w-full",
    icon: "w-fit",
  };

  return (
    <div
      className={cn(
        "group/button whitespace-nowrap rounded-lg bg-gradient-to-b from-zinc-200 to-zinc-300 p-[1px] dark:from-zinc-700 dark:to-zinc-800",
        containerSizes[size],
      )}
    >
      <button
        onClick={onClick}
        type={type}
        className={cn(
          `anim flex w-full items-center justify-center gap-x-2 rounded-[calc(var(--radius)-1px)] bg-gradient-to-b from-card/80 to-card/90 text-sm font-medium text-black transition-all duration-300 ease-in-out group-hover/button:from-card/70 group-hover/button:to-card/80 dark:text-white ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`,
          buttonSizes[size],
          className,
        )}
        disabled={disabled}
        {...rest}
      >
        {asLink ? (
          <Link href={href || "https://example.com"}>{children}</Link>
        ) : (
          children
        )}
      </button>
    </div>
  );
};
export default Button;
