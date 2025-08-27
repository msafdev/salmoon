import { Metadata } from "next";

import NoteSection from "@/components/section/note-section";

export const metadata: Metadata = {
  title: "Note",
  description: "Leave an anonymous note and share your thoughts freely.",
};

export default function Page() {
  return <NoteSection />;
}
