"use client";

import type React from "react";
import { useCallback, useState } from "react";

interface DragState {
  isDragging: boolean;
  dragStart: {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  };
}

export function useCanvasDrag(initialOffsetX = 0, initialOffsetY = 0) {
  const [offsetX, setOffsetX] = useState(initialOffsetX);
  const [offsetY, setOffsetY] = useState(initialOffsetY);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragStart: { x: 0, y: 0, offsetX: 0, offsetY: 0 },
  });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setDragState({
        isDragging: true,
        dragStart: {
          x: e.clientX,
          y: e.clientY,
          offsetX,
          offsetY,
        },
      });
    },
    [offsetX, offsetY],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState.isDragging) return;

      const deltaX = e.clientX - dragState.dragStart.x;
      const deltaY = e.clientY - dragState.dragStart.y;

      const newOffsetX = dragState.dragStart.offsetX + deltaX;
      const newOffsetY = dragState.dragStart.offsetY + deltaY;

      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
    },
    [dragState],
  );

  const handlePointerUp = useCallback(() => {
    setDragState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  return {
    offsetX,
    offsetY,
    isDragging: dragState.isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
