import ProcessGroup from "@/components/shared/groups/process-group";
import Paragraph from "@/components/shared/paragraph";

const ProcessSection = () => {
  return (
    <div className="w-full space-y-4">
      <Paragraph title="My process">
        <p>
          A step-by-step approach to building high-quality web applications.
          Using the <span className="font-medium text-foreground">4D</span>{" "}
          method, each phase is tailored to deliver efficient and scalable
          results.
        </p>
      </Paragraph>

      <ProcessGroup />
    </div>
  );
};

export default ProcessSection;
