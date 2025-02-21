import ActionSection from "@/components/section/cta-section";
import HomeSection from "@/components/section/home-section";
import LabSection from "@/components/section/lab-section";
import ProjectSection from "@/components/section/project-section";
import ServiceSection from "@/components/section/service-section";
import SkillSection from "@/components/section/skill-section";

export default function Page() {
  return (
    <section
      id="home"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <HomeSection />
      <ServiceSection />
      <SkillSection />
      <LabSection />
      <ProjectSection />
      <ActionSection />
    </section>
  );
}
