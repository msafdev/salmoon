import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content text-foreground shadow-xs flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] placeholder:text-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 md:text-sm md:placeholder:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
