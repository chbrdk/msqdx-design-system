"use client";

import React from "react";
import { Box } from "@mui/material";
import { MSQDX_SPACING, MSQDX_NEUTRAL, MSQDX_TYPOGRAPHY, MSQDX_EFFECTS } from "@msqdx/tokens";

export interface MsqdxCommandPaletteProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
}

export function MsqdxCommandPalette({
  open,
  onClose,
  children,
  title = "Command Palette",
}: MsqdxCommandPaletteProps) {
  if (!open) return null;

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          border: `1px solid ${MSQDX_NEUTRAL[200]}`,
          borderRadius: MSQDX_SPACING.borderRadius.lg,
          boxShadow: MSQDX_EFFECTS.shadows.xl,
          padding: MSQDX_SPACING.padding.md,
          minWidth: 384,
        }}
      >
        <Box sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, color: MSQDX_NEUTRAL[500], marginBottom: 1 }}>
          {title}
        </Box>
        {children ?? <Box sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, color: MSQDX_NEUTRAL[500] }}>Coming soon...</Box>}
      </Box>
    </Box>
  );
}
