import { posts } from "#site/content";

import RSS from "rss";

import { siteItems } from "@/lib/config";
import { sortPosts } from "@/velite/post";

const feed = new RSS({
  title: siteItems.title,
  description: siteItems.description,
  site_url: siteItems.url || "",
  feed_url: `${siteItems.url}/api/feed`,
  copyright: `${new Date().getFullYear()} Msafdev`,
  language: "en",
  pubDate: new Date(),
});

sortPosts(posts).map((post) => {
  feed.item({
    title: post.title,
    guid: `${siteItems.url}/${post.slug}`,
    url: `${siteItems.url}/${post.slug}`,
    date: post.date,
    description: `
    ${post.description}

    Full post: ${siteItems.url}/${post.slug}
    `,
    author: siteItems.name,
    categories: post.tags || [],
  });
});

export async function GET() {
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
