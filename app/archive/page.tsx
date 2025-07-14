import { posts, projects } from "#site/content";
import { sortPosts } from "@/velite/post";
import { getProjects } from "@/velite/project";

import { Metadata } from "next";

import AltProjectCard from "@/components/shared/cards/alt-project-card";
import BlogCard from "@/components/shared/cards/blog-card";
import ProjectCard from "@/components/shared/cards/project-card";
import WorkCard from "@/components/shared/cards/work-card";
import Paragraph from "@/components/shared/paragraph";

import SectionWrapper from "@/components/motion/section-wrapper";

import { projectItems, workItems } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Archive",
};

export default async function Page() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const allProjects = getProjects(
    projects.filter((project) => project.published),
  );

  return (
    <SectionWrapper
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

      <div className="w-full space-y-4">
        <Paragraph title="Featured posts" link href="/post" />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {sortedPosts.length > 0 ? (
            sortedPosts
              .slice(0, 2)
              .map((item) => <BlogCard key={item.slug} {...item} />)
          ) : (
            <blockquote className="col-span-full border-s-2 border-zinc-500 bg-gradient-to-r from-zinc-500/20 to-transparent px-4 py-2">
              <p className="text-sm font-medium italic leading-normal text-zinc-600 dark:text-zinc-400">
                Nothing to see here yet! Check back later for some exciting
                content.
              </p>
            </blockquote>
          )}
        </div>
      </div>

      <div className="w-full space-y-4">
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

      <div className="w-full space-y-4">
        <Paragraph title="Side projects" />
        <div className="flex w-full flex-col">
          {projectItems.reverse().map((item, index) => (
            <AltProjectCard {...item} key={index} />
          ))}
        </div>
      </div>

      <div className="w-full space-y-4">
        <Paragraph title="Free templates" />
        <div className="flex w-full flex-col gap-y-4">
          {allProjects.map((item, index) => (
            <ProjectCard {...item} key={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
