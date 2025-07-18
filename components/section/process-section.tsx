import Paragraph from "@/components/shared/paragraph";

import ProcessGroup from "@/components/shared/group/process-group";

const ProcessSection = () => {
  return (
    <div className="space-y-4 w-full">
      <Paragraph title="My process">
        <p>
          A step-by-step approach to building high-quality web applications.
          Using the <span className="text-foreground">4D</span> method, each
          phase is tailored to deliver efficient and scalable results.
        </p>
      </Paragraph>

      <ProcessGroup />
    </div>
  );
};

export default ProcessSection;
