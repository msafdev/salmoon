"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/supabase/client";
import {
  GuestbookWithReplies,
  GuestbookWithUser,
  UserProfile,
} from "@/types/guestbook.types";

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
    .select("id, content, created_at, user_id, parent_id, profile(id, name, avatar_url)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw error;
  if (!data?.length) return [];

  const enriched: GuestbookWithUser[] = data.map((entry: any) => ({
    id: String(entry.id),
    content: entry.content,
    created_at: entry.created_at,
    user: entry.profile ?? null,
    parent_id: entry.parent_id ? String(entry.parent_id) : null,
  }));

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
