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
        <h3 className="anim font-semibold text-foreground group-hover/work:text-accent-foreground">
          {company}
        </h3>
        {country}
      </div>
      <div className="flex w-full items-center justify-between gap-x-4">
        <p className="anim line-clamp-1 text-sm font-medium text-muted-foreground">
          {title}
        </p>
        <p className="anim line-clamp-1 hidden text-xs font-medium text-muted-foreground xs:block">
          {duration}
        </p>
      </div>
    </div>
  );
};

export default WorkCard;
