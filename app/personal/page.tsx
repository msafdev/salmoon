import { Metadata } from "next";

import QuoteCard from "@/components/shared/cards/quote-card";
import MovieGroup from "@/components/shared/groups/movie-group";
import TrackGroup from "@/components/shared/groups/track-group";
import Paragraph from "@/components/shared/paragraph";

import SectionWrapper from "@/components/motion/section-wrapper";

export const metadata: Metadata = {
  title: "Personal",
  description: "Get to know me a little bit more (just enough).",
};

export default async function Page() {
  return (
    <SectionWrapper
      id="personal"
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
      <div className="w-full space-y-4">
        <Paragraph title="Top Tracks">
          <p>
            I listen to a lot of music, and I like to keep track of the songs
            that I've been playing the most.
          </p>
        </Paragraph>
        <TrackGroup />
      </div>
      <div className="w-full space-y-4">
        <Paragraph title="Top Movies">
          <p>
            Movies have a way of transporting us to different worlds, making us
            laugh, cry, and everything in between. Here are some of the films
            that have left a lasting impression on me.
          </p>
        </Paragraph>
        <MovieGroup />
      </div>
    </SectionWrapper>
  );
}
