import { MoveRight } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { projectItems } from "@/lib/constants";

import ProjectCard from "../shared/project-card";

const ProjectSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-y-4 md:p-4">
      <div className="flex w-full items-center justify-between gap-x-4">
        <h2 className="text-base font-semibold sm:text-lg md:text-xl">
          Recently launched.
        </h2>

        <Button size={"icon"} variant={"ghost"}>
          <Link href="/archive" aria-label="Go to /archive">
            <MoveRight size={24} />
          </Link>
        </Button>
      </div>

      {/* Project Cards */}
      <div className="flex w-full flex-col gap-y-1">
        {[...projectItems].reverse().map((item, index) => (
          <ProjectCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
