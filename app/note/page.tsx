"use client";

import { AnimatePresence } from "motion/react";

import { useQuery } from "@tanstack/react-query";

import NoteCard from "@/components/shared/cards/note-card";
import NoteNav from "@/components/shared/note-nav";

import { useCanvasDrag } from "@/hooks/use-canvas";
import { useStickyNotes } from "@/hooks/use-note";
import { createClient } from "@/supabase/client";

export default function Page() {
  const supabase = createClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
  });

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
      <NoteNav />
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
        <AnimatePresence mode="sync">
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
        </AnimatePresence>
      </div>
    </div>
  );
}
