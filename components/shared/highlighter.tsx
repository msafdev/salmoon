"use client";

import { AnimatePresence, motion } from "motion/react";

import { PiXBold } from "react-icons/pi";

import {
  MutableRefObject,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";

import {
  HIGHLIGHT_SWATCHES,
  HighlightSwatch,
  SelectionOffsets,
  StoredHighlight,
  applyHighlight,
  clearNativeSelection,
  cryptoRandom,
  getPalettePlacement,
  getSelectedHighlightFromRange,
  getSelectionOffsets,
  resetHighlights,
  unwrapHighlight,
} from "@/lib/highlight";
import { cn } from "@/lib/utils";

type PaletteState = {
  x: number;
  y: number;
  offsets: SelectionOffsets;
  highlightId?: string;
  placement?: "above" | "below";
};

type HighlighterProps = {
  slug: string;
  children: ReactNode;
  className?: string;
};

export function TextHighlighter({
  slug,
  children,
  className,
}: HighlighterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const [palette, setPalette] = useState<PaletteState | null>(null);
  const [storedHighlights, setStoredHighlights] = useState<StoredHighlight[]>(
    [],
  );

  useEffect(() => {
    setStoredHighlights([]);
    setPalette(null);

    const node = containerRef.current;
    if (!node) {
      return;
    }

    resetHighlights(node);

    return () => {
      resetHighlights(node);
    };
  }, [slug]);

  const closePalette = useCallback(() => setPalette(null), []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        closePalette();
      }
    };

    const handleScroll = () => closePalette();
    const handleResize = () => closePalette();

    document.addEventListener("selectionchange", handleSelectionChange);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [closePalette]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!paletteRef.current) {
        return;
      }
      if (paletteRef.current.contains(event.target as Node)) {
        return;
      }
      closePalette();
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [closePalette]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePalette();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closePalette]);

  const handleSelection = useCallback(() => {
    if (typeof window === "undefined" || !containerRef.current) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      setPalette(null);
      return;
    }

    const { anchorNode, focusNode } = selection;
    if (
      !anchorNode ||
      !focusNode ||
      !containerRef.current.contains(anchorNode) ||
      !containerRef.current.contains(focusNode)
    ) {
      setPalette(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const rawValue = range.toString();
    if (!rawValue || rawValue.trim().length === 0) {
      setPalette(null);
      return;
    }

    const offsets = getSelectionOffsets(containerRef.current, range);
    if (!offsets) {
      setPalette(null);
      return;
    }

    const selectedHighlight = getSelectedHighlightFromRange(
      range,
      storedHighlights,
    );

    const rect = range.getBoundingClientRect();
    const placement = getPalettePlacement();
    setPalette({
      x: rect.left + rect.width / 2 + window.scrollX,
      y:
        placement === "above"
          ? rect.top + window.scrollY - 12
          : rect.bottom + window.scrollY + 12,
      offsets: selectedHighlight
        ? { start: selectedHighlight.start, end: selectedHighlight.end }
        : offsets,
      highlightId: selectedHighlight?.id,
      placement,
    });
  }, [storedHighlights]);

  const handleColorSelect = useCallback(
    (swatch: HighlightSwatch) => {
      if (!palette || !containerRef.current) {
        return;
      }

      const highlight: StoredHighlight = {
        ...palette.offsets,
        color: swatch.value,
        foreground: swatch.foreground,
        id: palette.highlightId ?? cryptoRandom(),
      };

      if (palette.highlightId) {
        unwrapHighlight(containerRef.current, palette.highlightId);
      }

      const applied = applyHighlight(containerRef.current, highlight);
      if (!applied) {
        closePalette();
        return;
      }

      setStoredHighlights((prev) =>
        palette.highlightId
          ? prev.map((item) => (item.id === highlight.id ? highlight : item))
          : [...prev, highlight],
      );
      clearNativeSelection();
      closePalette();
    },
    [palette, closePalette],
  );

  const handleRemoveHighlight = useCallback(() => {
    if (!palette?.highlightId || !containerRef.current) {
      return;
    }

    const targetId = palette.highlightId;
    unwrapHighlight(containerRef.current, targetId);

    setStoredHighlights((prev) => prev.filter((item) => item.id !== targetId));
    clearNativeSelection();
    closePalette();
  }, [palette, closePalette]);

  const handleHighlightClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const highlightEl = target?.closest<HTMLElement>("[data-highlight-id]");

      if (!highlightEl || !containerRef.current.contains(highlightEl)) {
        return;
      }

      const highlightId = highlightEl.dataset.highlightId;
      if (!highlightId) {
        return;
      }

      const highlightData = storedHighlights.find(
        (item) => item.id === highlightId,
      );
      if (!highlightData) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const rect = highlightEl.getBoundingClientRect();
      const placement = getPalettePlacement();
      setPalette({
        x: rect.left + rect.width / 2 + window.scrollX,
        y:
          placement === "above"
            ? rect.top + window.scrollY - 12
            : rect.bottom + window.scrollY + 12,
        offsets: {
          start: highlightData.start,
          end: highlightData.end,
        },
        highlightId,
        placement,
      });
    },
    [storedHighlights],
  );

  return (
    <>
      <div
        ref={containerRef}
        className={cn("relative", className)}
        onClick={handleHighlightClick}
        onPointerUp={handleSelection}
        onMouseUp={handleSelection}
        onKeyUp={(event) => {
          if (event.key === "Enter" || event.key === "Shift") {
            handleSelection();
          }
        }}
      >
        {children}
      </div>

      <AnimatePresence>
        {palette ? (
          <ColorPalette
            palette={palette}
            onSelect={handleColorSelect}
            paletteRef={paletteRef}
            options={HIGHLIGHT_SWATCHES}
            highlightId={palette.highlightId}
            onRemoveHighlight={handleRemoveHighlight}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

type PaletteProps = {
  palette: PaletteState;
  onSelect: (swatch: HighlightSwatch) => void;
  paletteRef: MutableRefObject<HTMLDivElement | null>;
  options: readonly HighlightSwatch[];
  highlightId?: string;
  onRemoveHighlight?: () => void;
};

function ColorPalette({
  palette,
  onSelect,
  paletteRef,
  options,
  highlightId,
  onRemoveHighlight,
}: PaletteProps) {
  if (typeof document === "undefined") {
    return null;
  }

  const placement = palette.placement ?? "above";
  const translate =
    placement === "above" ? "translate(-50%, -100%)" : "translate(-50%, 0)";
  const motionYOffset = placement === "above" ? 10 : -10;
  const exitYOffset = placement === "above" ? 8 : -8;

  return createPortal(
    <div
      className="pointer-events-none absolute z-50"
      style={{
        top: palette.y,
        left: palette.x,
        transform: translate,
      }}
    >
      <motion.div
        ref={paletteRef}
        initial={{ opacity: 0, scale: 0.9, y: motionYOffset }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: exitYOffset }}
        transition={{ type: "spring", stiffness: 360, damping: 26 }}
        className="text-foreground/80 highlight-palette bg-card/90 backdrop-blur-xs pointer-events-auto flex items-center gap-1 rounded border px-1 py-1 shadow-xs"
        onPointerDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {options.map((option) => (
          <Button
            key={option.label}
            type="button"
            size="icon"
            className="size-6 rounded-[2px]"
            aria-label={`Highlight with ${option.label}`}
            title={`Highlight with ${option.label}`}
            style={{ backgroundColor: option.value }}
            onPointerDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onSelect(option);
            }}
          />
        ))}
        {highlightId && onRemoveHighlight ? (
          <Button
            type="button"
            size="icon"
            className="size-6 rounded-[2px]"
            aria-label="Remove highlight"
            title="Remove highlight"
            variant="secondary"
            onPointerDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onRemoveHighlight();
            }}
          >
            <PiXBold className="!size-3.5" />
          </Button>
        ) : null}
      </motion.div>
    </div>,
    document.body,
  );
}
