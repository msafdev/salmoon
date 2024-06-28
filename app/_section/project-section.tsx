import Link from "next/link";

import { Button } from "@/components/ui/button";
import { projectItems } from "@/lib/constants";

import { MoveRight } from "lucide-react";

const ProjectSection = () => {
  return (
    <div className="flex flex-col w-full gap-y-4 max-w-2xl md:p-4">
      <div className="flex items-center w-full gap-x-4 justify-between">
        <h2 className="font-semibold text-base sm:text-lg md:text-xl">
          Recently launched
        </h2>

        <Button size={"icon"} variant={"ghost"}>
          <Link href="/project" aria-label="Go to /project">
            <MoveRight size={20} />
          </Link>
        </Button>
      </div>

      {/* Project Cards */}
      <div className="w-full flex flex-col">
        {[...projectItems].reverse().map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="flex flex-col w-full bg-background hover:bg-accent anim group/project py-2 hover:px-4 rounded-lg"
          >
            <h3 className="text-foreground group-hover/project:text-accent-foreground anim font-semibold text-sm sm:text-base">
              {item.title}
            </h3>
            <p className="text-muted-foreground font-mono text-xs sm:text-sm">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
