import type { Activity } from "react-activity-calendar";

import type { GitHubRepo } from "@/types/github.types";

const GITHUB_GQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_REST_ENDPOINT = "https://api.github.com/repos";
const CONTRIBUTION_QUERY = `
  query($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

type ContributionDay = {
  date: string;
  contributionCount: number;
};

type ContributionWeek = {
  contributionDays?: ContributionDay[];
};

type ContributionResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          weeks?: ContributionWeek[];
        };
      };
    };
  };
};

const calculateLevel = (count: number, max: number): number => {
  if (count === 0 || max === 0) return 0;
  if (count >= max * 0.75) return 4;
  if (count >= max * 0.5) return 3;
  if (count >= max * 0.25) return 2;
  return 1;
};

const normalizeContributions = (days: ContributionDay[]): Activity[] => {
  if (!days.length) return [];

  let max = 0;
  for (const day of days) {
    if (day.contributionCount > max) {
      max = day.contributionCount;
    }
  }

  return days.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: calculateLevel(day.contributionCount, max),
  }));
};

const extractContributionDays = (payload: ContributionResponse): ContributionDay[] => {
  const weeks =
    payload?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

  if (!Array.isArray(weeks)) return [];

  const days: ContributionDay[] = [];
  for (const week of weeks) {
    if (!Array.isArray(week?.contributionDays)) continue;

    for (const day of week.contributionDays) {
      if (!day) continue;

      const { date, contributionCount } = day;
      if (typeof date === "string" && typeof contributionCount === "number") {
        days.push({ date, contributionCount });
      }
    }
  }

  return days;
};

export const fetchGitHubCalendar = async (
  username: string,
  token: string,
): Promise<Activity[]> => {
  const res = await fetch(GITHUB_GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: { userName: username },
    }),
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const json = (await res.json()) as ContributionResponse;
  const days = extractContributionDays(json);

  return normalizeContributions(days);
};

export const fetchGitHubRepo = async (repo: string): Promise<GitHubRepo> => {
  const res = await fetch(`${GITHUB_REST_ENDPOINT}/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch repository");

  return (await res.json()) as GitHubRepo;
};
