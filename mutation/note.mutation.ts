"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { generateGridPositions } from "@/hooks/use-note";
import { createClient } from "@/supabase/client";
import type { DatabaseColor, Note, SupabaseNote } from "@/types/note.types";
import { showMutationToast } from "@/mutation/mutation.utils";

type NoteRequest = {
  note: string;
  color: DatabaseColor;
};

type MutationContext = {
  previousNotes: Note[] | undefined;
};

const NOTES_QUERY_KEY = ["notes"] as const;

const COLOR_OPTION_MAP: Record<DatabaseColor, SupabaseNote['color']> = {
  red: "bg-red-200",
  pink: "bg-pink-200",
  blue: "bg-blue-200",
  sky: "bg-sky-200",
  green: "bg-green-200",
  emerald: "bg-emerald-200",
  purple: "bg-purple-200",
  yellow: "bg-yellow-200",
  orange: "bg-orange-200",
};

const DEFAULT_COLOR_OPTION = COLOR_OPTION_MAP.yellow;

const toSupabaseNotes = (notes: Note[] | undefined): SupabaseNote[] => {
  if (!notes?.length) return [];

  return notes.map(({ id, content, color, user_id, created_at }) => ({
    id,
    content,
    color,
    user_id,
    created_at,
  }));
};

const AUTH_ERROR_CODES = new Set([
  "42501",
  "401",
  "PGRST301",
  "PGRST302",
  "PGRST303",
]);

const isAuthRelatedNoteError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;

  const { code, message } = error as { code?: string | number; message?: string };

  const normalizedCode = typeof code === "number" ? String(code) : code;
  const normalizedMessage =
    typeof message === "string" ? message.toLowerCase() : "";

  if (normalizedCode && AUTH_ERROR_CODES.has(normalizedCode)) {
    return true;
  }

  if (!normalizedMessage) return false;

  return (
    normalizedMessage.includes("row-level security") ||
    normalizedMessage.includes("permission denied") ||
    normalizedMessage.includes("auth session") ||
    normalizedMessage.includes("jwt")
  );
};

const getNoteErrorMessage = (error: unknown) =>
  isAuthRelatedNoteError(error)
    ? "Please login first"
    : "Something went wrong";

const noteMutation = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const addNoteMutation = useMutation<unknown, unknown, NoteRequest, MutationContext>({
    mutationFn: async ({ note, color }: NoteRequest) => {
      const { data, error } = await supabase
        .from("note")
        .insert({
          content: note,
          color,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async ({ note, color }) => {
      await queryClient.cancelQueries({ queryKey: NOTES_QUERY_KEY });

      const previousNotes = queryClient.getQueryData<Note[]>(NOTES_QUERY_KEY);
      const optimisticColor = COLOR_OPTION_MAP[color] ?? DEFAULT_COLOR_OPTION;
      const optimisticNote: SupabaseNote = {
        id: Date.now(),
        content: note,
        color: optimisticColor,
        user_id: "temp",
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData(NOTES_QUERY_KEY, () => {
        const existingNotes = toSupabaseNotes(previousNotes);
        return generateGridPositions([...existingNotes, optimisticNote]);
      });

      return { previousNotes };
    },
    onSuccess: () => {
      showMutationToast("Message added successfully", "success");
      queryClient.invalidateQueries({ queryKey: NOTES_QUERY_KEY });
    },
    onError: (error, _variables, context) => {
      showMutationToast(getNoteErrorMessage(error), "error");

      if (context?.previousNotes) {
        queryClient.setQueryData(NOTES_QUERY_KEY, context.previousNotes);
      } else {
        queryClient.setQueryData(NOTES_QUERY_KEY, []);
      }
    },
  });

  return {
    addNoteMutation,
  };
};

export default noteMutation;






