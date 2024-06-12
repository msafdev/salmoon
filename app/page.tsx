import HomeSection from "./_section/home-section";
import ChatSection from "./_section/chat-section";
import ProjectSection from "./_section/project-section";
import ActionSection from "./_section/cta-section";

export default function Page() {
  return (
    <section
      id="home"
      className="flex flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24 px-4"
    >
      <HomeSection />
      <ChatSection />
      <ProjectSection />
      <ActionSection />
    </section>
  );
}
