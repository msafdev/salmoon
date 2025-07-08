"use client";

import { useGuestbook } from "@/query/guestbook";

import GuestbookCard from "@/components/shared/cards/guestbook-card";
import Paragraph from "@/components/shared/paragraph";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ErrorMessage = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex h-fit w-full max-w-lg flex-col gap-y-4">
    <div>
      <div className="flex items-center gap-x-4">
        <Skeleton className="size-9 rounded-sm" />
        <div className="flex flex-col">
          <p className="text-sm font-semibold md:text-sm">Anonymous</p>
          <span className="text-xs text-muted-foreground">404</span>
        </div>
      </div>
      <Button
        onClick={onRetry}
        className="mt-2.5 h-[18px] w-fit rounded-sm px-0"
        variant={"link"}
      >
        Try again?
      </Button>
    </div>
  </div>
);

const GuestbookSection = () => {
  const { data: guestbookData, isLoading, error, refetch } = useGuestbook();

  if (isLoading) {
    return null;
  }

  if (error) {
    return <ErrorMessage onRetry={() => refetch()} />;
  }

  if (!guestbookData?.length) {
    return <Paragraph title="Be the first to leave a trace!" />;
  }

  return (
    <div className="flex h-fit w-full max-w-lg flex-col gap-y-4">
      {guestbookData.map((entry, index) => (
        <GuestbookCard key={entry.id} entry={entry} index={index} />
      ))}
    </div>
  );
};

export default GuestbookSection;
