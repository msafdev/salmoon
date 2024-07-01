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
      className={cn(
        "anim group/project flex w-full flex-col rounded-sm bg-background py-2 text-sm hover:bg-accent hover:pl-3 sm:text-base",
        className,
      )}
    >
      <h3 className="anim font-semibold text-foreground group-hover/project:text-accent-foreground">
        {title}
      </h3>
      <p className="anim line-clamp-1 font-mono text-xs text-muted-foreground">
        {description}
      </p>
    </Link>
  );
};

export default ProjectCard;
