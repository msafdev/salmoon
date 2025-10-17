"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/supabase/client";
import {
  GuestbookWithReplies,
  GuestbookWithUser,
  UserProfile,
} from "@/types/guestbook.types";

type GuestbookRow = {
  id: number | string;
  content: string;
  created_at: string;
  user_id: string | null;
  parent_id: number | string | null;
};

const GUESTBOOK_FIELDS = "id, content, created_at, user_id, parent_id";
const PROFILE_FIELDS = "id, name, avatar_url";

const buildUserMap = (users: UserProfile[] | null) => {
  if (!users?.length) return {} as Record<string, UserProfile>;

  return users.reduce<Record<string, UserProfile>>((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
};

const mapGuestbookEntry = (
  entry: GuestbookRow,
  userMap: Record<string, UserProfile>,
): GuestbookWithUser => ({
  id: String(entry.id),
  content: entry.content,
  created_at: entry.created_at,
  user: entry.user_id ? userMap[entry.user_id] ?? null : null,
  parent_id: entry.parent_id ? String(entry.parent_id) : null,
});

const attachReplies = (
  entries: GuestbookWithUser[],
): GuestbookWithReplies[] => {
  const parents = new Map<string, GuestbookWithReplies>();
  const replies: GuestbookWithUser[] = [];

  for (const entry of entries) {
    if (!entry.parent_id) {
      parents.set(entry.id, { ...entry, replies: [] });
      continue;
    }

    replies.push(entry);
  }

  if (!parents.size) return [];

  for (const reply of replies) {
    const parent = parents.get(reply.parent_id!);
    if (!parent) continue;

    parent.replies.push(reply);
  }

  for (const parent of parents.values()) {
    if (parent.replies.length > 1) {
      parent.replies.sort((a, b) => a.created_at.localeCompare(b.created_at));
    }
  }

  return Array.from(parents.values());
};

const fetchGuestbook = async (): Promise<GuestbookWithReplies[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("guestbook")
    .select(GUESTBOOK_FIELDS)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  if (!data?.length) return [];

  const userIds = Array.from(
    new Set(
      (data as GuestbookRow[])
        .map((item) => item.user_id)
        .filter((id): id is string => Boolean(id)),
    ),
  );

  let userMap: Record<string, UserProfile> = {};
  if (userIds.length) {
    const { data: users, error: profileError } = await supabase
      .from("profile")
      .select(PROFILE_FIELDS)
      .in("id", userIds);

    if (profileError) throw profileError;
    userMap = buildUserMap(users ?? []);
  }

  const enriched = (data as GuestbookRow[]).map((entry) =>
    mapGuestbookEntry(entry, userMap),
  );

  return attachReplies(enriched);
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
