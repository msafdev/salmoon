"use client";

import { BadgeCheck } from "lucide-react";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function ContactSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <section
      id="contact-success"
      className="relative flex h-auto grow flex-col items-center justify-center gap-y-12 px-4 py-24 text-center md:gap-y-16"
    >
      <div className="flex flex-col items-center">
        <BadgeCheck className="mb-2 size-14 fill-green-500 text-background" />
        <h1 className="mb-2 text-xl font-semibold md:text-2xl">
          Meeting Scheduled
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground md:text-base">
          Thank you for reaching out. I've scheduled your meeting and will get
          in touch shortly to follow up.
        </p>
      </div>
    </section>
  );
}
