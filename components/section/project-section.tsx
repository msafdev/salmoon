import TemplateCard from "@/components/shared/cards/template-card";
import Paragraph from "@/components/shared/paragraph";

import { templateItems } from "@/lib/assets";

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

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {templateItems.slice(0, 2).map((item, index) => (
          <TemplateCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
