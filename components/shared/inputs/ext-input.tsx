"use client";

import * as React from "react";

import { formatCurrency, parseCurrency } from "@/lib/functions";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const isCurrency = type === "currency";
    const isPhone = type === "phone";

    const [displayValue, setDisplayValue] = React.useState(() => {
      if (isCurrency && typeof value === "number") {
        return formatCurrency(value);
      }
      return value?.toString() ?? "";
    });

    React.useEffect(() => {
      if (isCurrency && typeof value === "number") {
        setDisplayValue(formatCurrency(value));
      } else if (!isCurrency && typeof value !== "undefined") {
        setDisplayValue(value ? value.toString() : "");
      }
    }, [value, isCurrency]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value;

      if (isCurrency) {
        raw = raw.replace(/[^\d.,]/g, "");
        setDisplayValue(raw);

        const numericValue = parseCurrency(raw);
        const event = {
          ...e,
          target: {
            ...e.target,
            name: props.name,
            id: props.id,
            value: numericValue,
          },
        };
        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
        return;
      }

      if (isPhone) {
        raw = raw.replace(/[^\d+]/g, "");
        if (raw.includes("+")) {
          raw = "+" + raw.replace(/\+/g, "").replace(/^0+/, "");
        }
        setDisplayValue(raw);

        const event = {
          ...e,
          target: {
            ...e.target,
            name: props.name,
            id: props.id,
            value: raw,
          },
        };
        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
        return;
      }

      setDisplayValue(raw);
      onChange?.(e);
    };

    return (
      <input
        {...props}
        ref={ref}
        type={isCurrency || isPhone ? "text" : type}
        value={displayValue}
        onChange={handleChange}
        inputMode={
          isCurrency
            ? "decimal"
            : isPhone
              ? "tel"
              : (props.inputMode ?? undefined)
        }
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background dark:bg-input/30 px-3 py-2 text-sm text-foreground ring-ring/40 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
