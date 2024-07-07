import Marquee from "@/components/shared/marquee";
import Paragraph from "@/components/shared/paragraph";

const SkillSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-y-4">
      <Paragraph title="Jack of all trades.">
        <p>
          I have a diverse set of skills and tools. Over the years, I've worked
          across various technologies, but mostly with Next.js, Supabase, and
          Tailwind CSS.
        </p>
      </Paragraph>

      {/* Second Chat */}
      <div className="flex w-full">
        <Marquee />
      </div>
    </div>
  );
};

export default SkillSection;
