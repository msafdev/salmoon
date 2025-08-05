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
        "bg-card text-card-foreground dark:bg-primary dark:text-primary-foreground relative flex h-fit w-fit flex-col items-center p-1",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        className="aspect-square h-auto w-full object-cover"
        sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 10vw"
        aria-hidden="true"
        placeholder="blur"
      />
      <Scribble className="text-sm text-nowrap md:text-base">{title}</Scribble>
    </div>
  );
};
