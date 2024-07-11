"use client";

import { motion } from "framer-motion";
import { Globe, Play, Smartphone } from "lucide-react";

import { useState } from "react";

const chipData = [
  {
    id: 1,
    label: "Animation",
    icon: <Play className="h-3.5 w-3.5" />,
    selected: false,
  },
  {
    id: 2,
    label: "Website",
    icon: <Globe className="h-3.5 w-3.5" />,
    selected: false,
  },
  {
    id: 3,
    label: "Mobile",
    icon: <Smartphone className="h-3.5 w-3.5" />,
    selected: false,
  },
];

const AnimatedTags = () => {
  const [tags, setTags] = useState(chipData);

  const toggleSelect = (id: number) => {
    setTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        selected: tag.id === id ? !tag.selected : false,
      })),
    );
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      {tags.map(({ id, label, icon, selected }) => (
        <div
          key={id}
          onClick={() => toggleSelect(id)}
          className={`flex cursor-pointer items-center rounded-full py-1.5 transition-all duration-500 ease-in-out ${
            selected
              ? "bg-accent px-3 text-accent-foreground"
              : "px-1 text-muted-foreground hover:text-accent-foreground"
          }`}
        >
          {icon}
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: selected ? "auto" : 0,
              marginLeft: selected ? 8 : 0,
              opacity: selected ? 1 : 0,
            }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden text-sm"
          >
            {label}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTags;
