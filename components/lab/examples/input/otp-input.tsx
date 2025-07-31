"use client";

import { useCallback, useRef, useState } from "react";

import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

const OTP_LENGTH = 5;

const className = cn(
  "flex size-9 min-w-0 bg-transparent px-3 py-1 text-center text-base outline-none",
  "transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground",
  "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  "placeholder:text-muted-foreground",
  "focus-visible:border-boder focus-visible:ring-[2px] focus-visible:ring-ring/40",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  "shadow-xs border-input dark:bg-input/30 md:text-sm",
);

export const OtpInput = () => {
  const [values, setValues] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const updateValue = useCallback((index: number, char: string) => {
    setValues((prev) => {
      const updated = [...prev];
      updated[index] = char;
      return updated;
    });
  }, []);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < OTP_LENGTH) {
      requestAnimationFrame(() => {
        inputsRef.current[index]?.focus();
      });
    }
  }, []);

  const handleChange = useCallback(
    (index: number, rawValue: string) => {
      const numeric = rawValue.replace(/[^0-9]/g, "");
      if (numeric.length <= 1) {
        updateValue(index, numeric);
        if (numeric && index < OTP_LENGTH - 1) {
          focusInput(index + 1);
        }
      }
    },
    [focusInput, updateValue],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const key = e.key;

      if (key === "Backspace") {
        e.preventDefault();
        if (values[index]) {
          updateValue(index, "");
        } else if (index > 0) {
          updateValue(index - 1, "");
          focusInput(index - 1);
        }
      } else if (key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      } else if (key === "ArrowRight" && index < OTP_LENGTH - 1) {
        e.preventDefault();
        focusInput(index + 1);
      } else if (key === "Delete") {
        e.preventDefault();
        updateValue(index, "");
      }
    },
    [focusInput, updateValue, values],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
      const startIndex = inputsRef.current.findIndex(
        (el) => el === e.currentTarget,
      );

      if (startIndex === -1) return;

      setValues((prev) => {
        const updated = [...prev];
        for (
          let i = 0;
          i < Math.min(pasted.length, OTP_LENGTH - startIndex);
          i++
        ) {
          updated[startIndex + i] = pasted[i];
        }
        return updated;
      });

      focusInput(Math.min(startIndex + pasted.length, OTP_LENGTH - 1));
    },
    [focusInput],
  );

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  return (
    <div className="space-y-3">
      <Label htmlFor="otp-input">OTP Input</Label>
      <div id="otp-input" className="flex items-center">
        {values.map((value, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={value}
            name={`otp-input-${idx}`}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            onFocus={handleFocus}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            className={cn(
              "last-border-r-0 border-y border-r first:rounded-s-md first:border last:rounded-e-md",
              className,
            )}
            autoComplete="one-time-code"
          />
        ))}
      </div>
    </div>
  );
};
