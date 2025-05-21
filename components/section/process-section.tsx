import ProjectCard from "@/components/shared/cards/project-card";
import Paragraph from "@/components/shared/paragraph";

import { processItems } from "@/lib/constants";

const ProcessSection = () => {
  return (
    <div className="flex w-full max-w-lg flex-col gap-y-4">
      <Paragraph title="My process">
        A step-by-step approach to building high-quality web applications. Each
        phase is tailored to deliver efficient and scalable results.
      </Paragraph>

      <div className="flex w-full flex-col gap-y-6">
        {processItems.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-6 gap-4">
              <div className="hidden sm:block">
                <span className="text-sm font-medium text-muted-foreground">
                  0{index + 1}.
                </span>
              </div>
              <div className="col-span-full flex flex-col gap-y-2 sm:col-span-5">
                <h3 className="text-base font-semibold text-foreground">
                  <span className="mr-2 text-sm font-medium text-muted-foreground sm:hidden">
                    0{index + 1}.
                  </span>
                  {item.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSection;
