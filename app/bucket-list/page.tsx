import { Metadata } from "next";

import BucketGroup from "@/components/shared/groups/bucket-group";
import Paragraph from "@/components/shared/paragraph";

import SectionWrapper from "@/components/motion/section-wrapper";

export const metadata: Metadata = {
  title: "Bucket List",
  description:
    "My bucket list, a collection of things I want to do before I kick the bucket.",
};

export default async function Page() {
  return (
    <SectionWrapper
      id="bucket-list"
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="w-full space-y-4">
        <Paragraph title="My bucket list">
          <p>
            This list is a way for me to keep track of my dreams and
            aspirations, and to remind myself of the things that matter most to
            me.
          </p>
        </Paragraph>
        <BucketGroup />
      </div>
    </SectionWrapper>
  );
}
