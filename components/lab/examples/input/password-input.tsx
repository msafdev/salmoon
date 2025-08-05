"use client";

import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PasswordInput = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-3">
      <Label htmlFor="password-input">Password input</Label>
      <div className="relative">
        <Input
          id="password-input"
          placeholder="Password"
          className="pr-9"
          type={show ? "text" : "password"}
        />
        <Button
          className="text-muted-foreground hover:text-foreground absolute inset-y-0 end-0 h-9 hover:bg-transparent"
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
    </div>
  );
};
