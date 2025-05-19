import Image from "next/image";

import { Spotlight } from "@/components/ui/spotlight";
import { Tilt } from "@/components/ui/tilt";

const MovieCard = ({ title, url }: { title: string; url: string }) => {
  return (
    <div className="group/section flex w-full flex-col gap-y-2">
      <Tilt
        rotationFactor={6}
        isRevese
        style={{
          transformOrigin: "center center",
        }}
        springOptions={{
          stiffness: 26.7,
          damping: 4.1,
          mass: 0.2,
        }}
        className="group relative aspect-video h-auto w-full overflow-hidden rounded"
      >
        <Spotlight
          className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
          size={248}
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
        />
        <Image
          src={url}
          alt={title}
          fill
          className="object-cover grayscale duration-700 group-hover:grayscale-0"
        />
      </Tilt>
      <h3 className="font-mono text-sm font-medium leading-none text-foreground sm:text-sm sm:leading-none">
        {title}
      </h3>
    </div>
  );
};

export default MovieCard;
