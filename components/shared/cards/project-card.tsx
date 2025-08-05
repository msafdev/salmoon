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
        "anim group/project bg-background hover:bg-accent flex w-full flex-col gap-y-0.5 rounded-md py-2 text-sm hover:pl-3 sm:text-sm",
        className,
      )}
    >
      <h3 className="anim text-foreground group-hover/project:text-accent-foreground font-semibold">
        {title}
      </h3>
      <p className="anim text-muted-foreground line-clamp-1 text-sm font-medium">
        {description}
      </p>
    </Link>
  );
};

export default ProjectCard;
