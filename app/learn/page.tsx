import { Metadata } from "next";

import MemoCard from "@/components/shared/cards/memo-card";
import Paragraph from "@/components/shared/paragraph";

import LearnSection from "@/components/section/learn-section";

export const metadata: Metadata = {
  title: "Learn",
};

export default function Page() {
  return (
    <section
      id="learn"
      className="flex flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex w-full max-w-lg flex-col gap-y-4">
        <Paragraph title="Learn">
          <p>
            Everything here is made by me, with care, to help you learn without
            the fluff or confusion.
          </p>
        </Paragraph>

        <LearnSection />
      </div>

      <MemoCard />
    </section>
  );
}
