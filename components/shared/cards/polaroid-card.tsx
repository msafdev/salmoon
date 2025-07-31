import Image, { StaticImageData } from "next/image";

import Scribble from "@/components/shared/scribble";

import { cn } from "@/lib/utils";

type PostcardProps = {
  src: StaticImageData;
  alt: string;
  title: string;
  className?: string;
};

export const PolaroidCard = ({ src, alt, className, title }: PostcardProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center bg-card p-1 text-card-foreground dark:bg-primary dark:text-primary-foreground",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        className="aspect-square h-auto w-full object-cover"
        sizes="(max-width: 640px) 44vw, (min-width: 641px) 33vw"
        aria-hidden="true"
        placeholder="blur"
      />
      <Scribble className="text-nowrap text-sm md:text-base">{title}</Scribble>
    </div>
  );
};
