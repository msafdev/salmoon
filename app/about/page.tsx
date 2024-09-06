import { Metadata } from "next";

import Paragraph from "@/components/shared/paragraph";

import ProfileSection from "@/components/section/profile-section";

export const metadata: Metadata = {
  title: "About",
};

export default function Page() {
  return (
    <section
      id="about"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <ProfileSection />
      <Paragraph title="A brief summary">
        <p>
          I’m Salman, a fullstack software engineer with almost 2 years of
          experience. I build user-centric products through creative development
          and seamless interactions.
        </p>
        <p>
          Passionate about both the technical and artistic side of thing, I
          strive to create digital experiences that have meaning to each of
          their iteration.
        </p>
      </Paragraph>
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
          Fast forward to today, I have been working as a fullstack software,
          settling on Next.js, Tailwind, GraphQL, and PostgreSQL as my main
          stack.
        </p>
        <p>
          Now, I am continuing to learn new things, and I am excited to see what
          the AI-pocalypse will bring to me in the future.
        </p>
      </Paragraph>
    </section>
  );
}
