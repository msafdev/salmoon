import dynamic from "next/dynamic";

const HomeSection = dynamic(() => import("@/components/section/home-section"));
const ChatSection = dynamic(() => import("@/components/section/chat-section"));
const ProjectSection = dynamic(
  () => import("@/components/section/project-section")
);
const ActionSection = dynamic(() => import("@/components/section/cta-section"));

export default function Page() {
  return (
    <section className="flex flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24 px-4">
      <HomeSection />
      <ChatSection />
      <ProjectSection />
      <ActionSection />
    </section>
  );
}
