"use client";

import {
  PiCheckBold,
  PiEyeBold,
  PiEyeClosedBold,
  PiXBold,
} from "react-icons/pi";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const passwordRules = [
  {
    key: "length",
    label: "Min 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    key: "lowercase",
    label: "At least 1 lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    key: "uppercase",
    label: "At least 1 uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    key: "symbol",
    label: "At least 1 symbol",
    test: (value: string) => /[^a-zA-Z0-9]/.test(value),
  },
];

export const ValidateInput = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const validations = passwordRules.map((rule) => ({
    ...rule,
    valid: rule.test(value),
  }));

  return (
    <div className="space-y-2">
      <Label htmlFor="validate-input">Valid Password Input</Label>

      <div className="relative">
        <Input
          id="validate-input"
          placeholder="Password"
          className="pr-10"
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          className="absolute inset-y-0 end-0 h-9 text-muted-foreground hover:bg-transparent hover:text-foreground"
          size="icon"
          type="button"
          onClick={() => setShow((prev) => !prev)}
          variant="ghost"
        >
          {show ? (
            <PiEyeBold className="size-4" />
          ) : (
            <PiEyeClosedBold className="size-4" />
          )}
        </Button>
      </div>

      <ul className="mt-1 space-y-2">
        {validations.map(({ key, label, valid }) => (
          <li
            key={key}
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            {valid ? (
              <PiCheckBold className="size-3 text-green-500" />
            ) : (
              <PiXBold className="size-3 text-red-500" />
            )}
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
