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
      className={`group/card anim aspect-[5/6] h-auto w-full rounded-xl bg-gradient-to-b from-zinc-200 to-zinc-300 p-[1px] dark:from-zinc-700 dark:to-zinc-800 xs:aspect-[10/9] ${className}`}
    >
      <div className="anim flex h-full w-full flex-col justify-between gap-y-2 overflow-hidden rounded-[11px] bg-card/90 p-4 group-hover/card:bg-card/70">
        <Icon className="anim size-4 shrink-0 rotate-0 text-foreground group-hover/card:-rotate-6 sm:size-5" />
        <div className="anim-slow">
          <p className="mb-1 text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
