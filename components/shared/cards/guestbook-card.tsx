import { GuestbookWithUser } from "@/query/guestbook";

import Image from "next/image";

import { formatTimestamp } from "@/lib/utils";

type GuestbookCardProps = {
  entry: GuestbookWithUser;
};

const GuestbookCard = ({ entry }: GuestbookCardProps) => {
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
