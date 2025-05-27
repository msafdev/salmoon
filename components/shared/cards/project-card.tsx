import { ArrowRight, Earth, Github, Globe } from "lucide-react";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
  href,
  title,
  img,
  git,
}: {
  href: string;
  title: string;
  img: StaticImport;
  git: string;
}) => {
  return (
    <div className="group/card relative w-full overflow-hidden">
      {img && (
        <div className="aspect-video h-auto w-full rounded-[12px] border-2 border-dashed p-1 sm:rounded-[16px] sm:p-2">
          <div className="relative h-full w-full overflow-hidden rounded-[8px]">
            <Image
              src={img}
              alt={`${title} showcase image.`}
              className="object-cover group-hover/card:grayscale-0 dark:grayscale"
              placeholder="blur"
              loading="lazy"
              fill
            />
          </div>
        </div>
      )}
      <div className="anim-slow absolute right-3 top-3 space-y-2 group-hover/card:md:top-6 md:-top-full md:right-6">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={title}
          className="grid size-7 place-items-center rounded-xl bg-primary/30 text-primary-foreground backdrop-blur dark:bg-accent/30 dark:text-accent-foreground"
        >
          <ArrowRight className="-rotate-45" size={16} />
        </Link>
        <Link
          href={git}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={title}
          className="grid size-7 place-items-center rounded-xl bg-primary/30 text-primary-foreground backdrop-blur dark:bg-accent/30 dark:text-accent-foreground"
        >
          <Github size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
