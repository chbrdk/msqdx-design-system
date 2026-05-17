"use client";

import { Box, type BoxProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";
import { MsqdxCornerBox } from "../../atoms/CornerDecoration/MsqdxCornerBox";
import {
  CORNER_TAB_CARD_DEFAULTS,
  getCornerTabCardLayout,
  type CornerTabPlacement,
} from "./corner-tab-card-layout";

export type { CornerTabPlacement } from "./corner-tab-card-layout";
export { CORNER_TAB_CARD_DEFAULTS, getCornerTabCardLayout } from "./corner-tab-card-layout";

export interface MsqdxCornerTabCardProps extends Omit<BoxProps, "children"> {
  /** Main card content (below / beside the corner tab). */
  children: ReactNode;
  /** Icon or label inside the corner tab (optional). */
  tab?: ReactNode;
  /** @default 'top-left' */
  placement?: CornerTabPlacement;
  /** Fill of the main card body. */
  bodyColor?: string;
  /** Outer chrome behind the tab (often white). @default '#ffffff' */
  tabChromeColor?: string;
  /** Inner tab fill; defaults to `bodyColor`. */
  tabColor?: string;
  bodyBorderRadiusPx?: number;
  tabWidthPx?: number;
  tabHeightPx?: number;
  cornerBoxBorderRadiusPx?: number;
  cornerBoxWidthExtraPx?: number;
  containerBorderRadiusPx?: number;
  /** Accessible name when `tab` is present. */
  tabAriaLabel?: string;
  /** Styles for the main body region (below the corner tab). */
  bodySx?: SxProps<Theme>;
}

/**
 * Card with a decorative corner tab using `MsqdxCornerBox` cutdown geometry
 * (BVik workflow node pattern). Tab can sit **top-left** or **top-right**.
 */
export function MsqdxCornerTabCard({
  children,
  tab,
  placement = "top-left",
  bodyColor,
  tabChromeColor = "#ffffff",
  tabColor,
  bodyBorderRadiusPx,
  tabWidthPx,
  tabHeightPx,
  cornerBoxBorderRadiusPx,
  cornerBoxWidthExtraPx,
  containerBorderRadiusPx,
  tabAriaLabel,
  bodySx,
  sx,
  ...rootProps
}: MsqdxCornerTabCardProps) {
  const layout = getCornerTabCardLayout({
    placement,
    tabWidthPx,
    tabHeightPx,
    bodyBorderRadiusPx,
    cornerBoxBorderRadiusPx,
    cornerBoxWidthExtraPx,
    containerBorderRadiusPx,
  });

  const effectiveTabColor = tabColor ?? bodyColor;
  const { topLeft, topRight, bottomLeft, bottomRight } = layout.cornerStyles;

  return (
    <Box
      {...rootProps}
      sx={{
        position: "relative",
        overflow: "visible",
        ...sx,
      }}
    >
      <Box sx={{ ...layout.tabContainerSx, bgcolor: tabChromeColor }}>
        <MsqdxCornerBox
          topLeft={topLeft}
          topRight={topRight}
          bottomLeft={bottomLeft}
          bottomRight={bottomRight}
          borderRadius={cornerBoxBorderRadiusPx ?? CORNER_TAB_CARD_DEFAULTS.cornerBoxBorderRadiusPx}
          sx={{
            ...layout.cornerBoxSx,
            ...(effectiveTabColor ? { bgcolor: effectiveTabColor } : {}),
          }}
          aria-label={tab ? tabAriaLabel : undefined}
        >
          {tab}
        </MsqdxCornerBox>
      </Box>

      <Box
        className="msqdx-corner-tab-card__body"
        sx={{
          borderRadius: layout.bodyBorderRadius,
          ...(bodyColor ? { bgcolor: bodyColor } : {}),
          ...bodySx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
