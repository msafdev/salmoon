import Image from "next/image";

import { skillItems } from "@/lib/constants";

const Marquee = () => {
  return (
    <div className="group/marquee relative mt-2 flex w-full justify-around gap-x-2 overflow-hidden">
      <div className="absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent md:w-16" />
      <div className="absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent md:w-16" />
      {skillItems.map((item, index) => (
        <div key={index} className="grid min-w-4 place-items-center">
          <Image src={item.icon} alt={item.name} width={28} height={28} />
        </div>
      ))}
    </div>
  );
};

export default Marquee;
