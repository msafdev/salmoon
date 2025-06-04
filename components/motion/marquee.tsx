import Image from "next/image";

import { skillItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Marquee = () => {
  return (
    <div className="group/marquee relative mt-2 flex w-full justify-around gap-x-2">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent md:w-16" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent md:w-16" />
      {skillItems.map((item, index) => (
        <div
          key={index}
          className="anim group/marquee-item relative grid h-fit min-w-4 place-items-center rounded-lg p-1 hover:bg-accent sm:p-2"
        >
          <Image
            src={item.icon}
            alt={item.name}
            width={28}
            height={28}
            className={cn(
              "",
              item.name === "Next" && "rounded-full dark:bg-foreground",
            )}
            sizes="10vw"
          />
          <div className="anim-slow absolute -bottom-8 z-10 flex h-6 items-center rounded border bg-card px-1.5 opacity-0 shadow-sm group-hover/marquee-item:opacity-100">
            <span className="text-xs font-medium font-mono leading-none text-card-foreground">
              {item.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marquee;
