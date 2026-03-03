"use client";

import React from "react";
import { Box } from "@mui/material";
import { MSQDX_SPACING, MSQDX_NEUTRAL, MSQDX_EFFECTS, MSQDX_TYPOGRAPHY } from "@msqdx/tokens";

export interface MsqdxContextMenuProps {
  open: boolean;
  x: number;
  y: number;
  onClose: () => void;
  children?: React.ReactNode;
  /** Optional title shown at top */
  title?: string;
}

export function MsqdxContextMenu({
  open,
  x,
  y,
  onClose,
  children,
  title = "Context Menu",
}: MsqdxContextMenuProps) {
  if (!open) return null;

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "absolute",
          left: x,
          top: y,
          backgroundColor: "#fff",
          border: `1px solid ${MSQDX_NEUTRAL[200]}`,
          borderRadius: "40px",
          boxShadow: MSQDX_EFFECTS.shadows.lg,
          padding: "8px",
          minWidth: "192px",
        }}
      >
        <Box
          sx={{
            fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
            color: MSQDX_NEUTRAL[500],
            padding: `${MSQDX_SPACING.padding.xs}px ${MSQDX_SPACING.padding.sm}px`,
          }}
        >
          {title}
        </Box>
        {children}
      </Box>
    </Box>
  );
}
