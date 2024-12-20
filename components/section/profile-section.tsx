import Image from "next/image";

import Ava from "@/public/assets/ava.webp";
import Map from "@/public/assets/map.webp";

const ProfileSection = () => {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-y-4">
      <div className="flex w-full items-center gap-x-4">
        <Image
          src={Ava}
          alt="Avatar of Salman"
          placeholder="blur"
          quality={75}
          width={40}
          height={40}
          className="overflow-hidden rounded-xl border object-cover"
        />

        <div className="flex flex-col gap-y-2">
          <h1 className="text-base font-semibold leading-none">
            Salman Alfarisi
          </h1>
          <p className="text-xs font-medium leading-none text-muted-foreground">
            Design Engineer{" "}
            <span className="hidden sm:inline-block">/ Full-Time Learner</span>
          </p>
        </div>
      </div>

      <p className="w-full text-xs text-muted-foreground md:text-sm">
        I am a design engineer based in Indonesia, specifically in Semarang. In
        my free time, I enjoy listening to music and exploring new places.
      </p>

      <div className="group/map relative aspect-[4/3] h-auto w-full overflow-hidden rounded-xl border-[1.5px] bg-zinc-400 shadow-sm xs:aspect-video">
        <Image
          src={Map}
          alt="Map of Semarang, Indonesia"
          fill
          className="anim object-cover group-hover/map:scale-100 dark:grayscale"
          quality={60}
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default ProfileSection;
