"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { projectItems } from "@/lib/constants";
import ProjectCard from "@/components/shared/project-card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.3,
      ease: "easeInOut",
    },
  },
};

const project = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.3,
      ease: "easeInOut",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const ProjectSection = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col w-full items-center gap-y-4 max-w-2xl md:p-4"
    >
      {/* Avatar and First Chat */}
      <div className="flex items-end gap-x-4 w-full">
        <motion.div variants={item} className="relative">
          <Avatar className="border overflow-hidden">
            <AvatarImage src="./ava.png" alt="Avatar" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>

          {/* Status */}
          <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0.5 right-0.5 border" />
        </motion.div>

        <motion.div
          variants={item}
          className="flex px-6 py-3 bg-accent rounded-3xl rounded-bl-md border"
        >
          <p className="text-accent-foreground text-sm">
            These are some of the projects I've worked on.
          </p>
        </motion.div>
      </div>

      {/* Second Chat */}
      <motion.div
        variants={project}
        initial="hidden"
        animate="show"
        className="w-full grid sm:grid-cols-2 gap-4"
      >
        {projectItems.map((items, index) => (
          <motion.div variants={item} key={index}>
            <ProjectCard
              title={items.title}
              stack={items.stack}
              image={items.image}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectSection;
