"use client";

import { useQuery } from "@tanstack/react-query";

import {
  ColorOption,
  SupabaseNote,
  generateGridPositions,
} from "@/hooks/use-note";
import { createClient } from "@/supabase/client";
import { Note } from "@/types/note.types";

const fetchNote = async (): Promise<Note[]> => {
  const supabase = createClient();
  const { data: note, error: noteError } = await supabase
    .from("note")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(200);

  if (noteError) throw noteError;

  const colorMap: Record<string, ColorOption> = {
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

  const allowedColors: ColorOption[] = [
    "bg-yellow-200",
    "bg-pink-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-orange-200",
  ];

  const mappedNotes = (note ?? []).map((noteItem) => ({
    ...noteItem,
    color: colorMap[noteItem.color] ?? allowedColors[0],
  })) as SupabaseNote[];

  return generateGridPositions(mappedNotes);
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
  });
};
