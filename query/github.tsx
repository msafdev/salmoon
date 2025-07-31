"use client";

import type { Activity } from "react-activity-calendar";

import { useQuery } from "@tanstack/react-query";

import { fetchGitHubCalendar, fetchGitHubRepo } from "@/query/api/github.api";
import type { GitHubRepo } from "@/types/github.types";

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export const useGitHubCalendar = (user: string) => {
  return useQuery<Activity[]>({
    queryKey: ["github-calendar", user],
    queryFn: () => {
      const githubToken = token;
      if (!githubToken) throw new Error("GitHub token is required");

      return fetchGitHubCalendar(user, githubToken);
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
  });
};

export const useGitHubRepo = (repo: string) => {
  return useQuery<GitHubRepo>({
    queryKey: ["github-repo", repo],
    queryFn: () => fetchGitHubRepo(repo),
    enabled: !!repo,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });
};
