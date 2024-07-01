"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import BlogCard from "@/components/shared/blog-card";

import { blogItems, categoryType } from "@/lib/posts";

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<categoryType | null>(
    null,
  );

  const categories: categoryType[] = [
    "frontend",
    "ui/ux",
    "animation",
    "backend",
    "personal",
  ];

  const handleFilterClick = (category: categoryType) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredBlogItems =
    selectedCategory === null
      ? blogItems
      : blogItems.filter((item) => item.categories.includes(selectedCategory));

  return (
    <motion.div className="flex w-full flex-col gap-y-5">
      <div className="flex flex-col gap-x-3 gap-y-2 md:flex-row md:items-center">
        <p className="text-xs font-semibold text-foreground md:text-sm">
          Filter by
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`cursor-pointer text-xs font-medium ${
                selectedCategory === category
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              } md:text-sm`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <AnimatePresence>
          {filteredBlogItems.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
            >
              <BlogCard {...item} className="text-xs sm:text-sm" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BlogSection;
