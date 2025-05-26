import { Learn } from "#site/content";
import { slug } from "github-slugger";

export function sortLearns(learns: Array<Learn>) {
  return learns.sort((a, b) => {
    if (a.chapter < b.chapter) return -1;
    if (a.chapter > b.chapter) return 1;
    return 0;
  });
}

export function getAllTags(learns: Array<Learn>) {
  const tags: Record<string, number> = {};
  learns.forEach((post) => {
    if (post.published) {
      post.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      });
    }
  });

  return tags;
}

export function getLearnsByTagSlug(learns: Array<Learn>, tag: string) {
  return learns.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

export function groupLearnsByTag(learns: Array<Learn>) {
  const tagMap: Record<string, Learn[]> = {};

  learns.forEach((post) => {
    if (!post.published || !post.tags) return;

    post.tags.forEach((tag) => {
      const tagSlug = slug(tag);
      if (!tagMap[tagSlug]) tagMap[tagSlug] = [];
      tagMap[tagSlug].push(post);
    });
  });

  Object.keys(tagMap).forEach((tag) => {
    tagMap[tag] = sortLearns(tagMap[tag]);
  });

  return tagMap;
}

export function getPrevAndNext(learns: Array<Learn>, current: Learn) {
  if (!current.tags || current.tags.length === 0) {
    return { prev: null, next: null };
  }

  const primaryTag = slug(current.tags[0]);

  const filtered = learns.filter((post) => {
    if (!post.published || !post.tags) return false;
    return post.tags.some((tag) => slug(tag) === primaryTag);
  });

  const sorted = sortLearns(filtered);
  const index = sorted.findIndex(
    (item) => item.slugAsParams === current.slugAsParams,
  );

  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;

  return { prev, next };
}
