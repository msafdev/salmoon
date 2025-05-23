import Accordion from "@/components/motion/accordion";

const FaqSection = () => {
  return (
    <div className="flex w-full flex-col gap-y-2.5">
      <Accordion title="How do you work?">
        <code>
          I work completely remote, using Slack, Jira, and ClickUp for
          communication and project management.
        </code>
      </Accordion>
      <Accordion title="How long does it take to finish a project?">
        <code>
          It depends on the project scope and complexity. But usually, I can
          finish a project in 2-3 weeks for simpler websites.
        </code>
      </Accordion>
      <Accordion title="Do you provide maintenance?">
        <code>
          Absolutely! I provide maintenance for all projects I have done for 3
          months, free of charge.
        </code>
      </Accordion>
      <Accordion title="What stack do you use?">
        <code>
          Next, Nuxt, or Gatsby for frontend, and Node, Django, or Ruby on Rails
          for backend. Hygraph and Supabase for database.
        </code>
      </Accordion>
      <Accordion title="How do you handle payments?">
        <code>
          I use Wise for international clients and bank transfer for local ones
          (ID).
        </code>
      </Accordion>
    </div>
  );
};
export default FaqSection;
