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
  <span className="animate-shimmer via-primary/5 pointer-events-none absolute inset-0 bg-linear-to-r from-transparent to-transparent" />
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
            "text-muted-foreground inline-block text-sm",
            className,
          )}
          {...props}
        >
          {content.split("").map((char, index) => (
            <span
              key={index}
              className="animate-wave inline-block"
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
            "animate-text-shimmer mx-auto text-sm text-zinc-600/40 dark:text-zinc-400/40",
            "bg-size-[var(--shimmer-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
            "via-primary bg-linear-to-r from-transparent via-50% to-transparent",
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
          "text-muted-foreground inline-block text-sm",
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
        {children ?? <PiSpinnerGapBold className="text-foreground size-4" />}
      </div>
    );
  },
);
LoaderIcon.displayName = "LoaderIcon";

export { LoaderText, LoaderIcon };
