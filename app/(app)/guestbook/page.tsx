import { Metadata } from "next";

import { headers } from "next/headers";

import GuestbookSection from "@/components/section/guestbook-section";
import Paragraph from "@/components/shared/paragraph";
import SectionWrapper from "@/components/motion/section-wrapper";
import GuestbookForm from "@/components/form/guestbook-form";

import { createClient } from "@/supabase/server";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "My personal guestbook, leave me a trace of your visit.",
};

export default async function Page() {
  const headerList = headers();
  const userHeader = headerList.get("x-user");

  let user = null;

  if (userHeader) {
    try {
      user = JSON.parse(userHeader);
    } catch (e) {
      console.error("Failed to parse user header", e);
    }
  }

  if (!user) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  return (
    <SectionWrapper
      id="guestbook"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="w-full space-y-4">
        <Paragraph title="Guestbook">
          <p>
            Leave me a trace of your visit, could be a message, a quote, or a
            song you'd want me to listen to.
          </p>
        </Paragraph>
        <GuestbookForm user={user} />
      </div>
      <GuestbookSection user={user} />
    </SectionWrapper>
  );
}
