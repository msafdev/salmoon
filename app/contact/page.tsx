import { Metadata } from "next";

import Paragraph from "@/components/shared/paragraph";

import ContactForm from "@/components/form/contact-form";
import SectionWrapper from "@/components/motion/section-wrapper";

export const metadata: Metadata = {
  title: "Contact",
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
