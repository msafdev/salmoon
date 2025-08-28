import { posts } from "#site/content";

import { siteItems } from "@/lib/config";

const today = new Date().toISOString().split("T")[0];

export default async function sitemap() {
  const sitemap = [
    {
      url: `${siteItems.url}/`,
      lastModified: today,
      priority: 1.0,
    },
  ];

  const staticRoutes: string[] = [
    "/archive",
    "/lab",
    "/post",
    "/material",
    "/personal",
    "/guestbook",
    "/note",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteItems.url}${route}`,
    lastModified: today,
    priority: 0.7,
  }));

  const blogEntries =
    posts?.map((post) => ({
      url: `${siteItems.url}/post/${post.slug}`,
      lastModified: post.date,
      priority: 0.5,
    })) ?? [];

  const labStaticRoutes: string[] = [
    "toolbar",
    "loader",
    "avatar",
    "stagger",
    "file",
    "input",
    "badge",
    "cursor",
  ];

  const labEntries = labStaticRoutes.map((slug) => ({
    url: `${siteItems.url}/lab/${slug}`,
    lastModified: today,
    priority: 0.6,
  }));

  return sitemap.concat(staticEntries, blogEntries, labEntries);
}
