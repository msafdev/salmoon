import Image from "next/image";

import { skillItems } from "@/lib/constants";

const Marquee = () => {
  return (
    <div className="group relative mt-2 flex gap-x-8 overflow-hidden">
      <div className="absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent" />
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 animate-marquee flex-row justify-around gap-8"
          >
            {skillItems.map((item, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <Image src={item.icon} alt={item.name} width={16} height={16} />
                <p className="text-sm leading-none text-muted-foreground">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Marquee;
