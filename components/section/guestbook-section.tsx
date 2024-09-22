"use client";

import { createClient } from "@/supabase/client";

import { useEffect, useState } from "react";

import Image from "next/image";

interface GuestbookEntry {
  id: number;
  content: string;
  user_id: string;
  created_at: string;
}

interface GuestbookCardProps {
  content: string;
  user_id: string;
  createdAt: string;
}

type User = {
  id: string;
  avatar_url: string;
  name: string;
};

const GuestbookCard: React.FC<GuestbookCardProps> = ({
  content,
  user_id,
  createdAt,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: user } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user_id)
        .single();
      setUser(user as User);
    };
    fetchUser();
  }, [user_id]);

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
        <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-sm bg-muted">
          {user && user.avatar_url && (
            <Image
              src={user.avatar_url}
              alt={user.name || "User avatar"}
              fill
              sizes="32px"
              className="bg-muted object-cover"
            />
          )}
        </div>
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

const GuestbookSection: React.FC = () => {
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuestbook = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data: guestbook } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });
      setGuestbook((guestbook as GuestbookEntry[]) || []);
      setIsLoading(false);
    };
    fetchGuestbook();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-fit w-full max-w-sm flex-col gap-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex animate-pulse flex-col gap-y-3">
            <div className="flex w-full items-center gap-x-4">
              <div className="size-8 shrink-0 rounded-sm bg-muted" />
              <div className="flex w-full flex-col justify-center gap-y-1 self-stretch py-[2px]">
                <div className="h-3 w-1/2 rounded-sm bg-muted" />
                <div className="h-3 w-1/3 rounded-sm bg-muted" />
              </div>
            </div>
            <div className="h-[14px] md:h-[18px] w-full rounded-sm bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-fit w-full max-w-sm flex-col gap-y-4">
      {guestbook.map((item) => (
        <GuestbookCard
          key={item.id}
          content={item.content}
          user_id={item.user_id}
          createdAt={item.created_at}
        />
      ))}
    </div>
  );
};

export default GuestbookSection;
