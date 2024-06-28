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
      className="flex flex-col w-full bg-background hover:bg-accent anim group/project py-2 rounded-lg"
    >
      <h3 className="text-foreground group-hover/project:text-accent-foreground group-hover/project:pl-4 anim-slow font-semibold text-sm sm:text-base">
        {title}
      </h3>
      <p className="text-muted-foreground line-clamp-1 font-mono text-xs sm:text-sm anim-slow group-hover/project:pl-4">
        {description}
      </p>
    </Link>
  );
};

export default ProjectCard;
