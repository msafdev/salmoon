import { posts } from "#site/content";

import { Metadata } from "next";

import PostGroup from "@/components/shared/groups/post-group";

import SectionWrapper from "@/components/motion/section-wrapper";

import { getAllTags, sortPosts, sortTagsByCount } from "@/velite/post";

export const metadata: Metadata = {
  title: "Post",
  description: "My journals. I talk about codes, designs, and jobs.",
};

export default async function Page() {
  const sortedPosts = sortPosts(posts);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <SectionWrapper
      id="post"
      className="flex flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <PostGroup items={sortedPosts} tags={sortedTags} />
    </SectionWrapper>
  );
}
