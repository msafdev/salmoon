import { Metadata } from "next";

import BlogCard from "@/components/shared/cards/blog-card";
import ProjectCard from "@/components/shared/cards/project-card";
import WorkCard from "@/components/shared/cards/work-card";
import Paragraph from "@/components/shared/paragraph";

import { projectItems, templateItems, workItems } from "@/lib/constants";
import { getPosts } from "@/lib/gql";

export const metadata: Metadata = {
  title: "Archive",
};

export default async function Page() {
  const posts = await getPosts();

  const recentPosts = posts ? posts.slice(0, 4) : [];

  return (
    <section
      id="archive"
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My grand archive">
        <p>
          I am a sentimental person. I keep records of my projects, blogs, and
          other things that I have done. I like to look back and see how much I
          have grown as a person.
        </p>
      </Paragraph>
      <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
        <Paragraph title="What i wrote" link href="/blog" />
        <div className="flex w-full flex-col">
          {recentPosts &&
            recentPosts.map((item, index) => (
              <BlogCard
                slug={item.node.slug}
                title={item.node.title}
                updatedAt={item.node.updatedAt}
                key={index}
              />
            ))}
        </div>
      </div>
      <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
        <Paragraph title="Career path" />
        <div className="flex w-full flex-col">
          {workItems.map((item, index) => (
            <WorkCard {...item} key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
        <Paragraph title="Side projects" />
        <div className="flex w-full flex-col">
          {projectItems.reverse().map((item, index) => (
            <ProjectCard {...item} key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
        <Paragraph title="Free templates" />
        <div className="flex w-full flex-col">
          {templateItems.map((item, index) => (
            <ProjectCard {...item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
