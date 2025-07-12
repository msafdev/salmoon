import ProjectCard from "@/components/shared/cards/project-card";
import Paragraph from "@/components/shared/paragraph";

import { templateItems } from "@/lib/constants";

const ProjectSection = () => {
  return (
    <div className="w-full space-y-4">
      <Paragraph title="Free templates" link href="/archive">
        <p>
          A collection of <span className="text-foreground">open-sourced</span>{" "}
          templates built for speed and simplicity. Browse and use them freely
          in your own projects.
        </p>
      </Paragraph>

      <div className="flex w-full flex-col gap-y-4">
        {templateItems.slice(0, 2).map((item, index) => (
          <ProjectCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
