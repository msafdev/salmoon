export type DatabaseColor =
  | "red"
  | "pink"
  | "blue"
  | "sky"
  | "green"
  | "emerald"
  | "purple"
  | "yellow"
  | "orange";

export type ColorOption =
  | "bg-yellow-200"
  | "bg-pink-200"
  | "bg-blue-200"
  | "bg-green-200"
  | "bg-purple-200"
  | "bg-orange-200"
  | "bg-red-200"
  | "bg-sky-200"
  | "bg-emerald-200";

export type DatabaseNote = {
  id: number;
  content: string;
  color: DatabaseColor;
  user_id: string;
  created_at: string;
};

export type SupabaseNote = {
  id: number;
  content: string;
  color: ColorOption;
  user_id: string;
  created_at: string;
};

export type Note = SupabaseNote & {
  gridX: number;
  gridY: number;
};
