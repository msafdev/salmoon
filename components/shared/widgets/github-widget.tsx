"use client";

import { LuGitBranch, LuScale, LuStar } from "react-icons/lu";
import { PiArrowClockwiseBold } from "react-icons/pi";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { useGithub } from "@/query/github";

const Loading = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "w-full rounded-lg border bg-accent/40 p-4 transition-colors hover:bg-accent/50",
      className,
    )}
  >
    <div className="mb-3 flex items-center gap-2">
      <Skeleton className="size-6 rounded-full" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="mb-3 h-5 w-32" />
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
      "flex min-h-[117.6px] w-full flex-col items-center justify-center gap-2 rounded-lg border bg-accent/40 p-4 transition-colors hover:bg-accent/50",
      className,
    )}
  >
    <p className="text-sm text-muted-foreground">Something went wrong</p>
    <Button variant="ghost" size="icon" className="size-8" onClick={onRetry}>
      <PiArrowClockwiseBold size={14} />
    </Button>
  </div>
);

const GithubWidget = ({
  className = "",
  repo,
}: {
  className?: string;
  repo: string;
}) => {
  const { data: githubData, isLoading, error, refetch } = useGithub(repo);

  console.log(githubData);

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
        "block w-full rounded-lg border bg-accent/40 p-4 transition-colors hover:bg-accent/50",
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
        <h4 className="text-base font-semibold text-foreground">
          {githubData.full_name}
        </h4>
      </div>
      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
        {githubData.description ?? "No description"}
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
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

export default GithubWidget;
