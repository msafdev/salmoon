import { MoveRight } from "lucide-react";

import React from "react";

import Link from "next/link";

import Paragraph from "@/components/shared/paragraph";

import { inspoItems, toolItems } from "@/lib/constants";

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
      <div className="flex w-full max-w-xl flex-col gap-y-4">
        <h2 className="text-base font-semibold">Workstation</h2>
        <ul className="flex flex-col gap-y-3">
          {toolItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-x-3 text-xs sm:text-sm"
            >
              <p className="text-muted-foreground">{item.category}</p>
              <MoveRight className="size-3 text-foreground" />
              <p className="text-foreground">{item.items.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full max-w-xl flex-col gap-y-4">
        <h2 className="text-base font-semibold">Inspiration</h2>
        <ul className="flex flex-col gap-y-2">
          {inspoItems.map((item, index) => (
            <li key={index} className="flex items-start text-xs sm:text-sm">
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
      <div className="flex w-full max-w-xl flex-col gap-y-4">
        <h2 className="text-base font-semibold">Bookmark</h2>
        <p className="text-center text-sm text-muted-foreground md:text-base">
          Nothing here <span className="text-foreground">yet</span>. Stay tuned!
        </p>
      </div>
    </section>
  );
};

export default Page;
