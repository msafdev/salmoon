import ChatSection from "@/components/section/chat-section";
import HomeSection from "@/components/section/home-section";
import ProjectSection from "@/components/section/project-section";

export default function Page() {
  return (
    <section className="flex flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24 px-4">
      <HomeSection />
      <ChatSection />
      <ProjectSection />
    </section>
  );
}
