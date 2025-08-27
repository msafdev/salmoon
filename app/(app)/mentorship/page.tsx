import { Metadata } from "next";

import MentorSection from "@/components/section/mentor-section";

import SectionWrapper from "@/components/motion/section-wrapper";

export const metadata: Metadata = {
  title: "Mentorship",
  description: "Tailored guidance to help you grow your skills and career.",
};

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
