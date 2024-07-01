import BlogCard from "@/components/shared/blog-card";
import Paragraph from "@/components/shared/paragraph";
import ProjectCard from "@/components/shared/project-card";

import { projectItems, templateItems } from "@/lib/items";
import { recentBlogs } from "@/lib/posts";

export default function Page() {
  return (
    <section
      id="archive"
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My grand archive.">
        <p>
          I am a sentimental person. I keep records of my projects, blogs, and
          other things that I have done. I like to look back and see how much I
          have grown as a person.
        </p>
      </Paragraph>
      <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
        <Paragraph title="What i wrote." link href="/blog" />
        <div className="flex w-full flex-col">
          {recentBlogs.map((item, index) => (
            <BlogCard {...item} key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
        <Paragraph title="Little projects." />
        <div className="flex w-full flex-col">
          {projectItems.reverse().map((item, index) => (
            <ProjectCard {...item} key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
        <Paragraph title="Free templates." />
        <div className="flex w-full flex-col">
          {templateItems.map((item, index) => (
            <ProjectCard {...item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
