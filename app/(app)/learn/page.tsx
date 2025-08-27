import { Metadata } from "next";

import MemoCard from "@/components/shared/cards/memo-card";
import LearnGroup from "@/components/shared/groups/learn-group";
import Paragraph from "@/components/shared/paragraph";

import SectionWrapper from "@/components/motion/section-wrapper";

export const metadata: Metadata = {
  title: "Learn",
  description: "Study something new (or maybe not) with me.",
};

export default function Page() {
  return (
    <SectionWrapper
      id="learn"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="w-full space-y-4">
        <Paragraph title="Learn">
          <p>
            Everything here is made by me, with care, to help you learn without
            the fluff or confusion.
          </p>
        </Paragraph>

        <LearnGroup />
      </div>

      <MemoCard />
    </SectionWrapper>
  );
}
