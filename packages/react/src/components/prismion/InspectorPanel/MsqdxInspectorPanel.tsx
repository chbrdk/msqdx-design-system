"use client";

import React from "react";
import { Box } from "@mui/material";
import { MSQDX_SPACING, MSQDX_NEUTRAL, MSQDX_TYPOGRAPHY, MSQDX_EFFECTS } from "@msqdx/tokens";

export interface MsqdxInspectorPanelProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  width?: number;
}

export function MsqdxInspectorPanel({
  open,
  children,
  title = "Inspector Panel",
  width = 320,
}: MsqdxInspectorPanelProps) {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100%",
        width,
        backgroundColor: "#fff",
        borderLeft: `1px solid ${MSQDX_NEUTRAL[200]}`,
        boxShadow: MSQDX_EFFECTS.shadows.lg,
        zIndex: 40,
      }}
    >
      <Box sx={{ padding: MSQDX_SPACING.padding.md }}>
        <Box sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, color: MSQDX_NEUTRAL[500], marginBottom: 1 }}>
          {title}
        </Box>
        {children ?? <Box sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, color: MSQDX_NEUTRAL[500] }}>Coming soon...</Box>}
      </Box>
    </Box>
  );
}
