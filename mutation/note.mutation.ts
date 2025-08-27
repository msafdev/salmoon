import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/supabase/client";
import { DatabaseColor } from "@/types/note.types";

type NoteRequest = {
  note: string;
  color: DatabaseColor;
};

const noteMutation = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const addNoteMutation = useMutation({
    mutationFn: async ({ note, color }: NoteRequest) => {
      const { data, error } = await supabase
        .from("note")
        .insert({
          content: note,
          color: color,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async ({ note, color }) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });

      const previousNotes = queryClient.getQueryData(["notes"]);

      const optimisticNote = {
        id: Date.now(),
        content: note,
        color: color,
        user_id: "temp",
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData(["notes"], (oldNotes: any[] = []) => {
        const allSupabaseNotes = oldNotes.map((note) => ({
          id: note.id,
          content: note.content,
          color: note.color,
          user_id: note.user_id,
          created_at: note.created_at,
        }));

        const updatedSupabaseNotes = [...allSupabaseNotes, optimisticNote];

        return updatedSupabaseNotes.map((note, index) => ({
          ...note,
          gridX: index === 0 ? 0 : Math.floor((index - 1) / 8) + 1,
          gridY: index === 0 ? 0 : ((index - 1) % 8) - 4,
        }));
      });

      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      queryClient.setQueryData(["notes"], context?.previousNotes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    addNoteMutation,
  };
};

export default noteMutation;
