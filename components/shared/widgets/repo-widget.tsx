"use client";

import { LuGitBranch, LuScale, LuStar } from "react-icons/lu";
import { PiArrowClockwiseBold } from "react-icons/pi";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { useGitHubRepo } from "@/query/github";

const Loading = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "bg-accent/40 hover:bg-accent/50 w-full rounded-lg border p-4 transition-colors",
      className,
    )}
  >
    <div className="mb-3 flex items-center gap-2">
      <Skeleton className="size-6 rounded-full" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="mb-3 h-5 w-32" />
    <div className="text-muted-foreground flex items-center gap-4 text-xs">
      <span className="flex items-center gap-1">
        <LuStar className="size-3" />
        <Skeleton className="my-0.5 h-3 w-8" />
      </span>
      <span className="flex items-center gap-1">
        <LuGitBranch className="size-3" />
        <Skeleton className="my-0.5 h-3 w-8" />
      </span>
      <span className="flex items-center gap-1">
        <LuScale className="size-3" />
        <Skeleton className="my-0.5 h-3 w-8" />
      </span>
    </div>
  </div>
);

const Error = ({
  className,
  onRetry,
}: {
  className?: string;
  onRetry: () => void;
}) => (
  <div
    className={cn(
      "bg-accent/40 hover:bg-accent/50 flex min-h-[117.6px] w-full flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors",
      className,
    )}
  >
    <p className="text-muted-foreground text-sm">Something went wrong</p>
    <Button variant="ghost" size="icon" className="size-8" onClick={onRetry}>
      <PiArrowClockwiseBold size={14} />
    </Button>
  </div>
);

const RepoWidget = ({
  className = "",
  repo,
}: {
  className?: string;
  repo: string;
}) => {
  const { data: githubData, isLoading, error, refetch } = useGitHubRepo(repo);

  if (isLoading) return <Loading className={className} />;

  if (error || !githubData) {
    return <Error onRetry={() => refetch()} className={className} />;
  }

  return (
    <Link
      href={githubData.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "bg-accent/40 hover:bg-accent/50 block w-full rounded-lg border p-4 transition-colors",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <Image
          src={githubData.owner.avatar_url}
          alt={`${githubData.owner.login}'s avatar`}
          width={24}
          height={24}
          loading="lazy"
          unoptimized
          aria-hidden={true}
          className="rounded-full"
        />
        <h4 className="text-foreground text-base font-semibold">
          {githubData.full_name}
        </h4>
      </div>
      <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
        {githubData.description ?? "No description"}
      </p>
      <div className="text-muted-foreground flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1">
          <LuStar className="size-3" />
          {githubData.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <LuGitBranch className="size-3" />
          {githubData.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <LuScale className="size-3" />
          {githubData.license ? githubData.license.spdx_id : "No license"}
        </span>
      </div>
    </Link>
  );
};

export default RepoWidget;
