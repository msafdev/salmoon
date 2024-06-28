import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProjectCard from "../shared/project-card";

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
          <ProjectCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
