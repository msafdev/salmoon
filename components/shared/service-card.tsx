import Meteors from "@/components/ui/meteor";

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  className,
}: {
  title: string;
  description: string;
  icon: React.ElementType; // Icon should be a component
  className?: string;
}) => {
  return (
    <div
      className={`group/card anim relative aspect-[5/6] h-auto w-full overflow-hidden rounded-xl border-[1.5px] bg-gradient-to-b from-zinc-200 to-zinc-300 shadow-sm dark:from-zinc-700 dark:to-zinc-800 xs:aspect-[10/9] ${className}`}
    >
      <Meteors number={10} />
      <div className="anim flex h-full w-full flex-col justify-between gap-y-2 overflow-hidden bg-card/90 p-4 group-hover/card:bg-card/70">
        <Icon className="anim size-4 shrink-0 rotate-0 text-foreground group-hover/card:-rotate-6 sm:size-5" />
        <div className="anim-slow">
          <p className="mb-1 hidden text-sm font-medium text-foreground xs:block">
            {title}
          </p>
          <p className="line-clamp-3 text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
