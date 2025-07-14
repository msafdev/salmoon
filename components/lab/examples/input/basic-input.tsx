import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const BasicInput = () => {
  const id = useId();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor={id}>Basic input</Label>
        <Input id={id} placeholder="Name" type="text" />
      </div>
      <div className="space-y-2.5">
        <Label htmlFor={id}>
          Required input<span className="font-medium text-red-500">*</span>
        </Label>
        <Input id={id} placeholder="msaf@acme.com" type="email" />
      </div>
    </div>
  );
};
