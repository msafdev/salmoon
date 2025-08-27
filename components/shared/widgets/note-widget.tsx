import { PiArrowArcLeftBold } from "react-icons/pi";

import Link from "next/link";

import { User } from "@supabase/supabase-js";

import NoteDrawer from "@/components/shared/drawers/note-drawer";

const NoteWidget = ({ user }: { user: User | null }) => {
  return (
    <div className="absolute top-4 left-4 z-50 space-y-4">
      <Link
        href="/"
        aria-label="Go back"
        className="anim hover:bg-primary/40 hover:text-primary-foreground focus-visible:ring-ring/40 pointer-events-auto grid size-10 cursor-pointer place-items-center rounded-full bg-transparent ring-offset-transparent hover:backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-hidden"
      >
        <PiArrowArcLeftBold size={20} />
      </Link>

      <NoteDrawer user={user} />
    </div>
  );
};

export default NoteWidget;
