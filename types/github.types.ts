type Owner = {
  login: string;
  avatar_url: string;
  html_url: string;
};

type License = {
  spdx_id: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics: string[];
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  visibility: "public" | "private";
  archived: boolean;
  fork: boolean;
  license: License | null;
  owner: Owner;
};
