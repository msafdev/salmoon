import { createClient } from "@/supabase/server";

import Paragraph from "@/components/shared/paragraph";

import GuestbookForm from "@/components/form/guestbook-form";
import GuestbookSection from "@/components/section/guestbook-section";

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
