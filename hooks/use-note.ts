import { useNote } from "@/query/note";

export type ColorOption =
  | "bg-yellow-200"
  | "bg-pink-200"
  | "bg-blue-200"
  | "bg-green-200"
  | "bg-purple-200"
  | "bg-orange-200"
  | "bg-red-200"
  | "bg-sky-200"
  | "bg-emerald-200";

export type SupabaseNote = {
  id: number;
  content: string;
  color: ColorOption;
  user_id: string;
  created_at: string;
};

export type Note = SupabaseNote & {
  gridX: number;
  gridY: number;
};

export function generateGridPositions(notes: SupabaseNote[]): Note[] {
  if (notes.length === 0) return [];

  const positions: Note[] = [];
  const usedPositions = new Set<string>();

  let currentRadius = 0;
  let noteIndex = 0;

  while (noteIndex < notes.length) {
    if (currentRadius === 0) {
      positions.push({
        ...notes[noteIndex],
        gridX: 0,
        gridY: 0,
      });
      usedPositions.add("0,0");
      noteIndex++;
      currentRadius++;
      continue;
    }

    const radiusPositions: { x: number; y: number }[] = [];

    for (let x = -currentRadius; x <= currentRadius; x++) {
      for (let y = -currentRadius; y <= currentRadius; y++) {
        if (Math.max(Math.abs(x), Math.abs(y)) === currentRadius) {
          const posKey = `${x},${y}`;
          if (!usedPositions.has(posKey)) {
            radiusPositions.push({ x, y });
          }
        }
      }
    }

    radiusPositions.sort((a, b) => {
      const distA = Math.sqrt(a.x * a.x + a.y * a.y);
      const distB = Math.sqrt(b.x * b.x + b.y * b.y);
      if (Math.abs(distA - distB) < 0.001) {
        const angleA = Math.atan2(a.y, a.x);
        const angleB = Math.atan2(b.y, b.x);
        return angleA - angleB;
      }
      return distA - distB;
    });

    for (const pos of radiusPositions) {
      if (noteIndex >= notes.length) break;

      positions.push({
        ...notes[noteIndex],
        gridX: pos.x,
        gridY: pos.y,
      });

      usedPositions.add(`${pos.x},${pos.y}`);
      noteIndex++;
    }

    currentRadius++;
  }

  return positions;
}

export function useStickyNotes(offsetX: number, offsetY: number) {
  const gridSize = 150;
  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1920;
  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 1080;

  const centerX = viewportWidth / 2;
  const centerY = viewportHeight / 2;

  const { data: notes = [] } = useNote();

  const visibleNotes = notes.filter((note) => {
    const pixelX = note.gridX * gridSize + offsetX + centerX;
    const pixelY = note.gridY * gridSize + offsetY + centerY;

    const padding = gridSize;

    return (
      pixelX > -padding &&
      pixelX < viewportWidth + padding &&
      pixelY > -padding &&
      pixelY < viewportHeight + padding
    );
  });

  return {
    visibleNotes,
    gridSize,
    allNotes: notes,
    centerX,
    centerY,
  };
}
