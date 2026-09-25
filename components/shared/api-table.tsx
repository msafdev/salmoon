"use client";

import { PiCaretDownBold } from "react-icons/pi";

import React, { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ComponentApi, PropItem } from "@/lib/api-reference";
import { cn } from "@/lib/utils";

interface ApiTableProps {
  data: ComponentApi[];
  className?: string;
}

const PropRow = ({ prop, isLast }: { prop: PropItem; isLast: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "group transition-colors",
        !isLast && "border-border/70 border-b",
      )}
    >
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="hover:bg-muted/40 data-[state=open]:bg-muted/30 flex w-full cursor-pointer items-center px-4 py-3 text-left transition-colors select-none"
        >
          <div className="grid w-full grid-cols-12 items-center gap-2 pr-2 font-mono text-xs">
            <span className="text-foreground col-span-4 truncate font-semibold">
              {prop.name}
            </span>
            <span className="text-muted-foreground col-span-4 truncate font-mono">
              {prop.type}
            </span>
            <span className="text-muted-foreground col-span-4 truncate font-mono">
              {prop.defaultValue || "-"}
            </span>
          </div>
          <PiCaretDownBold
            className={cn(
              "text-muted-foreground size-3 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-muted/20 border-border/50 space-y-3 border-t px-4 py-3.5 text-xs transition-all">
        <p className="text-muted-foreground leading-relaxed">
          {prop.description}
        </p>

        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
          <span className="text-muted-foreground text-xs font-medium">
            Type:
          </span>
          <code className="bg-muted/60 dark:bg-muted/40 border-border/60 text-foreground w-fit max-w-full overflow-x-auto rounded border px-2 py-0.5 font-mono text-xs">
            {prop.expandedType || prop.type}
          </code>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default function ApiTable({ data, className }: ApiTableProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className={cn("w-full space-y-6", className)}>
      {data.map((item, idx) => (
        <div key={idx} className="space-y-3">
          {item.title && (
            <h4 className="text-foreground font-mono text-sm font-semibold">
              {item.title}
            </h4>
          )}

          <div className="border-border bg-card/30 overflow-hidden rounded border">
            {/* Table Header */}
            <div className="bg-muted/40 border-border/80 text-muted-foreground flex items-center justify-between border-b px-4 py-2.5 font-mono text-xs font-medium">
              <div className="grid w-full grid-cols-12 gap-2 pr-2">
                <span className="col-span-4">Prop</span>
                <span className="col-span-4">Type</span>
                <span className="col-span-4">Default</span>
              </div>
              <div className="size-3 shrink-0" />
            </div>

            {/* Rows */}
            <div>
              {item.props.map((prop, propIdx) => (
                <PropRow
                  key={prop.name}
                  prop={prop}
                  isLast={propIdx === item.props.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
