"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/supabase/client";
import { GuestbookWithUser, UserProfile } from "@/types/guestbook.types";

const fetchGuestbook = async (): Promise<GuestbookWithUser[]> => {
  const supabase = createClient();

  const { data: guestbook, error: guestbookError } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (guestbookError) throw guestbookError;
  if (!guestbook?.length) return [];

  const userIds: string[] = Array.from(
    new Set(
      guestbook
        .map((item) => item.user_id)
        .filter((id): id is string => Boolean(id)),
    ),
  );

  if (!userIds || userIds.length === 0) {
    return guestbook.map((item) => ({
      id: String(item.id),
      content: item.content,
      created_at: item.created_at,
      user: null,
    }));
  }

  const { data: users, error: usersError } = await supabase
    .from("profile")
    .select("id, name, avatar_url")
    .in("id", userIds);

  if (usersError) throw usersError;

  const userMap =
    users?.reduce(
      (acc, user) => ({ ...acc, [user.id]: user }),
      {} as Record<string, UserProfile>,
    ) || {};

  return guestbook.map((item) => ({
    id: String(item.id),
    content: item.content,
    created_at: item.created_at,
    user: item.user_id ? userMap[item.user_id] || null : null,
  }));
};

export const useGuestbook = () => {
  return useQuery({
    queryKey: ["guestbook"],
    queryFn: fetchGuestbook,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
