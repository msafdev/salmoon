"use client";

import type { Post } from "#site/content";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import Link from "next/link";

import { formatDate } from "@/lib/functions";
import { cn } from "@/lib/utils";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, x: 10, filter: "blur(2px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
};

const PostGroup = ({ items, tags }: { items: Array<Post>; tags: string[] }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleFilterClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const filteredItems =
    selectedTag === null
      ? items
      : items.filter((item) => item.tags?.includes(selectedTag));

  return (
    <div className="flex flex-col gap-y-8">
      {/* Filter Tags */}
      <div className="flex flex-col gap-y-2">
        <p className="text-sm font-semibold text-foreground md:text-base">
          Filter by
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              onClick={() => handleFilterClick(tag)}
              className={cn(
                "relative cursor-pointer text-sm font-medium transition-colors md:text-base",
                selectedTag === tag
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {selectedTag === tag && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute -inset-0 -inset-y-1 -z-10 border-b-2 border-primary"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {tag}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Post List */}
      <div className="group/container w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTag ?? "all"}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${selectedTag ?? "all"}-${item.slug}`}
                variants={itemVariants}
                exit={{
                  opacity: 0,
                  filter: "blur(2px)",
                  transition: { delay: index * 0.1 },
                }}
                className="group/item cursor-pointer py-2 first:pt-0 last:pb-0"
              >
                <Link
                  href={item.slug}
                  className="anim cursor-pointer space-y-0.5 group-hover/container:opacity-40 group-hover/item:!opacity-100"
                  prefetch={false}
                  aria-label={`Go to ${item.title}`}
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(item.date, "long")}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PostGroup;
