import { cn } from "@/lib/utils";

const WorkCard = ({
  title,
  company,
  duration,
  className,
}: {
  title: string;
  company: string;
  duration: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "anim group/work flex w-full flex-col gap-y-0.5 rounded-md bg-background py-2 text-sm sm:text-sm",
        className,
      )}
    >
      <h3 className="anim font-semibold text-foreground group-hover/work:text-accent-foreground">
        {company}
      </h3>
      <div className="flex w-full items-center justify-between gap-x-4">
        <p className="anim line-clamp-1 text-sm font-medium text-muted-foreground">
          {title}
        </p>
        <p className="anim line-clamp-1 font-mono text-sm text-muted-foreground">
          {duration}
        </p>
      </div>
    </div>
  );
};

export default WorkCard;
