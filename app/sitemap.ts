import { posts } from "#site/content";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  let blogs =
    posts?.map((post) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: post.date,
      priority: 0.5,
    })) ?? [];

  let routes = [
    "/",
    "/about",
    "/lab",
    "/post",
    "/material",
    "/personal",
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
