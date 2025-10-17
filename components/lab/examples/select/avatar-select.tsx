import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  {
    id: "ibelick",
    name: "Ibelick",
    avatarUrl: "https://github.com/ibelick.png",
  },
  {
    id: "msafdev",
    name: "Msafdev",
    avatarUrl: "https://github.com/msafdev.png",
  },
  {
    id: "pramudya",
    name: "Pramudya",
    avatarUrl: "https://github.com/prampokan.png",
  },
];

export const AvatarSelect = () => {
  return (
    <div className="w-full max-w-64 space-y-3">
      <Label htmlFor="avatar-select">Avatar Select</Label>
      <Select defaultValue="">
        <SelectTrigger id="avatar-select" className="h-9 pl-1.5">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="pl-3">User</SelectLabel>
            {items.map((item) => (
              <SelectItem
                key={item.id}
                value={item.name}
                className="h-9 pl-2 [&>span]:right-2 [&>span]:left-auto"
              >
                <div className="flex items-center justify-start gap-2">
                  <Image
                    src={item.avatarUrl}
                    alt={`${item.name} avatar`}
                    width={24}
                    height={24}
                    className="rounded"
                    unoptimized
                  />

                  <span className="">{item.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};



