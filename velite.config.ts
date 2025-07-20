import { defineCollection, defineConfig, s } from "velite";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import rehypeToc from "@stefanprobst/rehype-extract-toc";
import rehypeTocExtract from "@stefanprobst/rehype-extract-toc/mdx";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "post/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      image: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      featured: s.boolean().default(false),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const learns = defineCollection({
  name: "Learn",
  pattern: "learn/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      chapter: s.number().min(1),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      last: s.boolean().default(false),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, learns },
  mdx: {
    rehypePlugins: [
      rehypeToc,
      [rehypeTocExtract, { name: "toc" }],
      rehypeSlug,
      [rehypePrettyCode],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
