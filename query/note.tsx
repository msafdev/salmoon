"use client";

import { useQuery } from "@tanstack/react-query";

import {
  ColorOption,
  SupabaseNote,
  generateGridPositions,
} from "@/hooks/use-note";
import { createClient } from "@/supabase/client";
import { DatabaseNote, Note } from "@/types/note.types";

const NOTE_FIELDS = "id, content, color, user_id, created_at";
const COLOR_MAP: Record<string, ColorOption> = {
  yellow: "bg-yellow-200",
  pink: "bg-pink-200",
  blue: "bg-blue-200",
  green: "bg-green-200",
  purple: "bg-purple-200",
  orange: "bg-orange-200",
  red: "bg-red-200",
  sky: "bg-sky-200",
  emerald: "bg-emerald-200",
};
const DEFAULT_COLOR: ColorOption = "bg-yellow-200";

const normalizeNotes = (notes: DatabaseNote[]): SupabaseNote[] => {
  if (!notes.length) return [];

  return notes.map(({ color, ...rest }) => ({
    ...rest,
    color: COLOR_MAP[color] ?? DEFAULT_COLOR,
  }));
};

const fetchNote = async (): Promise<Note[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("note")
    .select(NOTE_FIELDS)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) throw error;
  if (!data?.length) return [];

  const normalizedNotes = normalizeNotes(data as DatabaseNote[]);

  return generateGridPositions(normalizedNotes);
};

export const useNote = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: fetchNote,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
    placeholderData: [] as Note[],
    refetchOnWindowFocus: false,
  });
};







