import ProjectCard from "@/components/shared/cards/project-card";
import Paragraph from "@/components/shared/paragraph";

import { templateItems } from "@/lib/constants";

const ProjectSection = () => {
  return (
    <div className="flex w-full max-w-lg flex-col gap-y-4">
      <Paragraph title="Free templates" link href="/archive">
        A collection of open-sourced templates built for speed and simplicity.
        Browse and use them freely in your own projects.
      </Paragraph>

      <div className="flex w-full flex-col gap-y-6">
        {templateItems.map((item, index) => (
          <ProjectCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
