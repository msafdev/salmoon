"use client";

import type { Activity } from "react-activity-calendar";

import { useQuery } from "@tanstack/react-query";

import { fetchGitHubCalendar, fetchGitHubRepo } from "@/query/api/github.api";
import type { GitHubRepo } from "@/types/github.types";

const GITHUB_CALENDAR_QUERY_KEY = "github-calendar";
const GITHUB_REPO_QUERY_KEY = "github-repo";
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN?.trim();

const requireGitHubToken = () => {
  if (!token) {
    throw new Error("GitHub token is required to load calendar data");
  }

  return token;
};

export const useGitHubCalendar = (user: string) => {
  return useQuery<Activity[]>({
    queryKey: [GITHUB_CALENDAR_QUERY_KEY, user],
    queryFn: () => fetchGitHubCalendar(user, requireGitHubToken()),
    enabled: Boolean(user),
    staleTime: 1000 * 60 * 60,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGitHubRepo = (repo: string) => {
  return useQuery<GitHubRepo>({
    queryKey: [GITHUB_REPO_QUERY_KEY, repo],
    queryFn: () => fetchGitHubRepo(repo),
    enabled: Boolean(repo),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
};
