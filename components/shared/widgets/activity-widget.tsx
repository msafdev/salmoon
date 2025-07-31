"use client";

import { ActivityCalendar } from "react-activity-calendar";

import { cn } from "@/lib/utils";
import { useGitHubCalendar } from "@/query/github";

export default function ActivityWidget({
  className = "",
  user,
}: {
  className?: string;
  user: string;
}) {
  const { data, isLoading, isError } = useGitHubCalendar(user);
  if (isError) return null;

  return (
    <div
      className={cn(
        "relative w-full rounded-lg border bg-accent/40 p-4 text-xs font-medium text-foreground/60 transition-colors hover:bg-accent/50",
        className,
      )}
    >
      <ActivityCalendar
        data={data ?? []}
        loading={isLoading}
        blockSize={12}
        blockMargin={4}
        colorScheme="light"
        theme={{
          light: ["hsl(var(--muted))", "hsl(var(--tertiary))"],
        }}
      />
    </div>
  );
}
