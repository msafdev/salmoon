import { getPosts } from "@/lib/gql";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  const posts = await getPosts();
  let blogs =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.node.slug}`,
      lastModified: post.node.updatedAt,
      priority: 0.5,
    })) ?? [];

  let routes = [
    "/",
    "/about",
    "/lab",
    "/blog",
    "/material",
    "/secret",
    "/guestbook",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    priority: 0.7,
  }));

  let sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString().split("T")[0],
      priority: 1,
    },
  ];

  return sitemap.concat(routes).concat(blogs);
}
