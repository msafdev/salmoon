import { createClient } from "@/supabase/server";

import { Suspense } from "react";

import { Metadata } from "next";
import dynamic from "next/dynamic";

import Paragraph from "@/components/shared/paragraph";

// Optimize dynamic imports with preloading and more specific loading options
const GuestbookForm = dynamic(
  () => import("@/components/form/guestbook-form"),
  {
    ssr: false,
    loading: () => <div className="h-20 animate-pulse bg-muted"></div>,
  },
);

const GuestbookSection = dynamic(
  () => import("@/components/section/guestbook-section"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-fit w-full max-w-sm flex-col gap-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex animate-pulse flex-col gap-y-3">
            <div className="flex w-full items-center gap-x-4">
              <div className="size-8 shrink-0 rounded-sm bg-muted" />
              <div className="flex w-full flex-col justify-center gap-y-1 self-stretch py-[2px]">
                <div className="h-3 w-1/2 rounded-sm bg-muted" />
                <div className="h-3 w-1/3 rounded-sm bg-muted" />
              </div>
            </div>
            <div className="h-[14px] w-full rounded-sm bg-muted md:h-[18px]" />
          </div>
        ))}
      </div>
    ),
  },
);

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Msafdev's personal guestbook, leave me a trace of your visit.",
};

const Page = async () => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();

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
        <GuestbookForm user={userData.user} />
      </div>
      <Suspense
        fallback={
          <div className="flex h-fit w-full max-w-sm flex-col gap-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex animate-pulse flex-col gap-y-3">
                <div className="flex w-full items-center gap-x-4">
                  <div className="size-8 shrink-0 rounded-sm bg-muted" />
                  <div className="flex w-full flex-col justify-center gap-y-1 self-stretch py-[2px]">
                    <div className="h-3 w-1/2 rounded-sm bg-muted" />
                    <div className="h-3 w-1/3 rounded-sm bg-muted" />
                  </div>
                </div>
                <div className="h-[14px] w-full rounded-sm bg-muted md:h-[18px]" />
              </div>
            ))}
          </div>
        }
      >
        <GuestbookSection />
      </Suspense>
    </section>
  );
};

export default Page;
