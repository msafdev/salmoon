import ActionSection from "@/components/section/cta-section";
import ProfileSection from "@/components/section/profile-section";
import ProjectSection from "@/components/section/project-section";
import SkillSection from "@/components/section/skill-section";

export default function Page() {
  return (
    <section
      id="home"
      className="flex flex-col items-center gap-y-8 px-4 md:gap-y-10 lg:gap-y-12"
    >
      <ProfileSection />
      <SkillSection />
      <ProjectSection />
      <ActionSection />
    </section>
  );
}
