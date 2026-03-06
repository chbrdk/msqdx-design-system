"use client";

import React from "react";
import { Box } from "@mui/material";
import { SquareDashedBottomCode } from "lucide-react";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import {
  MSQDX_SPACING,
  MSQDX_NEUTRAL,
  MSQDX_TYPOGRAPHY,
  MSQDX_BRAND_COLOR_CSS,
} from "@msqdx/tokens";

const toolbarButtonSx = {
  color: MSQDX_BRAND_COLOR_CSS,
  borderColor: MSQDX_BRAND_COLOR_CSS,
  "&:hover": {
    color: MSQDX_BRAND_COLOR_CSS,
    borderColor: MSQDX_BRAND_COLOR_CSS,
    backgroundColor: "color-mix(in srgb, var(--color-theme-accent, #00ca55) 12%, transparent)",
  },
};

export interface MsqdxBoardToolbarProps {
  className?: string;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  pan: { x: number; y: number };
  onPanChange: (pan: { x: number; y: number }) => void;
  presenterMode?: boolean;
  onPresenterModeChange?: (enabled: boolean) => void;
  followingPresenter?: boolean;
  onFollowingPresenterChange?: (enabled: boolean) => void;
  /** When true, next drag on empty canvas will draw a selection rectangle. */
  marqueeSelectActive?: boolean;
  /** Call when user clicks the "Select area" tool to toggle marquee mode. */
  onMarqueeSelectClick?: () => void;
  /** Optional extra content rendered after the built-in toolbar actions (e.g. CHECKION MCP toggle). */
  extra?: React.ReactNode;
}

export function MsqdxBoardToolbar({
  className,
  zoom,
  onZoomChange,
  onPanChange,
  presenterMode = false,
  onPresenterModeChange,
  followingPresenter = false,
  onFollowingPresenterChange,
  marqueeSelectActive = false,
  onMarqueeSelectClick,
  extra,
}: MsqdxBoardToolbarProps) {
  return (
    <Box
      className={className}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 2,
        border: `1px solid ${MSQDX_NEUTRAL[200]}`,
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: `${MSQDX_SPACING.padding.xxs}px ${MSQDX_SPACING.padding.xs}px`,
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        pointerEvents: "auto",
      }}
    >
      <MsqdxButton
        size="small"
        variant="outlined"
        onClick={() => onZoomChange(Math.min(3, zoom * 1.2))}
        aria-label="Zoom in"
        sx={{ ...toolbarButtonSx, minWidth: 32, height: 32, padding: 0 }}
      >
        +
      </MsqdxButton>
      <MsqdxButton
        size="small"
        variant="outlined"
        onClick={() => onZoomChange(Math.max(0.1, zoom * 0.8))}
        aria-label="Zoom out"
        sx={{ ...toolbarButtonSx, minWidth: 32, height: 32, padding: 0 }}
      >
        −
      </MsqdxButton>
      <MsqdxButton
        size="small"
        variant="outlined"
        onClick={() => {
          onZoomChange(1);
          onPanChange({ x: 0, y: 0 });
        }}
        aria-label="Reset view"
        sx={{ ...toolbarButtonSx, height: 32, padding: "0 8px", fontSize: MSQDX_TYPOGRAPHY.fontSize.xs }}
      >
        Reset
      </MsqdxButton>
      {onMarqueeSelectClick && (
        <MsqdxButton
          size="small"
          variant="outlined"
          onClick={onMarqueeSelectClick}
          aria-label="Select area (draw rectangle to select cards and connections)"
          title="Select area"
          sx={{
            ...toolbarButtonSx,
            minWidth: 32,
            height: 32,
            padding: 0,
            ...(marqueeSelectActive && {
              backgroundColor: "color-mix(in srgb, var(--color-theme-accent, #00ca55) 18%, transparent)",
            }),
          }}
        >
          <SquareDashedBottomCode size={18} strokeWidth={2} />
        </MsqdxButton>
      )}
      <Box sx={{ width: 1, height: 24, backgroundColor: MSQDX_NEUTRAL[200], marginX: 0.5 }} />
      {onPresenterModeChange && (
        <MsqdxButton
          size="small"
          variant="outlined"
          onClick={() => onPresenterModeChange(!presenterMode)}
          sx={{ ...toolbarButtonSx, height: 32, padding: "0 8px", fontSize: MSQDX_TYPOGRAPHY.fontSize.xs }}
        >
          {presenterMode ? "Stop Present" : "Present"}
        </MsqdxButton>
      )}
      {onFollowingPresenterChange && (
        <MsqdxButton
          size="small"
          variant="outlined"
          onClick={() => onFollowingPresenterChange(!followingPresenter)}
          sx={{ ...toolbarButtonSx, height: 32, padding: "0 8px", fontSize: MSQDX_TYPOGRAPHY.fontSize.xs }}
        >
          {followingPresenter ? "Unfollow" : "Follow"}
        </MsqdxButton>
      )}
      {extra}
      <Box component="span" sx={{ marginLeft: 0.5, fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, color: MSQDX_BRAND_COLOR_CSS, userSelect: "none" }}>
        {Math.round(zoom * 100)}%
      </Box>
    </Box>
  );
}
