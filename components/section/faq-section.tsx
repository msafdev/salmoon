import Accordion from "@/components/shared/accordion";
import Paragraph from "@/components/shared/paragraph";

const FaqSection = () => {
  return (
    <div className="flex w-full flex-col gap-y-3">
      <Accordion title="How do you work?">
        <code>
          I work completely remotely, using Slack, Jira, ClickUp, and Meet for
          communication.
        </code>
      </Accordion>
      <Accordion title="How long does it take to finish a project?">
        <code>
          Well, it depends on the project scope and complexity. But usually, I
          can finish a project in 2-3 weeks for a simple website.
        </code>
      </Accordion>
      <Accordion title="Do you provide maintenance?">
        <code>
          Absolutely! I provide maintenance for all projects I have done for 3
          months, free of charge.
        </code>
      </Accordion>
    </div>
  );
};
export default FaqSection;
