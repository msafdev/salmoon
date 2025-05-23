import { posts } from "#site/content";

import { Metadata } from "next";

import AltProjectCard from "@/components/shared/cards/alt-project-card";
import BlogCard from "@/components/shared/cards/blog-card";
import ProjectCard from "@/components/shared/cards/project-card";
import WorkCard from "@/components/shared/cards/work-card";
import Paragraph from "@/components/shared/paragraph";

import { projectItems, templateItems, workItems } from "@/lib/constants";
import { sortPosts } from "@/lib/velite";

export const metadata: Metadata = {
  title: "Archive",
};

export default async function Page() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

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
      <div className="flex w-full max-w-lg flex-col items-center gap-y-4">
        <Paragraph title="Featured posts" link href="/blog" />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {sortedPosts ? (
            sortedPosts
              .slice(0, 2)
              .map((item) => <BlogCard key={item.slug} {...item} />)
          ) : (
            <p>Nothing to see here</p>
          )}
        </div>
      </div>
      <div className="flex w-full max-w-lg flex-col items-center gap-y-4">
        <Paragraph title="Career path">
          <p>
            Beside working as a freelance developer, I have pursued various
            professional roles that have shaped my skills and expertise.
          </p>
          <p>
            Each step in my career has been a learning experience, driving me to
            grow and adapt in an ever-evolving industry.
          </p>
        </Paragraph>
        <div className="flex w-full flex-col">
          {workItems.map((item, index) => (
            <WorkCard {...item} key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-lg flex-col items-center gap-y-4">
        <Paragraph title="Side projects" />
        <div className="flex w-full flex-col">
          {projectItems.reverse().map((item, index) => (
            <AltProjectCard {...item} key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-lg flex-col items-center gap-y-4">
        <Paragraph title="Free templates" />
        <div className="flex w-full flex-col gap-y-4">
          {templateItems.map((item, index) => (
            <ProjectCard {...item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
