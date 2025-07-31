import { PiQuestionDuotone } from "react-icons/pi";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const NoteInput = () => {
  return (
    <div className="space-y-3">
      <Label htmlFor="note-input">Note input</Label>
      <Input id="note-input" placeholder="Name" type="text" />
      <span className="text-xs text-muted-foreground leading-none">
        <PiQuestionDuotone className="inline-block mr-1"/>
        Add a description here
      </span>
    </div>
  );
};
