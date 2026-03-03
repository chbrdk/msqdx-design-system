/**
 * Board canvas defaults and helpers.
 * Used by MsqdxBoardCanvas and MsqdxSimpleBoardCanvas.
 */
import type { Board, CanvasSettings } from "../types/prismion";

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
