"use server";

import { createClient } from "@/supabase/server";

import { revalidatePath } from "next/cache";

export async function addContent(formData: FormData) {
  let content = formData.get("content") as string;

  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();
  const user_id = user.user?.id;

  if (!user.user) {
    return { error: "⛔ User not found" };
  }

  if (content.length < 3) {
    return { error: "❌ Content must be at least 3 characters" };
  } else if (content.length > 100) {
    return { error: "❌ Content must be less than 100 characters" };
  }

  const { error } = await supabase.from("guestbook").insert([
    {
      content: content,
      user_id: user_id,
    },
  ]);

  if (error) {
    return { error: `😵‍💫 ${error.message}` };
  } else {
    revalidatePath("/guestbook");
    return { data: "👍 Data inserted successfully" };
  }
}
