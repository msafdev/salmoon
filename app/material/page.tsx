import { MoveRight } from "lucide-react";

import React from "react";

import { Metadata } from "next";
import Link from "next/link";

import Paragraph from "@/components/shared/paragraph";

import { inspoItems, resourceItems, toolItems } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Material",
};

const Page = () => {
  return (
    <section
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
      <div className="flex w-full max-w-lg flex-col gap-y-4">
        <h2 className="text-base font-semibold">Workstation</h2>
        <ul className="flex flex-col gap-y-3">
          {toolItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-x-3 text-sm sm:text-sm"
            >
              <p className="text-muted-foreground">{item.category}</p>
              <MoveRight className="size-3 text-foreground" />
              <p className="text-foreground">{item.items.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full max-w-lg flex-col gap-y-4">
        <h2 className="text-base font-semibold">Inspiration</h2>
        <ul className="flex flex-col gap-y-2">
          {inspoItems.map((item, index) => (
            <li key={index} className="flex items-start text-sm sm:text-sm">
              <div className="flex items-center">
                <p className="text-muted-foreground">{item.category}</p>
                <MoveRight className="mx-3 size-3 text-foreground" />
              </div>
              <div className="flex flex-wrap items-center gap-y-1">
                {item.items.map((person, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href={person.href}
                      target="_blank"
                      aria-label={`Link to ${person.name}`}
                      rel="noopener noreferrer"
                      className="text-foreground underline-offset-2 hover:underline"
                    >
                      {person.name}
                    </Link>
                    {index < item.items.length - 1 && (
                      <span className="mr-1">,</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full max-w-lg flex-col gap-y-3">
        <h2 className="text-base font-semibold">Resources</h2>
        <div className="flex flex-col">
          {resourceItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              aria-label={`Link to ${item.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/bookmark flex items-center gap-x-3 py-1"
            >
              <MoveRight className="text-foreground" size={12} />
              <p className="anim w-full pr-5 text-sm text-muted-foreground group-hover/bookmark:text-foreground sm:text-sm">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
