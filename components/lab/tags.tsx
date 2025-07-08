"use client";

import { motion } from "framer-motion";

import { useState } from "react";
import { PiDeviceMobileCameraDuotone, PiGlobeDuotone } from "react-icons/pi";

import { cn } from "@/lib/utils";

const chipItems = [
  {
    id: 1,
    label: "Website",
    icon: <PiGlobeDuotone className="h-3.5 w-3.5" />,
    selected: false,
  },
  {
    id: 2,
    label: "Mobile",
    icon: <PiDeviceMobileCameraDuotone className="h-3.5 w-3.5" />,
    selected: false,
  },
];

const Tags = () => {
  const [tags, setTags] = useState(chipItems);

  const toggleSelect = (id: number) => {
    setTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        selected: tag.id === id ? !tag.selected : false,
      })),
    );
  };

  const textColor: { [key: string]: string } = {
    1: "text-blue-600",
    2: "text-pink-600",
    3: "text-green-600",
  };

  const bgColor: { [key: string]: string } = {
    1: "bg-blue-500/20",
    2: "bg-pink-500/20",
    3: "bg-green-500/20",
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      {tags.map((item, index) => (
        <div
          key={item.id}
          onClick={() => toggleSelect(item.id)}
          className={cn(
            `flex cursor-pointer items-center rounded-full py-1.5 transition-all duration-500 ease-in-out ${
              item.selected ? "px-3" : "px-1"
            }`,
            textColor[item.id],
            item.selected && bgColor[item.id],
          )}
        >
          {item.icon}
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: item.selected ? "auto" : 0,
              marginLeft: item.selected ? 8 : 0,
              opacity: item.selected ? 1 : 0,
            }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden text-sm font-medium"
          >
            {item.label}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

export default Tags;
