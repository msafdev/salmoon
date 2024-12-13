"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import BlogCard from "@/components/shared/cards/blog-card";

import { Edge, categoryType } from "@/lib/types";

const BlogSection = ({ items }: { items: Edge[] | undefined }) => {
  const [selectedCategory, setSelectedCategory] = useState<categoryType | null>(
    null,
  );

  const categories: categoryType[] = [
    "frontend",
    "uiux",
    "animation",
    "backend",
    "personal",
    "ai",
  ];

  const handleFilterClick = (category: categoryType) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredBlogItems =
    selectedCategory === null
      ? items
      : items?.filter((item) =>
          item?.node.categories.includes(selectedCategory),
        );

  return (
    <motion.div className="flex w-full flex-col gap-y-5">
      <div className="flex flex-col gap-x-3 gap-y-2">
        <p className="text-sm font-semibold text-foreground md:text-sm">
          Filter by
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`cursor-pointer text-sm font-medium ${
                selectedCategory === category
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              } md:text-sm`}
            >
              {category === "uiux" ? "ui/ux" : category}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <AnimatePresence key={selectedCategory}>
          {filteredBlogItems &&
            filteredBlogItems.map((item, index) => (
              <motion.div
                key={item.node.slug}
                initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BlogCard
                  slug={item.node.slug}
                  title={item.node.title}
                  updatedAt={item.node.updatedAt}
                  className="text-xs sm:text-sm"
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BlogSection;
