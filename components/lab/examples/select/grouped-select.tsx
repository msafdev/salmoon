import { Fragment } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const frameworks = [
  {
    id: "frontend",
    group: "Frontend",
    items: [
      {
        value: "react",
        label: "React",
      },
      {
        value: "astro",
        label: "Astro",
      },
      {
        value: "next",
        label: "Next",
      },
    ],
  },
  {
    id: "backend",
    group: "Backend",
    items: [
      {
        value: "express",
        label: "Express",
      },
      {
        value: "django",
        label: "Django",
      },
      {
        value: "phoenix",
        label: "Phoenix",
      },
    ],
  },
];

export const GroupedSelect = () => {
  return (
    <div className="w-full max-w-64 space-y-3">
      <Label htmlFor="grouped-select">Grouped Select</Label>
      <Select defaultValue="react">
        <SelectTrigger id="grouped-select" className="h-9">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.map((framework) => (
            <Fragment key={framework.id}>
              <SelectGroup>
                <SelectLabel>{framework.group}</SelectLabel>
                {framework.items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator className="last:hidden" />
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
