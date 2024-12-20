import { Spotlight } from "@/components/ui/spotlight";
import { Tilt } from "@/components/ui/tilt";
import Image from "next/image";

const MovieCard = ({ title, url }: { title: string; url: string }) => {
    return (
        <div className="w-full flex flex-col gap-y-2 group/section">
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
                className="group relative rounded w-full h-auto aspect-video overflow-hidden"
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
            <h3 className="text-foreground font-mono leading-none sm:leading-none text-xs sm:text-sm font-medium">{title}</h3>
        </div>
    );
};

export default MovieCard;
