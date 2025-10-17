import { useRef } from "react";

import Scribble from "@/components/shared/scribble";

import type { Note as NoteCardType } from "@/hooks/use-note";

interface NoteCardProps {
  note: NoteCardType;
  offsetX: number;
  offsetY: number;
  gridSize: number;
  centerX: number;
  centerY: number;
}

const NoteCard = ({
  note,
  offsetX,
  offsetY,
  gridSize,
  centerX,
  centerY,
}: NoteCardProps) => {
  const pixelX = note.gridX * gridSize + offsetX + centerX - gridSize / 2;
  const pixelY = note.gridY * gridSize + offsetY + centerY - gridSize / 2;

  const rotationRef = useRef(Math.random() * 6 - 3);

  return (
    <div
      className={`absolute h-28 w-32 ${note.color} pointer-events-none z-10 select-none px-3 py-2 shadow-md transition-transform duration-200`}
      style={{
        left: pixelX,
        top: pixelY,
        transform: `translateZ(0) rotate(${rotationRef.current}deg)`,
      }}
    >
      <Scribble className="block text-left text-sm leading-snug font-medium break-words text-zinc-800">
        {note.content}
      </Scribble>
    </div>
  );
};

export default NoteCard;
