export type UserProfile = {
  id: string;
  name: string | null;
  avatar_url: string | null;
};

export type GuestbookWithUser = {
  id: string;
  content: string;
  user: UserProfile | null;
  parent_id: string | null;
  created_at: string;
};

export type GuestbookWithReplies = GuestbookWithUser & {
  replies?: GuestbookWithUser[];
};
