"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/supabase/server";
import { DatabaseColor } from "@/types/note.types";

export async function addNote(formData: FormData) {
  const note = formData.get("note") as string;
  const color = formData.get("color") as DatabaseColor;

  if (!note || note.length < 3) {
    return { error: "Note must be at least 3 characters" };
  }

  if (note.length > 50) {
    return { error: "Note must be less than 50 characters" };
  }

  try {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user.user) {
      return { error: "User not found" };
    }

    const { error } = await supabase.from("note").insert({
      content: note.trim() as string,
      color: color as DatabaseColor,
      user_id: user.user.id,
    });

    if (error) {
      console.error("Database error:", error);
      return { error: `${error.message}` };
    }

    revalidatePath("/note");
    return { data: "Note posted successfully" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}
