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
        <Paragraph title="Learn with me">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
            debitis ipsa quasi magnam suscipit ratione obcaecati!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus, voluptatum ab.
          </p>
        </Paragraph>

        <LearnSection />
      </div>

      <MemoCard />
    </section>
  );
}
