import { motion } from "motion/react";

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
  // Position notes relative to center of viewport
  const pixelX = note.gridX * gridSize + offsetX + centerX - gridSize / 2;
  const pixelY = note.gridY * gridSize + offsetY + centerY - gridSize / 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 20,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { delay: Math.random() * 0.2 },
      }}
      className={`absolute h-28 w-32 ${note.color} pointer-events-none z-10 transform-gpu px-3 py-2 shadow-md transition-shadow duration-200 select-none hover:shadow-lg`}
      style={{
        left: pixelX,
        top: pixelY,
      }}
    >
      <Scribble className="block text-left text-sm leading-snug font-medium break-words text-zinc-800">
        {note.content} {/* max 50 chars */}
      </Scribble>
    </motion.div>
  );
};

export default NoteCard;
