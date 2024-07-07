import Paragraph from "@/components/shared/paragraph";
import ProjectCard from "@/components/shared/project-card";

import { recentProjects } from "@/lib/items";

const ProjectSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-y-4">
      <Paragraph title="Recently launched" link href="/archive" />

      {/* Project Cards */}
      <div className="flex w-full flex-col">
        {[...recentProjects].reverse().map((item, index) => (
          <ProjectCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
