"use client";

import { AnimatePresence, motion } from "motion/react";

import {
  PiArrowRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";

import { useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Bookmark {
  title: string;
  href: string;
  description: string;
}

const BookmarkGroup = ({ items }: { items: Bookmark[] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="group/book relative min-h-[160px] space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-2"
          >
            {paginatedItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                aria-label={`Link to ${item.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/mark text-foreground hover:text-foreground! group-hover/book:text-muted-foreground flex w-fit items-start gap-x-3 py-1 transition-colors"
              >
                <PiArrowRightBold
                  className="mt-[5px] shrink-0 transition-transform group-hover/mark:translate-x-0.5"
                  size={12}
                />
                <div className="space-y-0.5">
                  <p className="anim w-full pr-5 text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="absolute top-0 right-0 flex items-center gap-x-2">
          <Button
            size={"icon"}
            variant={"secondary"}
            className="anim size-7 opacity-100 transition-all disabled:opacity-20"
            onClick={prevPage}
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            <PiCaretLeftBold size={14} />
          </Button>
          <Button
            size={"icon"}
            variant={"secondary"}
            className="anim size-7 opacity-100 transition-all disabled:opacity-20"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
          >
            <PiCaretRightBold size={14} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookmarkGroup;
