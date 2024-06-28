import HomeSection from "@/components/section/home-section";
import ChatSection from "@/components/section/chat-section";
import LabSection from "@/components/section/lab-section";
import ProjectSection from "@/components/section/project-section";
import ActionSection from "@/components/section/cta-section";

export default function Page() {
  return (
    <section
      id="home"
      className="flex flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24 px-4"
    >
      <HomeSection />
      <ChatSection />
      <LabSection />
      <ProjectSection />
      <ActionSection />
    </section>
  );
}
