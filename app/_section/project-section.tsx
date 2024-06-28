import Link from "next/link";

import { Button } from "@/components/ui/button";
import { projectItems } from "@/lib/constants";

import { MoveRight } from "lucide-react";

const ProjectSection = () => {
  return (
    <div className="flex flex-col w-full gap-y-4 max-w-xl md:p-4">
      <div className="flex items-center w-full gap-x-4 justify-between">
        <h2 className="font-semibold text-base sm:text-lg md:text-xl">
          Recently launched
        </h2>

        <Button size={"icon"} variant={"ghost"}>
          <Link href="/project" aria-label="Go to /project">
            <MoveRight size={24} />
          </Link>
        </Button>
      </div>

      {/* Project Cards */}
      <div className="w-full flex flex-col gap-y-1">
        {[...projectItems].reverse().map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="flex flex-col w-full bg-background hover:bg-accent anim group/project py-2 rounded-lg"
          >
            <h3 className="text-foreground group-hover/project:text-accent-foreground group-hover/project:pl-4 anim-fast font-semibold text-sm sm:text-base">
              {item.title}
            </h3>
            <p className="text-muted-foreground font-mono text-xs sm:text-sm anim-fast group-hover/project:pl-4">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
