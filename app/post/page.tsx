import { posts } from "#site/content";
import { getAllTags, sortTagsByCount } from "@/velite/post";

import { Metadata } from "next";

import SectionWrapper from "@/components/motion/section-wrapper";
import PostGroup from "@/components/section/post-section";

export const metadata: Metadata = {
  title: "Post",
};

export default async function Page() {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <SectionWrapper
      id="post"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="w-full space-y-4">
        <PostGroup items={posts?.reverse()} tags={sortedTags} />
      </div>
    </SectionWrapper>
  );
}
