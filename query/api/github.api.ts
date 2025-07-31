import { Activity } from "react-activity-calendar";

import { GitHubRepo } from "@/types/github.types";

const GITHUB_GQL_ENDPOINT = "https://api.github.com/graphql";

type ContributionDay = {
  date: string;
  contributionCount: number;
};

// --- Utility Functions ---

const calculateLevel = (count: number, max: number): number => {
  if (count === 0) return 0;
  if (count >= max * 0.75) return 4;
  if (count >= max * 0.5) return 3;
  if (count >= max * 0.25) return 2;
  return 1;
};

const normalizeContributions = (days: ContributionDay[]): Activity[] => {
  if (!days.length) return [];
  const max = Math.max(...days.map((d) => d.contributionCount));
  return days.map((d) => ({
    date: d.date,
    count: d.contributionCount,
    level: calculateLevel(d.contributionCount, max),
  }));
};

// --- Fetch Contribution Calendar (GraphQL) ---

export const fetchGitHubCalendar = async (
  username: string,
  token: string,
): Promise<Activity[]> => {
  const query = `
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

  const res = await fetch(GITHUB_GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { userName: username },
    }),
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const json = await res.json();
  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ??
    [];
  const days: ContributionDay[] = weeks.flatMap(
    (week: any) => week.contributionDays,
  );

  return normalizeContributions(days);
};

// --- Fetch GitHub Repository (REST) ---

export const fetchGitHubRepo = async (repo: string): Promise<GitHubRepo> => {
  const res = await fetch(`https://api.github.com/repos/${repo}`);
  if (!res.ok) throw new Error("Failed to fetch repository");
  return res.json();
};
