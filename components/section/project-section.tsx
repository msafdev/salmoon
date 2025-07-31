import TemplateCard from "@/components/shared/cards/template-card";
import Paragraph from "@/components/shared/paragraph";

import { templateItems } from "@/lib/assets";

const ProjectSection = () => {
  return (
    <div className="w-full space-y-4">
      <Paragraph title="Side Projects" link href="/archive">
        <p>
          A collection of <span className="text-foreground">open-sourced</span>{" "}
          tools, experiments, and templates I've built over the years. Do check
          them out.
        </p>
      </Paragraph>

      <div className="grid w-full grid-cols-2 gap-4 xs:grid-cols-1 md:grid-cols-2">
        {templateItems.slice(0, 2).map((item, index) => (
          <TemplateCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
