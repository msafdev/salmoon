"use client";

import { createClient } from "@/supabase/client";

import { useQuery } from "@tanstack/react-query";

export interface GuestbookEntry {
  id: string;
  content: string;
  user_id: string | null;
  created_at: string;
}

export interface UserProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

export interface GuestbookWithUser extends Omit<GuestbookEntry, "user_id"> {
  user: UserProfile | null;
}

const fetchGuestbook = async (): Promise<GuestbookWithUser[]> => {
  const supabase = createClient();

  const { data: guestbook, error: guestbookError } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (guestbookError) throw guestbookError;
  if (!guestbook?.length) return [];

  // Get unique user IDs
  const userIds = Array.from(
    new Set(guestbook.map((item) => item.user_id).filter(Boolean)),
  );

  if (userIds.length === 0) {
    return guestbook.map((item) => ({
      id: String(item.id),
      content: item.content,
      created_at: item.created_at,
      user: null,
    }));
  }

  // Fetch user profiles
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
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
