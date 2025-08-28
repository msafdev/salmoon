import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-border dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-2xs outline-hidden transition-[color,box-shadow] placeholder:text-xs disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:placeholder:text-sm",
        "ring-offset-background focus-visible:ring-ring/40 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
