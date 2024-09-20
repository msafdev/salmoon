import { Metadata } from "next";

import QuoteCard from "@/components/shared/cards/quote-card";
import TrackCard from "@/components/shared/cards/track-card";
import Paragraph from "@/components/shared/paragraph";

export const metadata: Metadata = {
  title: "Secret",
};

export default async function Page() {
  return (
    <section
      id="secret"
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="Why are you here?">
        <p>
          If you're hoping to find some secret API keys, I'm sorry to disappoint
          you. This page is just a place where I can put some of my more
          personal things.
        </p>
      </Paragraph>
      <QuoteCard />
      <div className="flex w-full max-w-sm flex-col gap-y-4">
        <Paragraph title="Top tracks">
          <p>
            I listen to a lot of music, and I like to keep track of the songs
            that I've been playing the most.
          </p>
        </Paragraph>
        <TrackCard />
      </div>
    </section>
  );
}
