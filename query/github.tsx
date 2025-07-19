"use client";

import { useQuery } from "@tanstack/react-query";

import { GitHubRepo } from "@/types/github.types";

export const fetchRepository = async (repo: string): Promise<GitHubRepo> => {
  const response = await fetch(`https://api.github.com/repos/${repo}`);

  if (!response.ok) {
    throw new Error("Failed to fetch repository");
  }

  const data = await response.json();

  return data;
};

export const useGithub = (repo: string) => {
  return useQuery({
    queryKey: ["repository", repo],
    queryFn: ({ queryKey }) => fetchRepository(queryKey[1]),
    enabled: !!repo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
