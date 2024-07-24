import { createAdminClient } from "@/supabase/server";

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
  const supabase = createAdminClient();

  const { data: user, error } = await supabase.auth.admin.getUserById(user_id);

  const formatTimestamp = (timestamp: string) => {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);

    const timeDiff = currentDate.getTime() - createdAtDate.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff > 1) {
      return `${daysDiff} days ago`;
    } else if (daysDiff === 1) {
      return "yesterday";
    } else if (hoursDiff > 0) {
      return `${hoursDiff} hours ago`;
    } else {
      return "less than an hour ago";
    }
  };

  return (
    <div className="group/guestbook relative flex flex-col gap-y-3">
      <div className="flex w-full items-center gap-x-4">
        <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-sm bg-muted">
          <Image
            src={user?.user?.user_metadata.avatar_url}
            alt={user?.user?.user_metadata.user_name || "User avatar"}
            fill
            sizes="(max-width: 768px) 66vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-semibold md:text-sm">
            {user?.user?.user_metadata.name}
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
  const supabase = createAdminClient();

  const { data: guestbook } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex h-fit w-full max-w-xl flex-col gap-y-4">
      {guestbook &&
        guestbook.map((item, index) => {
          return (
            <GuestbookCard
              content={item.content}
              user_id={item.user_id as string}
              key={index}
              createdAt={item.created_at as string}
            />
          );
        })}
    </div>
  );
};

export default GuestbookSection;
