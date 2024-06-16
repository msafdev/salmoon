import Link from "next/link";

import { Button } from "@/components/ui/button";
import { projectItems } from "@/lib/constants";

import ProjectCard from "@/components/shared/project-card";

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
      <div className="w-full grid sm:grid-cols-2 gap-4">
        {projectItems.map((items, index) => (
          <div key={index}>
            <ProjectCard
              title={items.title}
              stack={items.stack}
              image={items.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
