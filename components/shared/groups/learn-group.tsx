"use client";

import { learns } from "#site/content";

import { PiBookmarkSimpleFill } from "react-icons/pi";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/motion/accordion";

import { groupLearnsByTag } from "@/velite/learn";

const LearnGroup = () => {
  const groupedMaterials = groupLearnsByTag(learns);

  return (
    <Accordion
      className="flex w-full flex-col"
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      variants={{
        expanded: {
          opacity: 1,
          scale: 1,
        },
        collapsed: {
          opacity: 0,
          scale: 0.9,
          transition: {
            height: { delay: 0.3 },
          },
        },
      }}
    >
      {Object.entries(groupedMaterials).map(([tag, learns]) => (
        <AccordionItem value={tag} key={tag}>
          <AccordionTrigger className="w-full py-2">
            <div key={tag} className="group flex w-full items-center gap-x-4">
              <div className="relative">
                <div className="relative flex h-8 w-7 rounded-l-[2px] rounded-r-sm -outline-offset-1 outline-black/5 dark:outline-solid">
                  <div className="h-full w-3.5 rounded-l-[2px] bg-linear-to-r from-[#2e2e2e] via-[#3e3e3e] to-[#2e2e2e]" />
                  <div className="dark:to-gray-1000 bg-background dark:bg-primary flex h-full w-full rounded-r-sm border-2 border-l-0">
                    <PiBookmarkSimpleFill className="anim-slow absolute -top-px right-1 h-0 w-2 origin-bottom fill-blue-500 text-blue-500 opacity-0 group-hover:h-2 group-hover:opacity-100 group-aria-expanded:h-2 group-aria-expanded:opacity-100" />
                    <div className="bg-border absolute bottom-1 h-px w-[18px]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-left text-sm font-semibold capitalize">
                  {tag}
                </h2>
                <p className="text-muted-foreground text-xs font-medium">
                  {learns.length} chapters
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex origin-top-left flex-col">
            {learns.map((item) => {
              return (
                <Link
                  href={item.slug}
                  key={item.slug}
                  className="group/item flex w-fit items-center gap-x-3 py-2 pl-11"
                  aria-label={`Go to ${item.slug}`}
                >
                  <div className="anim bg-muted group-hover/item:bg-accent grid size-6 place-items-center rounded-md border">
                    <span className="anim text-muted-foreground group-hover/item:text-accent-foreground text-xs leading-none font-medium">
                      {item.chapter}
                    </span>
                  </div>
                  <p className="text-sm leading-none font-semibold">
                    {item.title}
                  </p>
                </Link>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default LearnGroup;
