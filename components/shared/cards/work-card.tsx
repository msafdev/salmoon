import { cn } from "@/lib/utils";

const WorkCard = ({
  title,
  company,
  duration,
  className,
  country = "🇮🇩",
}: {
  title: string;
  company: string;
  duration: string;
  className?: string;
  country?: string;
}) => {
  return (
    <div
      className={cn(
        "anim group/work w-full space-y-0.5 py-2 text-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <h3 className="anim text-foreground group-hover/work:text-accent-foreground font-semibold">
          {company}
        </h3>
        {country}
      </div>
      <div className="flex w-full items-center justify-between gap-x-4">
        <p className="anim text-muted-foreground line-clamp-1 text-sm font-medium">
          {title}
        </p>
        <p className="anim text-muted-foreground xs:block line-clamp-1 hidden text-xs font-medium">
          {duration}
        </p>
      </div>
    </div>
  );
};

export default WorkCard;
