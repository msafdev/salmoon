import MentorSection from "@/components/section/mentor-section";

import SectionWrapper from "@/components/motion/section-wrapper";

export default function Page() {
  return (
    <SectionWrapper
      id="service"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <MentorSection />
    </SectionWrapper>
  );
}
