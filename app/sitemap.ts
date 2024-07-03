import { getPosts } from "@/lib/gql";

export const baseUrl = "https://salmoon.vercel.app";

export default async function sitemap() {
  const posts = await getPosts();
  let blogs =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.node.slug}`,
      lastModified: post.node.updatedAt,
    })) ?? [];

  let routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
