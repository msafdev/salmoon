import { posts } from "#site/content";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
const today = new Date().toISOString().split("T")[0];

export default async function sitemap() {
  const sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: today,
      priority: 1.0,
    },
  ];

  const staticRoutes = [
    "/archive",
    "/lab",
    "/post",
    "/material",
    "/personal",
    "/guestbook",
    "/learn",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: today,
    priority: 0.7,
  }));

  const blogEntries =
    posts?.map((post) => ({
      url: `${baseUrl}/post/${post.slug}`,
      lastModified: post.date,
      priority: 0.5,
    })) ?? [];

  const labDynamicRoutes: string[] = [
    "toolbar",
    "button",
    "avatar",
    "stagger",
    "file",
    "input",
  ];

  const labEntries = labDynamicRoutes.map((slug) => ({
    url: `${baseUrl}/lab/${slug}`,
    lastModified: today,
    priority: 0.6,
  }));

  return sitemap.concat(staticEntries, blogEntries, labEntries);
}
