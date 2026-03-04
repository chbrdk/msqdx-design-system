/**
 * Board canvas defaults and helpers.
 * Used by MsqdxBoardCanvas and MsqdxSimpleBoardCanvas.
 */
import type { Board, CanvasSettings, Prismion } from "../types/prismion";

export const CANVAS_DISPLAY_DEFAULTS: CanvasSettings = {
  backgroundColor: "#ffffff",
  patternColor: "#e5e7eb",
  patternSize: 20,
  background: "dots",
};

export const CANVAS_ZOOM = { min: 0.1, max: 3 } as const;

export function getCanvasSettings(board: Board | undefined): CanvasSettings {
  return board?.canvasSettings ?? CANVAS_DISPLAY_DEFAULTS;
}

/**
 * Returns true if a card at the given position and size would overlap any other
 * prismion. Used during drag to prevent dropping one card on top of another.
 */
export function wouldOverlap(
  excludePrismionId: string,
  position: { x: number; y: number },
  size: { w: number; h: number },
  allPrismions: Prismion[]
): boolean {
  const left = position.x;
  const right = position.x + size.w;
  const top = position.y;
  const bottom = position.y + size.h;
  for (const p of allPrismions) {
    if (p.id === excludePrismionId) continue;
    const oLeft = p.position.x;
    const oRight = p.position.x + p.size.w;
    const oTop = p.position.y;
    const oBottom = p.position.y + p.size.h;
    if (left < oRight && right > oLeft && top < oBottom && bottom > oTop) return true;
  }
  return false;
}
