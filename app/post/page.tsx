import { posts } from "#site/content";
import { getAllTags, sortTagsByCount } from "@/velite/post";

import { Metadata } from "next";

import BlogSection from "@/components/section/post-section";

export const metadata: Metadata = {
  title: "Post",
};

export default async function Page() {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <section
      id="post"
      className="flex h-auto w-full grow flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex w-full max-w-lg flex-col items-center gap-y-4">
        <BlogSection items={posts?.reverse()} tags={sortedTags} />
      </div>
    </section>
  );
}
