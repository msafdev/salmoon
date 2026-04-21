"use client";

import { motion } from "motion/react";

import SocialCard, { Name } from "@/components/shared/cards/social-card";
import Paragraph from "@/components/shared/paragraph";

import { socialItems } from "@/lib/constants";

const ActionSection = () => {
  return (
    <div className="w-full space-y-4">
      <Paragraph title="Let's connect" />
      <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-5">
        {socialItems.map((item) => (
          <motion.div key={item.name} className="not-sm:first:col-span-2">
            <SocialCard
              href={item.href}
              target={item.target}
              rel={item.rel}
              icon={item.icon}
              name={item.name as Name}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActionSection;
