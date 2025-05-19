import ProjectCard from "@/components/shared/cards/project-card";
import Paragraph from "@/components/shared/paragraph";

import { recentProjects } from "@/lib/constants";

const ProjectSection = () => {
  return (
    <div className="flex w-full max-w-lg flex-col gap-y-4">
      <Paragraph title="Side projects" link href="/archive" />

      <div className="flex w-full flex-col">
        {[...recentProjects].reverse().map((item, index) => (
          <ProjectCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
