import { PiArrowRightBold } from "react-icons/pi";

import React from "react";

import { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/shared/icon";
import Paragraph from "@/components/shared/paragraph";

import { Badge } from "@/components/ui/badge";

import SectionWrapper from "@/components/motion/section-wrapper";

import {
  creditItems,
  resourceItems,
  techItems,
  toolItems,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Material",
  description: "My most trusted people, tools, resources, this and that.",
};

const Page = () => {
  return (
    <SectionWrapper
      id="material"
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My personal go-to">
        <p>
          People have asked me about things I use to build products, be
          productive, and stay focused. Here is a list of things I personally
          use and recommend.
        </p>
      </Paragraph>

      <div className="w-full space-y-4">
        <h2 className="text-base font-semibold">Workstation</h2>
        <ul className="flex flex-col gap-y-3">
          {toolItems.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start gap-y-1 text-sm sm:flex-row sm:items-center"
            >
              <p className="text-muted-foreground">{item.category}</p>
              <PiArrowRightBold className="mx-3 hidden size-3 text-foreground sm:block" />
              <p className="text-pretty font-medium text-foreground">
                {item.items.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full space-y-4">
        <h2 className="text-base font-semibold">Tools</h2>
        <div className="flex flex-wrap gap-2">
          {techItems.map((item, index) => (
            <Badge
              key={index}
              className="flex h-6 items-center gap-2 border px-2 font-medium capitalize [&>svg]:size-3"
              variant="secondary"
            >
              <Icon name={item.id} type="tech" />
              {item.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="w-full space-y-4">
        <h2 className="text-base font-semibold">Inspiration</h2>
        <ul className="space-y-2">
          {creditItems.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start text-sm sm:flex-row"
            >
              <div className="mb-1 flex items-center sm:mb-0">
                <p className="text-muted-foreground">{item.category}</p>
                <PiArrowRightBold className="mx-3 hidden size-3 text-foreground sm:block" />
              </div>
              <div className="flex flex-wrap items-center text-pretty">
                {item.items.map((person, index) => (
                  <Link
                    key={index}
                    href={person.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Link to ${person.name}`}
                    className="text-nowrap font-medium text-foreground underline-offset-2 hover:underline"
                  >
                    {person.name}
                    {index < item.items.length - 1 && (
                      <span className="mr-1">,</span>
                    )}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full space-y-4">
        <h2 className="text-base font-semibold">Resources</h2>
        <div className="space-y-2">
          {resourceItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              aria-label={`Link to ${item.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/bookmark flex w-fit items-start gap-x-3 py-1"
            >
              <PiArrowRightBold
                className="mt-[5px] text-foreground"
                size={12}
              />
              <p className="anim w-full pr-5 text-sm font-medium text-muted-foreground group-hover/bookmark:text-foreground">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Page;
