import { Swift } from "#site/content";

export type SwiftSimplified = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
};

export function simplifySwifts(all: Array<Swift>): Array<SwiftSimplified> {
  return all.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.image,
  }));
}

export function sortSwifts(swifts: Array<Swift>) {
  return swifts
    .filter((swift) => swift.published)
    .sort((a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0;
    });
}
