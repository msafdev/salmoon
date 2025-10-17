"use client";

import type { User } from "@supabase/supabase-js";

import NoteCard from "@/components/shared/cards/note-card";
import NoteWidget from "@/components/shared/widgets/note-widget";

import { useCanvasDrag } from "@/hooks/use-canvas";
import { useStickyNotes } from "@/hooks/use-note";

type NoteSectionProps = {
  initialUser: User | null;
};

const NoteSection = ({ initialUser }: NoteSectionProps) => {
  const {
    offsetX,
    offsetY,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useCanvasDrag();

  const { visibleNotes, gridSize, centerX, centerY } = useStickyNotes(
    offsetX,
    offsetY,
  );

  return (
    <div
      className="bg-background relative h-screen w-full overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
    >
      <NoteWidget user={initialUser} />

      <div className="relative h-full w-full">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            backgroundPosition: `${offsetX % gridSize}px ${offsetY % gridSize}px`,
          }}
        />

        {visibleNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            offsetX={offsetX}
            offsetY={offsetY}
            gridSize={gridSize}
            centerX={centerX}
            centerY={centerY}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteSection;
