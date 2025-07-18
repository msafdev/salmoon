import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
      },
      {
        userAgent: "Twitterbot",
        allow: ["/"]
      },
      {
        userAgent: "Bingbot",
        disallow: ["/"],
      },
    ],
    sitemap: "https://salmoon.vercel.app/sitemap.xml",
  };
}
