import { IconType } from "react-icons/lib";

import React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

export type Name =
  | "instagram"
  | "linkedin"
  | "github"
  | "mail"
  | "readcv"
  | "twitter";

const SocialCard = ({
  href,
  name,
  icon,
  target,
  rel,
  className,
}: {
  href: string;
  name: Name;
  icon: IconType;
  target?: string;
  rel?: string;
  className?: string;
}) => {
  const colorVariant: Record<Name, string> = {
    instagram: "hover:bg-[#E1306C] hover:text-white",
    linkedin: "hover:bg-[#0077B5] hover:text-white",
    github: "hover:bg-[#000000] hover:text-white",
    mail: "hover:bg-[#FFFFFF] hover:text-black",
    readcv: "hover:bg-[#101010] hover:text-white",
    twitter: "hover:bg-[#1DA1F2] hover:text-white",
  };

  return (
    <Link
      href={href}
      className={cn(
        "anim group bg-muted text-muted-foreground xs:aspect-square xs:min-w-16 flex h-12 w-full flex-1 cursor-pointer items-center justify-center rounded-[2px]",
        colorVariant[name],
        className
      )}
      target={target}
      rel={rel}
    >
      <span className="sr-only">Button to {href}</span>
      {React.createElement(icon, {
        className:
          "anim size-4 sm:size-5 will-change-transform group-hover:size-5 sm:group-hover:size-6",
      })}
    </Link>
  );
};

export default SocialCard;
