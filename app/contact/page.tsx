import { Metadata } from "next";
import dynamic from "next/dynamic";

import Paragraph from "@/components/shared/paragraph";

import { LoaderIcon } from "@/components/lab/loader";

import SectionWrapper from "@/components/motion/section-wrapper";

const ContactForm = dynamic(() => import("@/components/form/contact-form"), {
  ssr: false,
  loading: () => <LoaderIcon />,
});

export const metadata: Metadata = {
  title: "Contact",
  description: "Need something? Don't be shy and hit me up.",
};

export default async function Page() {
  return (
    <SectionWrapper
      id="contact"
      className="relative flex h-auto grow flex-col items-center justify-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="Let's get in touch">
        <p className="mb-4">
          I'm a full-service multidisciplinary developer and designer. Let me
          bring your goals to life.
        </p>

        <ContactForm />
      </Paragraph>
    </SectionWrapper>
  );
}
