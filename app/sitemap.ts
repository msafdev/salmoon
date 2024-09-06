import { getPosts } from "@/lib/gql";

export const baseUrl = "https://msaf.tech";

export default async function sitemap() {
  const posts = await getPosts();
  let blogs =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.node.slug}`,
      lastModified: post.node.updatedAt,
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
  }));

  return [...routes, ...blogs];
}
