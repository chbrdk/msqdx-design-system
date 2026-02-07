"use client";

import React from "react";
import { Box, styled } from "@mui/material";
import {
  MSQDX_SCROLLBAR,
  getScrollbarSize,
  getScrollbarColor,
} from "@msqdx/tokens";
import { reducedMotionStyles } from "../../../utils/atomA11y";

export type ScrollbarSize = keyof typeof MSQDX_SCROLLBAR.size;
export type ScrollbarBrandColor = keyof typeof MSQDX_SCROLLBAR.color;

export interface MsqdxScrollbarProps {
  /**
   * Scrollbar size (from MSQDX_SCROLLBAR.size: thin 6px, medium 10px, thick 14px).
   * @default 'medium'
   */
  size?: ScrollbarSize;
  /**
   * Brand color / theme (from MSQDX_SCROLLBAR.color).
   * @default 'default'
   */
  brandColor?: ScrollbarBrandColor;
  /**
   * @deprecated Use brandColor. Same as brandColor.
   */
  color?: ScrollbarBrandColor;
  /**
   * Children to wrap with scrollbar styling.
   */
  children: React.ReactNode;
  /**
   * Max height for scrollable area (e.g. 300, '50vh').
   */
  maxHeight?: string | number;
  /**
   * Max width for scrollable area (e.g. 400, '100%').
   */
  maxWidth?: string | number;
  /**
   * Enable horizontal scrolling.
   * @default false
   */
  horizontal?: boolean;
  /**
   * Enable vertical scrolling.
   * @default true
   */
  vertical?: boolean;
  /**
   * Overflow behavior: auto = scrollbar when needed, scroll = always show scrollbar track.
   * @default 'auto'
   */
  overflow?: "auto" | "scroll";
  className?: string;
  style?: React.CSSProperties;
  sx?: Record<string, unknown>;
}

const ScrollbarContainer = styled(Box, {
  shouldForwardProp: (p) =>
    p !== "scrollbarSize" &&
    p !== "scrollbarColor" &&
    p !== "horizontal" &&
    p !== "vertical" &&
    p !== "overflowMode",
})<{
  scrollbarSize: ReturnType<typeof getScrollbarSize>;
  scrollbarColor: ReturnType<typeof getScrollbarColor>;
  horizontal: boolean;
  vertical: boolean;
  overflowMode: "auto" | "scroll";
}>(({ scrollbarSize, scrollbarColor, horizontal, vertical, overflowMode }) => {
  const sizeKey: ScrollbarSize =
    scrollbarSize.width === "6px"
      ? "thin"
      : scrollbarSize.width === "10px"
        ? "medium"
        : "thick";
  const borderRadius = MSQDX_SCROLLBAR.borderRadius[sizeKey];

  return {
    "&::-webkit-scrollbar": {
      width: vertical ? scrollbarSize.width : "0px",
      height: horizontal ? scrollbarSize.height : "0px",
    },
    "&::-webkit-scrollbar-track": {
      background: scrollbarColor.track,
      borderRadius,
      margin: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: scrollbarColor.thumb,
      borderRadius,
      transition: MSQDX_SCROLLBAR.transition,
      ...reducedMotionStyles,
      "&:hover": {
        background: scrollbarColor.thumbHover,
      },
      "&:active": {
        background: scrollbarColor.thumbActive,
      },
    },
    scrollbarWidth: "thin",
    scrollbarColor: `${scrollbarColor.thumb} ${scrollbarColor.track}`,
    overflowX: horizontal ? overflowMode : "hidden",
    overflowY: vertical ? overflowMode : "hidden",
  };
});

/**
 * MsqdxScrollbar
 *
 * Scrollbar-Atom: scrollbarer Bereich mit Token-Styling (MSQDX_SCROLLBAR).
 * - size: thin | medium | thick
 * - brandColor: default | purple | yellow | pink | orange | green | black
 * - horizontal / vertical, overflow auto | scroll
 */
export const MsqdxScrollbar = ({
  size = "medium",
  brandColor,
  color,
  children,
  maxHeight,
  maxWidth,
  horizontal = false,
  vertical = true,
  overflow = "auto",
  className,
  style,
  sx,
}: MsqdxScrollbarProps) => {
  const colorKey = brandColor ?? color ?? "default";
  const scrollbarSize = getScrollbarSize(size);
  const scrollbarColor = getScrollbarColor(colorKey);

  return (
    <ScrollbarContainer
      scrollbarSize={scrollbarSize}
      scrollbarColor={scrollbarColor}
      horizontal={horizontal}
      vertical={vertical}
      overflowMode={overflow}
      className={className}
      style={{ maxHeight, maxWidth, ...style }}
      {...(sx != null && { sx: sx as object })}
    >
      {children}
    </ScrollbarContainer>
  );
};
