import { Metadata } from "next";

import Paragraph from "@/components/shared/paragraph";

import FaqSection from "@/components/section/faq-section";

export const metadata: Metadata = {
  title: "Retrospect",
};

export default function Page() {
  return (
    <section
      id="retrospect"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="Where it all started" from="2020" to="2021">
        <p>TBA</p>
      </Paragraph>
      <Paragraph title="Slow but sure" from="2021" to="2022">
        <p>TBA</p>
      </Paragraph>
      <Paragraph title="Breakthrough" from="2022" to="2023">
        <p>TBA</p>
      </Paragraph>
      <Paragraph title="Build, build, and build" from="2023" to="2024">
        <p>TBA</p>
      </Paragraph>
      <Paragraph title="Any questions?">
        <FaqSection />
      </Paragraph>
    </section>
  );
}
