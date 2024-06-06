import dynamic from "next/dynamic";

const HomeSection = dynamic(() => import("@/app/_section/home-section"));
const ChatSection = dynamic(() => import("@/app/_section/chat-section"));
const ProjectSection = dynamic(
  () => import("@/app/_section/project-section")
);
const ActionSection = dynamic(() => import("@/app/_section/cta-section"));

export default function Page() {
  return (
    <section id="home" className="flex flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24 px-4">
      <HomeSection />
      <ChatSection />
      <ProjectSection />
      <ActionSection />
    </section>
  );
}
