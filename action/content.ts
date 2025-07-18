"use server";

import { createClient } from "@/supabase/server";

import { revalidatePath } from "next/cache";

export async function addContent(formData: FormData) {
  const content = formData.get("content") as string;

  if (!content || content.length < 3) {
    return { error: "Content must be at least 3 characters" };
  }

  if (content.length > 100) {
    return { error: "Content must be less than 100 characters" };
  }

  try {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user.user) {
      return { error: "User not found" };
    }

    const { error } = await supabase.from("guestbook").insert({
      content: content.trim(),
      user_id: user.user.id,
    });

    if (error) {
      console.error("Database error:", error);
      return { error: `${error.message}` };
    }

    revalidatePath("/guestbook");
    return { data: "Content posted successfully" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}
