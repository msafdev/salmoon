"use client";

import { motion } from "motion/react";

import TemplateCard from "@/components/shared/cards/template-card";
import Paragraph from "@/components/shared/paragraph";

import { projectItems } from "@/lib/assets";

const ProjectSection = () => {
  return (
    <div className="w-full space-y-4">
      <Paragraph title="Side Projects" link href="/archive">
        <p>
          A collection of <span className="text-foreground">open-sourced</span>{" "}
          tools, experiments, and templates I've built over the years. Do check
          them out.
        </p>
      </Paragraph>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {projectItems.slice(0, 2).map((item, index) => (
          <motion.div key={index}>
            <TemplateCard {...item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
