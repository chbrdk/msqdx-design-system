"use client";

import React, { useState, useCallback } from "react";
import type { Board, Prismion, Connection, BoardParticipant } from "../../../types/prismion";
import { MsqdxBoardCanvas } from "../BoardCanvas";
import { CANVAS_ZOOM } from "../../../lib/board-utils";

export interface MsqdxBoardCanvasFunctionalProps
  extends Omit<
    React.ComponentProps<typeof MsqdxBoardCanvas>,
    "zoom" | "pan" | "onZoomChange" | "onPanChange"
  > {
  /** Initial zoom. @default 1 */
  initialZoom?: number;
  /** Initial pan. @default { x: 0, y: 0 } */
  initialPan?: { x: number; y: number };
}

/**
 * BoardCanvas with internal zoom/pan state. Use this when the host does not need to control viewport.
 * For controlled mode, use MsqdxBoardCanvas directly with zoom/pan/onZoomChange/onPanChange.
 */
export function MsqdxBoardCanvasFunctional({
  initialZoom = 1,
  initialPan = { x: 0, y: 0 },
  ...rest
}: MsqdxBoardCanvasFunctionalProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState(initialPan);

  const handleZoomChange = useCallback((z: number) => {
    setZoom((prev) => Math.max(CANVAS_ZOOM.min, Math.min(CANVAS_ZOOM.max, z)));
  }, []);

  const handlePanChange = useCallback((p: { x: number; y: number }) => {
    setPan(p);
  }, []);

  return (
    <MsqdxBoardCanvas
      {...rest}
      zoom={zoom}
      pan={pan}
      onZoomChange={handleZoomChange}
      onPanChange={handlePanChange}
    />
  );
}
