export type HighlightSwatch = {
  label: string;
  value: string;
  foreground?: string;
};

export type SelectionOffsets = {
  start: number;
  end: number;
};

export type StoredHighlight = SelectionOffsets & {
  id: string;
  color: string;
  foreground?: string;
};

export const HIGHLIGHT_SWATCHES: readonly HighlightSwatch[] = [
  { label: "Dawn", value: "#fef08a", foreground: "#713f12" },
  { label: "Blush", value: "#fecdd3", foreground: "#831843" },
  { label: "Lagoon", value: "#bfdbfe", foreground: "#0c4a6e" },
  { label: "Mint", value: "#bbf7d0", foreground: "#065f46" },
  { label: "Lilac", value: "#ddd6fe", foreground: "#5b21b6" },
] as const;

export function getPalettePlacement(): "above" | "below" {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "above";
  }

  return window.matchMedia("(max-width: 640px)").matches ? "below" : "above";
}

export function getSelectionOffsets(
  container: HTMLElement,
  range: Range,
): SelectionOffsets | null {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let start: number | null = null;
  let end: number | null = null;
  let offset = 0;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const textLength = node.textContent?.length ?? 0;

    if (node === range.startContainer) {
      start = offset + range.startOffset;
    }

    if (node === range.endContainer) {
      end = offset + range.endOffset;
      break;
    }

    offset += textLength;
  }

  if (start === null || end === null || start === end) {
    return null;
  }

  const text = range.toString();
  if (!text) {
    return null;
  }

  const leadingTrim = text.length - text.trimStart().length;
  const trailingTrim = text.length - text.trimEnd().length;
  const normalizedStart = start + leadingTrim;
  const normalizedEnd = end - trailingTrim;

  if (normalizedStart >= normalizedEnd) {
    return null;
  }

  return { start: normalizedStart, end: normalizedEnd };
}

export function getSelectedHighlightFromRange(
  range: Range,
  highlights: StoredHighlight[],
) {
  const startNode = findHighlightNode(range.startContainer);
  const endNode = findHighlightNode(range.endContainer);

  if (!startNode || !endNode) {
    return null;
  }

  const startId = startNode.dataset.highlightId;
  const endId = endNode.dataset.highlightId;
  if (!startId || !endId || startId !== endId) {
    return null;
  }

  return highlights.find((item) => item.id === startId) ?? null;
}

export function clearNativeSelection() {
  if (typeof window === "undefined") {
    return;
  }

  const selection = window.getSelection();
  selection?.removeAllRanges();
}

export function unwrapHighlight(container: HTMLElement, highlightId: string) {
  const nodes = container.querySelectorAll<HTMLElement>(
    `[data-highlight-id="${highlightId}"]`,
  );

  nodes.forEach((node) => {
    if (!node.parentNode) {
      return;
    }

    node.dataset.highlightState = "removing";
    node.style.animation = "none";
    node.style.removeProperty("box-shadow");

    const parent = node.parentNode;
    while (node.firstChild) {
      parent.insertBefore(node.firstChild, node);
    }
    parent.removeChild(node);
  });
}

export function resetHighlights(container: HTMLElement) {
  const seen = new Set<string>();

  container.querySelectorAll<HTMLElement>("[data-highlight-id]").forEach((node) => {
    const id = node.dataset.highlightId;
    if (id && !seen.has(id)) {
      unwrapHighlight(container, id);
      seen.add(id);
    }
  });
}

export function applyHighlight(container: HTMLElement, highlight: StoredHighlight) {
  const range = createRangeFromOffsets(
    container,
    highlight.start,
    highlight.end,
  );

  if (!range) {
    return false;
  }

  const segments = buildHighlightSegments(
    container,
    highlight.start,
    highlight.end,
  );

  if (segments.length === 0) {
    return false;
  }

  segments.forEach((segment) => {
    const segmentRange = document.createRange();
    segmentRange.setStart(segment.node, segment.startOffset);
    segmentRange.setEnd(segment.node, segment.endOffset);

    const node = createHighlightNode(highlight);
    const contents = segmentRange.extractContents();
    node.appendChild(contents);
    segmentRange.insertNode(node);
    segmentRange.detach();
  });

  range.detach();
  return true;
}

export function cryptoRandom() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function findHighlightNode(node: Node | null): HTMLElement | null {
  let current: Node | null = node;

  while (current) {
    if (current instanceof HTMLElement && current.dataset.highlightId) {
      return current;
    }

    current = current.parentNode;
  }

  return null;
}

function createRangeFromOffsets(
  container: HTMLElement,
  start: number,
  end: number,
) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let offset = 0;
  let startSet = false;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const length = node.textContent?.length ?? 0;

    if (!startSet && start <= offset + length) {
      range.setStart(node, Math.max(0, start - offset));
      startSet = true;
    }

    if (startSet && end <= offset + length) {
      range.setEnd(node, Math.max(0, end - offset));
      return range;
    }

    offset += length;
  }

  return null;
}

type HighlightSegment = {
  node: Text;
  startOffset: number;
  endOffset: number;
};

function buildHighlightSegments(
  container: HTMLElement,
  start: number,
  end: number,
): HighlightSegment[] {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const segments: HighlightSegment[] = [];
  let offset = 0;

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const length = node.textContent?.length ?? 0;
    const nodeStart = offset;
    const nodeEnd = offset + length;

    if (nodeEnd <= start) {
      offset = nodeEnd;
      continue;
    }

    if (nodeStart >= end) {
      break;
    }

    const segmentStart = Math.max(start, nodeStart);
    const segmentEnd = Math.min(end, nodeEnd);

    if (segmentStart < segmentEnd) {
      segments.push({
        node,
        startOffset: segmentStart - nodeStart,
        endOffset: segmentEnd - nodeStart,
      });
    }

    offset = nodeEnd;
  }

  return segments;
}

function createHighlightNode(highlight: StoredHighlight) {
  const node = document.createElement("mark");
  node.dataset.highlightId = highlight.id;
  node.dataset.highlightState = "user";
  node.className = "text-highlight";
  node.tabIndex = 0;
  node.setAttribute("role", "button");
  node.style.setProperty("--highlight-color", highlight.color);
  if (highlight.foreground) {
    node.style.setProperty("--highlight-foreground", highlight.foreground);
  } else {
    node.style.removeProperty("--highlight-foreground");
  }
  return node;
}
