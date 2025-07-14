import { Project } from "#site/content";
import { slug } from "github-slugger";

export function getProjects(projects: Array<Project>) {
  return projects.filter((project) => project.published);
}

export function topProjects(projects: Array<Project>, limit = 2) {
  return projects.slice(0, limit);
}

export function getAllTags(projects: Array<Project>) {
  const tags: Record<string, number> = {};
  projects.forEach((post) => {
    if (post.published) {
      post.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      });
    }
  });

  return tags;
}

export function getLearnsByTagSlug(projects: Array<Project>, tag: string) {
  return projects.filter((post) => {
    if (!post.tags) return false;
    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

export function groupLearnsByTag(projects: Array<Project>) {
  const tagMap: Record<string, Project[]> = {};

  projects.forEach((post) => {
    if (!post.published || !post.tags) return;

    post.tags.forEach((tag) => {
      const tagSlug = slug(tag);
      if (!tagMap[tagSlug]) tagMap[tagSlug] = [];
      tagMap[tagSlug].push(post);
    });
  });

  Object.keys(tagMap).forEach((tag) => {
    tagMap[tag] = getProjects(tagMap[tag]);
  });

  return tagMap;
}

export function getPrevAndNext(projects: Array<Project>, current: Project) {
  if (!current.tags || current.tags.length === 0) {
    return { prev: null, next: null };
  }

  const primaryTag = slug(current.tags[0]);

  const filtered = projects.filter((post) => {
    if (!post.published || !post.tags) return false;
    return post.tags.some((tag) => slug(tag) === primaryTag);
  });

  const sorted = getProjects(filtered);
  const index = sorted.findIndex(
    (item) => item.slugAsParams === current.slugAsParams,
  );

  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;

  return { prev, next };
}
