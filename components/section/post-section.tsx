"use client";

import { Post } from "#site/content";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import AltBlogCard from "@/components/shared/cards/alt-blog-card";

const BlogSection = ({
  items,
  tags,
}: {
  items: Array<Post>;
  tags: string[];
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleFilterClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const filteredBlogItems =
    selectedTag === null
      ? items
      : items?.filter((item) => item?.tags?.includes(selectedTag));

  return (
    <motion.div className="flex w-full flex-col gap-y-5">
      <div className="flex flex-col gap-x-3 gap-y-2">
        <p className="text-sm font-semibold text-foreground md:text-base">
          Filter by
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {tags.map((tag) => (
            <div
              key={tag}
              onClick={() => handleFilterClick(tag)}
              className={`cursor-pointer text-sm font-medium ${
                selectedTag === tag
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              } md:text-base`}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <AnimatePresence key={selectedTag}>
          {filteredBlogItems &&
            filteredBlogItems.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AltBlogCard
                  slug={item.slug}
                  title={item.title}
                  createdAt={item.date}
                  className="text-sm sm:text-sm"
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BlogSection;
