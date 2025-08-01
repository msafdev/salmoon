import { PiSpinnerGapBold } from "react-icons/pi";

import * as React from "react";

import { cn } from "@/lib/utils";

type TextVariant = "wave" | "shimmer" | "text-shimmer" | "blink";
type SpinnerVariant = "spin" | "scale-up-down" | "blink" | "hourglass";

interface LoaderTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  children?: React.ReactNode;
  width?: number;
}

interface LoaderIconProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SpinnerVariant;
  children?: React.ReactNode;
}

const textVariants: Record<TextVariant, string> = {
  wave: "animate-wave",
  shimmer:
    "relative overflow-hidden bg-muted text-transparent rounded select-none",
  blink: "animate-blink",
  "text-shimmer": "animate-text-shimmer",
};

const spinnerVariants: Record<SpinnerVariant, string> = {
  spin: "animate-spin",
  "scale-up-down": "animate-scale-up-down",
  blink: "animate-blink",
  hourglass: "animate-hourglass",
};

const shimmerOverlay = (
  <span className="pointer-events-none absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-primary/5 to-transparent" />
);

const LoaderText = React.forwardRef<HTMLSpanElement, LoaderTextProps>(
  (
    { variant = "shimmer", children, width = 100, className, ...props },
    ref,
  ) => {
    const content = typeof children === "string" ? children : "Loading...";

    if (variant === "wave" && typeof children === "string") {
      return (
        <span
          ref={ref}
          className={cn(
            "inline-block text-sm text-muted-foreground",
            className,
          )}
          {...props}
        >
          {content.split("").map((char, index) => (
            <span
              key={index}
              className="inline-block animate-wave"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      );
    }

    if (variant === "text-shimmer" && typeof children === "string") {
      return (
        <span
          ref={ref}
          style={{ "--shimmer-width": `${width}px` } as React.CSSProperties}
          className={cn(
            "mx-auto animate-text-shimmer text-sm text-zinc-600/40 dark:text-zinc-400/40",
            "bg-clip-text bg-no-repeat bg-position-[0_0] bg-size-[var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
            "bg-linear-to-r from-transparent via-primary via-50% to-transparent",
            className,
          )}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-block text-sm text-muted-foreground",
          textVariants[variant],
          variant === "shimmer" && "relative",
          className,
        )}
        {...props}
      >
        {variant === "shimmer" ? shimmerOverlay : children}
      </span>
    );
  },
);
LoaderText.displayName = "LoaderText";

const LoaderIcon = React.forwardRef<HTMLDivElement, LoaderIconProps>(
  ({ variant = "spin", children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          spinnerVariants[variant],
          variant === "scale-up-down" && `[&>svg]:${spinnerVariants[variant]}`,
          className,
        )}
        {...props}
      >
        {children ?? <PiSpinnerGapBold className="size-4 text-foreground" />}
      </div>
    );
  },
);
LoaderIcon.displayName = "LoaderIcon";

export { LoaderText, LoaderIcon };
