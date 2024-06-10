import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { projectItems } from "@/lib/constants";
import ProjectCard from "@/components/shared/project-card";

const ProjectSection = () => {
  return (
    <div className="flex flex-col w-full items-center gap-y-4 max-w-2xl md:p-4">
      {/* Avatar and First Chat */}
      <div className="flex items-end gap-x-4 w-full">
        <div className="relative">
          <Avatar className="border overflow-hidden">
            <AvatarImage src="./ava.png" alt="Avatar" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>

          {/* Status */}
          <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0.5 right-0.5 border" />
        </div>

        <div className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border">
          <p className="text-accent-foreground text-sm">
            These are some small projects I've worked on.
          </p>
        </div>
      </div>

      {/* Second Chat */}
      <div className="w-full grid sm:grid-cols-2 gap-4">
        {projectItems.map((items, index) => (
          <div key={index}>
            <ProjectCard
              title={items.title}
              stack={items.stack}
              image={items.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
