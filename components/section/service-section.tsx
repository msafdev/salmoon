import { Component, Terminal } from "lucide-react";

const ServiceSection = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="grid w-full grid-cols-2 gap-4">
        <div className="group/card anim col-span-full aspect-[16/9] h-auto w-full rounded-xl bg-gradient-to-b from-zinc-200 to-zinc-300 p-[1px] dark:from-zinc-700 dark:to-zinc-800 xs:col-span-1 xs:aspect-[10/11]">
          <div className="anim relative h-full w-full overflow-hidden rounded-[11px] bg-card/90 p-4 group-hover/card:bg-card/70">
            <Terminal className="anim absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rotate-0 text-foreground group-hover/card:bottom-0 group-hover/card:left-4 group-hover/card:top-4 group-hover/card:size-5 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:-rotate-6" />
            <div className="anim-slow absolute -bottom-full left-0 px-4 pb-4 group-hover/card:bottom-0 group-hover/card:opacity-100">
              <p className="mb-1 text-sm font-medium text-foreground">
                Development
              </p>
              <p className="text-xs text-muted-foreground">
                Website, web app, mobile app, you name it.
              </p>
            </div>
          </div>
        </div>
        <div className="group/card anim col-span-full aspect-[16/9] h-auto w-full rounded-xl bg-gradient-to-b from-zinc-200 to-zinc-300 p-[1px] dark:from-zinc-700 dark:to-zinc-800 xs:col-span-1 xs:aspect-[10/11]">
          <div className="anim relative h-full w-full overflow-hidden rounded-[11px] bg-card/90 p-4 group-hover/card:bg-card/70">
            <Component className="anim absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rotate-0 text-foreground group-hover/card:bottom-0 group-hover/card:left-4 group-hover/card:top-4 group-hover/card:size-5 group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:-rotate-6 sm:group-hover/card:left-5 sm:group-hover/card:top-5" />
            <div className="anim-slow absolute -bottom-full left-0 px-4 pb-4 group-hover/card:bottom-0 group-hover/card:opacity-100">
              <p className="mb-1 text-sm font-medium text-foreground">Design</p>
              <p className="text-xs text-muted-foreground">
                Fast, reliable, and interactive design in mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceSection;
