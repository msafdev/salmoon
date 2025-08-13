"use client";

import { FC, useMemo } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";

import { cn } from "@/lib/utils";

type IconProps = {
  name: string;
  className?: string;
  size?: number;
};

export const Svg: FC<IconProps> = ({ name, className = "", size = 12 }) => {
  const { resolvedTheme } = useTheme();
  const key = name.toLowerCase();

  const src = useMemo(() => {
    const themeSuffix = resolvedTheme === "dark" ? "dark" : "light";
    const themedPath = `/icons/tech/${key}-${themeSuffix}.svg`;
    const defaultPath = `/icons/tech/${key}.svg`;

    // We can't do a filesystem check in the browser, so we rely on naming convention
    // and fallback if themed file isn't provided
    const hasThemedVersion = [
      "astro",
      "aws",
      "drizzle",
      "github",
      "markdown",
      "prisma",
      "motion",
      "swr",
      "vercel",
      "zed",
      "shadcn",
      "go",
      "express",
    ].includes(key);

    return hasThemedVersion ? themedPath : defaultPath;
  }, [key, resolvedTheme]);

  return (
    <Image
      src={src}
      alt={key}
      width={size}
      height={size}
      className={cn("size-3", className)}
    />
  );
};
