import { createClient } from "@/supabase/server";

import Image from "next/image";

const GuestbookCard = ({
  content,
  user,
  createdAt,
}: {
  content: string;
  user: { name: string | null; avatar_url: string | null } | null;
  createdAt: string;
}) => {
  const formatTimestamp = (timestamp: string): string => {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    const timeDiff = currentDate.getTime() - createdAtDate.getTime();

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return "less than an hour ago";
  };

  return (
    <div className="group/guestbook relative flex flex-col gap-y-3">
      <div className="flex w-full items-center gap-x-4">
        {user && user.avatar_url && (
          <Image
            src={user.avatar_url}
            alt={user.name || "User avatar"}
            width={32}
            height={32}
            className="rounded-sm bg-muted object-cover"
            loading="lazy"
            typeof="image/webp"
          />
        )}
        <div className="flex flex-col">
          <p className="min-h-4 text-xs font-semibold md:min-h-5 md:text-sm">
            {user?.name}
          </p>
          <div className="flex items-center gap-x-2">
            <p className="text-xs text-muted-foreground">
              {formatTimestamp(createdAt)}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm leading-none">{content}</p>
    </div>
  );
};

const GuestbookSection = async () => {
  const supabase = createClient();

  const { data: guestbook } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false });

  if (!guestbook || guestbook.length === 0) {
    return (
      <div className="flex h-fit w-full max-w-sm flex-col gap-y-4">
        No entries yet
      </div>
    );
  }

  const userIds = guestbook.map((item) => item.user_id).filter(Boolean);
  const { data: users } = await supabase
    .from("profile")
    .select("*")
    .in("id", userIds);

  const userMap =
    users?.reduce(
      (acc, user) => {
        acc[user.id] = user;
        return acc;
      },
      {} as Record<string, { name: string | null; avatar_url: string | null }>,
    ) || {};

  return (
    <div className="flex h-fit w-full max-w-sm flex-col gap-y-4">
      {guestbook.map((item) => (
        <GuestbookCard
          key={item.id}
          content={item.content}
          user={item.user_id ? userMap[item.user_id] : null}
          createdAt={item.created_at}
        />
      ))}
    </div>
  );
};

export default GuestbookSection;
