import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const BasicInput = () => {
  return (
    <div className="space-y-3">
      <Label htmlFor="basic-input">Basic input</Label>
      <Input id="basic-input" placeholder="Name" type="text" />
    </div>
  );
};
