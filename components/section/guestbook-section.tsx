import { createClient } from "@/supabase/server";

import Image from "next/image";

const GuestbookCard = async ({
  content,
  user_id,
  createdAt,
}: {
  content: string;
  user_id: string;
  createdAt: string;
}) => {
  const supabase = createClient();
  const { data: user } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user_id)
    .single();

  const formatTimestamp = (timestamp: string): string => {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    const timeDiff = currentDate.getTime() - createdAtDate.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff > 1) return `${daysDiff} days ago`;
    if (daysDiff === 1) return "yesterday";
    if (hoursDiff > 0) return `${hoursDiff} hours ago`;
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

  return (
    <div className="flex h-fit w-full max-w-sm flex-col gap-y-4">
      {guestbook &&
        guestbook.map((item) => (
          <GuestbookCard
            key={item.id}
            content={item.content}
            user_id={item.user_id || ""}
            createdAt={item.created_at}
          />
        ))}
    </div>
  );
};

export default GuestbookSection;
