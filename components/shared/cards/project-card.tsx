import Link from "next/link";

import { cn } from "@/lib/utils";

const ProjectCard = ({
  href,
  title,
  description,
  className,
}: {
  href: string;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      className={cn(
        "anim group/project flex w-full flex-col gap-y-0.5 rounded-md bg-background py-2 text-sm hover:bg-accent hover:pl-3 sm:text-sm",
        className,
      )}
    >
      <h3 className="anim font-semibold text-foreground group-hover/project:text-accent-foreground">
        {title}
      </h3>
      <p className="anim line-clamp-1 font-mono text-sm text-muted-foreground">
        {description}
      </p>
    </Link>
  );
};

export default ProjectCard;
