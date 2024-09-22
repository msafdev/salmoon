import { createClient } from "@/supabase/server";

import { Metadata } from "next";
import dynamic from "next/dynamic";

import Paragraph from "@/components/shared/paragraph";

const GuestbookForm = dynamic(
  () => import("@/components/form/guestbook-form"),
  { ssr: false },
);
const GuestbookSection = dynamic(
  () => import("@/components/section/guestbook-section"),
  { ssr: false },
);

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Msafdev's personal guestbook, leave me a trace of your visit.",
};

const Page = async () => {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  return (
    <section
      id="guestbook"
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex flex-col gap-y-4">
        <Paragraph title="Guestbook">
          <p>
            Leave me a trace of your visit, could be a message, a quote, or a
            song you'd want me to listen to.
          </p>
        </Paragraph>
        <GuestbookForm user={user.user} />
      </div>
      <GuestbookSection />
    </section>
  );
};

export default Page;
