"use client";

import { PiPlusBold } from "react-icons/pi";

import { useState } from "react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import NoteForm from "@/components/form/note-form";

import Paragraph from "../paragraph";

export default function NoteDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="anim hover:bg-primary/40 hover:text-primary-foreground focus-visible:ring-ring/40 pointer-events-auto grid size-10 cursor-pointer place-items-center rounded-full bg-transparent ring-offset-transparent hover:backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-hidden">
          <PiPlusBold size={20} />
        </button>
      </DrawerTrigger>

      <DrawerContent
        onPointerDown={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 flex-col items-center gap-6 overflow-y-auto p-4 sm:p-8">
          <Paragraph title="Leave a note">
            Write down anything you want to share. All notes are completely
            anonymous and will be shown at random for others to see.
          </Paragraph>

          <NoteForm onClose={() => setOpen(false)} />
        </div>

        <div className="mt-auto border-t border-gray-200 bg-gray-100 p-4">
          <div className="mx-auto flex max-w-md justify-end gap-6">
            <a
              className="flex items-center gap-0.25 text-xs text-gray-600"
              href="https://github.com/emilkowalski/vaul"
              target="_blank"
            >
              GitHub
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                aria-hidden="true"
                className="ml-1 h-3 w-3"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                <path d="M15 3h6v6"></path>
                <path d="M10 14L21 3"></path>
              </svg>
            </a>
            <a
              className="flex items-center gap-0.25 text-xs text-gray-600"
              href="https://twitter.com/emilkowalski_"
              target="_blank"
            >
              Twitter
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                aria-hidden="true"
                className="ml-1 h-3 w-3"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                <path d="M15 3h6v6"></path>
                <path d="M10 14L21 3"></path>
              </svg>
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
