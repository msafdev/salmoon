"use client";

import { useIsClient, useMediaQuery } from "usehooks-ts";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TocItem = {
  depth: number;
  value: string;
  children?: TocItem[];
};

type TableOfContentsProps = {
  toc: TocItem[];
  className?: string;
};

const TableOfContents = ({ toc, className }: TableOfContentsProps) => {
  const matches = useMediaQuery("(max-width: 768px)");
  const isClient = useIsClient();

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headingElements = getHeadingElements();

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      let currentId: string | null = null;

      for (const heading of headingElements) {
        if (heading.offsetTop <= scrollY) {
          currentId = heading.id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateId = (value: string): string => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const getHeadingElements = () =>
    Array.from(
      document.querySelectorAll<HTMLElement>(
        "h2[id], h3[id], h4[id], h5[id], h6[id]",
      ),
    );

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 3;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const renderTocItems = (items: TocItem[]) => {
    return items.map((item) => {
      const id = generateId(item.value);
      const isActive = activeId === id;

      return (
        <li key={id}>
          <button
            onClick={() => scrollToHeading(id)}
            className={cn(
              "w-fit text-left text-xs font-medium transition-colors duration-300 hover:text-foreground lg:text-sm",
              {
                "text-foreground": isActive,
                "text-muted-foreground": !isActive,
                "pl-3": item.depth === 3,
                "pl-6": item.depth === 4,
                "pl-9": item.depth === 5,
                "pl-12": item.depth === 6,
              },
            )}
          >
            {item.value}
          </button>
          {item.children && item.children.length > 0 && (
            <ul className="mt-2 w-fit space-y-2">
              {renderTocItems(item.children)}
            </ul>
          )}
        </li>
      );
    });
  };

  if (!isClient || matches || toc.length === 0) return null;

  return (
    <div className={cn("sticky left-16 top-16 h-fit", className)}>
      <div>
        <h3 className="mb-3 text-nowrap text-sm font-semibold tracking-wide lg:text-base">
          On this page
        </h3>
        <nav>
          <ul className="space-y-2">{renderTocItems(toc)}</ul>
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;
