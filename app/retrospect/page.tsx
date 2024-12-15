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
      <Paragraph title="Where it all started" from="2020" to="2023">
        <p>
          I started programming from when I entered my college, Diponegoro
          University . Back then, I used to be so anxious deciding my path,
          trying Java, Python, C++, and even ASM.
        </p>
        <p>
          Then, I found something that I really love: website development. I
          started to learn HTML, CSS, JS, and ofc React. I also learned how to
          build a simple server using Node.js.
        </p>
      </Paragraph>
      <Paragraph title="Present time" from="2024" to="present">
        <p>
          Fast forward to today, I have been working as a fullstack software
          engineer, settling on Next.js, Tailwind, GraphQL, and PostgreSQL as my
          main stack.
        </p>
        <p>
          Now, I'm a self-proclaimed design engineer, focusing on creating
          seamless user experiences by adding interactivity to various
          interfaces.
        </p>
      </Paragraph>
      <Paragraph title="Any questions?">
        <FaqSection />
      </Paragraph>
    </section>
  );
}
