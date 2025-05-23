import { GuestbookWithUser } from "@/query/guestbook";

import Image from "next/image";

interface GuestbookCardProps {
  entry: GuestbookWithUser;
}

const GuestbookCard = ({ entry }: GuestbookCardProps) => {
  const formatTimestamp = (timestamp: string): string => {
    const timeDiff = Date.now() - new Date(timestamp).getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const units = [
      { value: years, singular: "year", plural: "years" },
      { value: months, singular: "month", plural: "months" },
      { value: days, singular: "day", plural: "days" },
      { value: hours, singular: "hour", plural: "hours" },
      { value: minutes, singular: "minute", plural: "minutes" },
    ];

    const unit = units.find((u) => u.value > 0);
    return unit
      ? `${unit.value} ${unit.value > 1 ? unit.plural : unit.singular} ago`
      : "just now";
  };

  return (
    <div className="group/guestbook relative flex flex-col gap-y-2">
      <div className="flex w-full items-center gap-x-4">
        {entry.user?.avatar_url && (
          <Image
            src={entry.user.avatar_url}
            alt={entry.user.name || "User avatar"}
            width={36}
            height={36}
            className="rounded-sm bg-muted object-cover"
            loading="lazy"
            typeof="image/webp"
          />
        )}
        <div className="flex flex-col">
          <p className="text-sm font-semibold md:text-sm">
            {entry.user?.name || "Anonymous"}
          </p>
          <div className="flex items-center gap-x-2">
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(entry.created_at)}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm font-medium">{entry.content}</p>
    </div>
  );
};

export default GuestbookCard;
