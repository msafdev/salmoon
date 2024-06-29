import Link from "next/link";

const ProjectCard = ({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="anim group/project flex w-full flex-col rounded-lg bg-background py-2 hover:bg-accent"
    >
      <h3 className="anim-slow text-sm font-semibold text-foreground group-hover/project:pl-4 group-hover/project:text-accent-foreground sm:text-base">
        {title}
      </h3>
      <p className="anim-slow line-clamp-1 font-mono text-xs text-muted-foreground group-hover/project:pl-4 sm:text-sm">
        {description}
      </p>
    </Link>
  );
};

export default ProjectCard;
