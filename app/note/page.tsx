import { Metadata } from "next";

import { headers } from "next/headers";

import NoteSection from "@/components/section/note-section";
import { createClient } from "@/supabase/server";

export const metadata: Metadata = {
  title: "Note",
  description: "Leave an anonymous note and share your thoughts freely.",
};

export default async function Page() {
  const headerList = headers();
  const userHeader = headerList.get("x-user");

  let user = null;

  if (userHeader) {
    try {
      user = JSON.parse(userHeader);
    } catch (e) {
      console.error("Failed to parse user header", e);
    }
  }

  if (!user) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  return <NoteSection initialUser={user ?? null} />;
}

