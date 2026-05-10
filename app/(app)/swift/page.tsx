import { Metadata } from "next";

import SwiftGroup from "@/components/shared/groups/swift-group";
import Paragraph from "@/components/shared/paragraph";

import SectionWrapper from "@/components/motion/section-wrapper";

export const metadata: Metadata = {
  title: "Swift UI",
  description:
    "A personal library of SwiftUI components and experiments, built to be customized and dropped straight into your Xcode projects.",
};

export default function Page() {
  return (
    <SectionWrapper
      id="swift"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="w-full space-y-8">
        <Paragraph title="Swift UI">
          <p>
            Welcome to my personal SwiftUI workshop. This is a growing
            collection of components, patterns, and UI experiments I've built
            over time.
          </p>
          <p>
            Each piece is designed to be clean and modular, making it easy to
            drop straight into your own Xcode projects.
          </p>
        </Paragraph>

        <SwiftGroup />
      </div>
    </SectionWrapper>
  );
}
