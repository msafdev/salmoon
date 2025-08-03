import ClientSection from "@/components/section/client-section";
import ProcessSection from "@/components/section/process-section";
import ProfileSection from "@/components/section/profile-section";
import ProjectSection from "@/components/section/project-section";

import SectionWrapper from "@/components/motion/section-wrapper";

export default function Page() {
  return (
    <SectionWrapper
      id="home"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <ProfileSection />
      <ClientSection />
      <ProcessSection />
      <ProjectSection />
    </SectionWrapper>
  );
}
