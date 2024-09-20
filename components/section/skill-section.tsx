import Marquee from "@/components/shared/marquee";
import Paragraph from "@/components/shared/paragraph";

const SkillSection = () => {
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-y-4">
      <Paragraph title="Jack of all trades">
        <p>
          I have a diverse set of skills and tools. Over the years, I've worked
          across various technologies and tools.
        </p>
        <p>
          My curiosity and passion for building products drive me to
          continuously improve and expand my skill set.
        </p>
      </Paragraph>

      <div className="flex w-full">
        <Marquee />
      </div>
    </div>
  );
};

export default SkillSection;
