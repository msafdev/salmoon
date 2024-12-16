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
    const timeDiff = Date.now() - new Date(timestamp).getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const units = [
      { value: years, singular: 'year', plural: 'years' },
      { value: months, singular: 'month', plural: 'months' },
      { value: days, singular: 'day', plural: 'days' },
      { value: hours, singular: 'hour', plural: 'hours' },
      { value: minutes, singular: 'minute', plural: 'minutes' }
    ];

    const unit = units.find(u => u.value > 0);
    return unit 
      ? `${unit.value} ${unit.value > 1 ? unit.plural : unit.singular} ago`
      : "just now";
  };

  return (
    <div className="group/guestbook relative flex flex-col gap-y-3">
      <div className="flex w-full items-center gap-x-4">
        {user?.avatar_url && (
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
    .order("created_at", { ascending: false })
    .limit(50);

  if (!guestbook?.length) {
    return (
      <div className="flex h-fit w-full max-w-sm flex-col gap-y-4">
        No entries yet
      </div>
    );
  }

  const userIds = Array.from(new Set(guestbook.map((item) => item.user_id).filter(Boolean)));
  
  const { data: users } = await supabase
    .from("profile")
    .select("*")
    .in("id", userIds);

  const userMap = users?.reduce(
    (acc, user) => ({ ...acc, [user.id]: user }),
    {} as Record<string, { name: string | null; avatar_url: string | null }>
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