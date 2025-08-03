export type UserProfile = {
  id: string;
  name: string | null;
  avatar_url: string | null;
};

export type GuestbookWithUser = {
  id: string;
  content: string;
  created_at: string;
  user: UserProfile | null;
  parent_id: string | null;
};

export type GuestbookWithReplies = GuestbookWithUser & {
  replies?: GuestbookWithUser[];
};
