import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  {
    value: "react",
    label: "React",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "laravel",
    label: "Laravel",
  },
  {
    value: "gatsby",
    label: "Gatsby",
  },
  {
    value: "Phoenix",
    label: "Phoenix",
  },
];

export const BasicSelect = () => {
  return (
    <div className="w-full max-w-64 space-y-3">
      <Label htmlFor="basic-select">Basic Select</Label>
      <Select defaultValue="react">
        <SelectTrigger id="basic-select">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
