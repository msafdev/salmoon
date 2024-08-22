import Image from "next/image";

import Ava from "@/public/assets/ava.webp";
import Map from "@/public/assets/map.webp";

const ProfileSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
      <div className="flex w-full items-center gap-x-4">
        <Image
          src={Ava}
          alt="Avatar of Salman"
          placeholder="blur"
          quality={75}
          width={40}
          height={40}
          className="overflow-hidden rounded-full border object-cover"
        />

        <div className="flex flex-col gap-y-2">
          <h3 className="text-base font-bold leading-none">Salman Alfarisi</h3>
          <p className="text-xs font-medium leading-none text-muted-foreground">
            Creative Developer{" "}
            <span className="hidden sm:inline-block">/ Full-Time Learner</span>
          </p>
        </div>
      </div>

      <p className="w-full text-sm text-muted-foreground md:text-base">
        I help humans make their ideas come to life through websites and
        applications. My goal is to create digital experiences that not only
        meet but exceed expectations.
      </p>

      <p className="w-full text-sm text-muted-foreground md:text-base">
        I am based in Indonesia, specifically in Semarang. In my free time, I
        enjoy listening to music and exploring new places.
      </p>

      <div className="group/map relative aspect-[6/5] h-auto w-full overflow-hidden rounded-xl border bg-zinc-200 shadow-sm xs:aspect-video">
        <Image
          src={Map}
          alt="Map of Semarang, Indonesia"
          fill
          className="anim scale-110 object-cover brightness-95 group-hover/map:scale-100"
          quality={50}
          priority={true}
          placeholder="blur"
        />
        <div className="absolute left-1/2 top-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />
          <div className="relative size-full rounded-full bg-emerald-500" />
        </div>

        {/* This is a gradient overlaying each side of the image. 
        TO DO: Modify the gradient (maybe use backgroundImage instead of divs?). */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-200 to-transparent opacity-75 transition-all duration-500 group-hover/map:h-12"></div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-200 to-transparent opacity-75 transition-all duration-500 group-hover/map:h-12"></div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-200 to-transparent opacity-75 transition-all duration-500 group-hover/map:w-12"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-200 to-transparent opacity-75 transition-all duration-500 group-hover/map:w-12"></div>
      </div>
    </div>
  );
};

export default ProfileSection;
