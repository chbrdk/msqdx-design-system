"use client";

import React from "react";
import { Box } from "@mui/material";
import { MSQDX_NEUTRAL } from "@msqdx/tokens";

export interface MsqdxBoardGridProps {
  visible: boolean;
  snapToGrid: boolean;
  zoom: number;
  className?: string;
}

export function MsqdxBoardGrid({ visible, zoom, className }: MsqdxBoardGridProps) {
  if (!visible) return null;

  const gridSize = 20 * zoom;

  return (
    <Box
      className={className}
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: `
          linear-gradient(to right, ${MSQDX_NEUTRAL[200]} 1px, transparent 1px),
          linear-gradient(to bottom, ${MSQDX_NEUTRAL[200]} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        opacity: 0.3,
      }}
    />
  );
}
