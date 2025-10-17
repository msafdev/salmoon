import { Metadata } from "next";

import NoteSection from "@/components/section/note-section";
import { createClient } from "@/supabase/server";

export const metadata: Metadata = {
  title: "Note",
  description: "Leave an anonymous note and share your thoughts freely.",
};

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NoteSection initialUser={user ?? null} />;
}

