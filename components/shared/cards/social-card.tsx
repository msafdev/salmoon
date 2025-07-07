import React from "react";
import { IconType } from "react-icons/lib";

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
}: {
  href: string;
  name: Name;
  icon: IconType;
  target?: string;
  rel?: string;
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
        "anim group flex aspect-[4/3] h-auto w-auto min-w-16 flex-1 cursor-pointer items-center justify-center rounded bg-muted text-muted-foreground",
        colorVariant[name],
      )}
      target={target}
      rel={rel}
    >
      <span className="sr-only">Button to {href}</span>
      {React.createElement(icon, {
        className: "size-4 group-hover:size-5 anim will-change-transform",
      })}
    </Link>
  );
};

export default SocialCard;
