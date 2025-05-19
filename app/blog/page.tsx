import { Metadata } from "next";

import BlogSection from "@/components/section/blog-section";

import { getPosts } from "@/lib/gql";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <section
      id="blog"
      className="flex h-auto w-full grow flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex w-full max-w-lg flex-col items-center gap-y-4">
        <BlogSection items={posts?.reverse()} />
      </div>
    </section>
  );
}
