"use client";

import React, { type ReactNode } from "react";
import { Box, alpha } from "@mui/material";
import type { BoxProps } from "@mui/material";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
} from "@msqdx/tokens";
import { MsqdxCornerBox } from "../../atoms/CornerDecoration/MsqdxCornerBox";
import type { MsqdxLogoProps } from "../../atoms/Logo/MsqdxLogo";

export type AppLayoutBrandColor =
  | "purple"
  | "yellow"
  | "pink"
  | "orange"
  | "green"
  | "black";

function getBrandColor(color?: AppLayoutBrandColor): string {
  if (!color) return MSQDX_COLORS.brand.green;
  if (color === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[color];
}

function getBorderRadiusCss(
  key: keyof typeof MSQDX_SPACING.borderRadius
): string {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? `${value}px` : String(value);
}

function getBorderRadiusPx(
  key: keyof typeof MSQDX_SPACING.borderRadius
): number {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? value : MSQDX_SPACING.borderRadius.md;
}

/** Layout: obere Ecken = button, untere Ecken = 1.5xl. */
const LAYOUT_RADIUS_BUTTON_CSS = getBorderRadiusCss("button");
const LAYOUT_RADIUS_1_5XL_CSS = getBorderRadiusCss("1.5xl");
const LAYOUT_RADIUS_BUTTON_PX = getBorderRadiusPx("button");
const LAYOUT_RADIUS_1_5XL_PX = getBorderRadiusPx("1.5xl");

/** Stärkere Rahmenstärken für den App-Container (in px). */
const APP_LAYOUT_BORDER_WIDTH: Record<
  keyof typeof MSQDX_EFFECTS.borderWidth,
  number
> = {
  none: 0,
  thin: 3,
  medium: 6,
  thick: 10,
  heavy: 16,
};

/** Optionen für den Hintergrund des inneren Containers (Token-basiert + Muster). */
export type AppLayoutInnerBackground =
  | "default"   // NEUTRAL[50]
  | "offwhite"  // NEUTRAL.neutral (#f8f6f0)
  | "white"     // #ffffff
  | "checker"   // Karo-Muster (NEUTRAL[50] / NEUTRAL[200])
  | "grid";     // Dezentes Linienraster wie Audion Admin (20px, 1px Linien)

const INNER_BG = {
  default: MSQDX_NEUTRAL[50],
  offwhite: MSQDX_NEUTRAL.neutral,
  white: "#ffffff",
} as const;

/** CSS für Karo-Muster (zwei Token-Farben). */
const CHECKER_BACKGROUND = {
  backgroundColor: MSQDX_NEUTRAL[50],
  backgroundImage: `linear-gradient(45deg, ${MSQDX_NEUTRAL[200]} 25%, transparent 25%), linear-gradient(-45deg, ${MSQDX_NEUTRAL[200]} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${MSQDX_NEUTRAL[200]} 75%), linear-gradient(-45deg, transparent 75%, ${MSQDX_NEUTRAL[200]} 75%)`,
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
};

/** Dezentes Linienraster wie Audion Admin (1px Linien, 20px Raster, fixed). */
const GRID_LINE = alpha(MSQDX_NEUTRAL[900], 0.03);
const GRID_BACKGROUND = {
  backgroundColor: MSQDX_NEUTRAL.neutral,
  backgroundImage: `linear-gradient(${GRID_LINE} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE} 1px, transparent 1px)`,
  backgroundSize: "20px 20px",
  backgroundAttachment: "fixed" as const,
};

export interface MsqdxAppLayoutProps extends Omit<BoxProps, "children"> {
  /**
   * App-Inhalt (Header, Main, etc.) – wird im inneren Container gerendert.
   */
  children: ReactNode;
  /**
   * Brand-Farbe für äußeren Hintergrund und Rahmen des inneren Containers.
   * @default 'green'
   */
  brandColor?: AppLayoutBrandColor;
  /**
   * Border-Radius des inneren Containers (Token-Key).
   * @default '2xl'
   */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /**
   * Dicke des Rahmens um den inneren Container (Token-Key).
   * @default 'medium'
   */
  borderWidth?: keyof typeof MSQDX_EFFECTS.borderWidth;
  /**
   * Hintergrund des inneren Containers: default, offwhite, white, checker (Karo), grid (Linienraster wie Audion).
   * @default 'default'
   */
  innerBackground?: AppLayoutInnerBackground;
  /**
   * Eigene Hintergrundfarbe (überschreibt innerBackground bei default/offwhite/white).
   */
  innerBackgroundColor?: string;
  /**
   * Logo in der linken oberen Ecke (MsqdxCornerBox). Bei true Standard-Optionen.
   */
  logo?: boolean | Partial<MsqdxLogoProps>;
  /**
   * App-Name rechts neben dem Logo in der linken Ecke (mit Divider).
   */
  appName?: string;
  /**
   * Optionale Sidebar/Navigation links (z. B. MsqdxAdminNav). Wird außerhalb des inneren Containers in der Brand-Fläche gerendert.
   */
  sidebar?: ReactNode;
}

/**
 * MsqdxAppLayout
 *
 * Vollflächiger App-Container:
 * - Äußeres Div: volle Browserfläche, Hintergrund = Brand-Farbe
 * - Inneres Div: volle Fläche, runde Ecken (Border in Brand-Farbe), heller Hintergrund
 *
 * Kinder werden im inneren Container gerendert (z. B. Flex-Layout für Header/Main).
 */
export const MsqdxAppLayout = ({
  children,
  brandColor = "green",
  borderRadius = "2xl",
  borderWidth = "medium",
  innerBackground = "default",
  innerBackgroundColor,
  logo,
  appName,
  sidebar,
  sx,
  ...props
}: MsqdxAppLayoutProps) => {
  const color = getBrandColor(brandColor);
  const widthPx = APP_LAYOUT_BORDER_WIDTH[borderWidth];

  const isChecker = innerBackground === "checker";
  const isGrid = innerBackground === "grid";
  const innerSx =
    isChecker
      ? CHECKER_BACKGROUND
      : isGrid
        ? GRID_BACKGROUND
        : {
            backgroundColor:
              innerBackgroundColor ?? INNER_BG[innerBackground],
          };

  const hasCornerBox = logo != null || appName != null;
  const hasSidebar = sidebar != null;

  const innerBoxSx = {
    ...(hasSidebar
      ? { position: "relative" as const, flex: 1, minWidth: 0, margin: 0 }
      : { position: "absolute" as const, inset: 0, margin: 0 }),
    ...(hasCornerBox && !hasSidebar
      ? {
          borderTopLeftRadius: 0,
          borderTopRightRadius: LAYOUT_RADIUS_BUTTON_CSS,
          borderBottomLeftRadius: LAYOUT_RADIUS_1_5XL_CSS,
          borderBottomRightRadius: LAYOUT_RADIUS_1_5XL_CSS,
        }
        : hasCornerBox && hasSidebar
        ? {
            borderTopLeftRadius: 0,
            borderTopRightRadius: LAYOUT_RADIUS_1_5XL_CSS,
            borderBottomLeftRadius: LAYOUT_RADIUS_BUTTON_CSS,
            borderBottomRightRadius: LAYOUT_RADIUS_1_5XL_CSS,
          }
        : hasSidebar
          ? {
              borderTopLeftRadius: 0,
              borderTopRightRadius: LAYOUT_RADIUS_1_5XL_CSS,
              borderBottomLeftRadius: LAYOUT_RADIUS_BUTTON_CSS,
              borderBottomRightRadius: LAYOUT_RADIUS_1_5XL_CSS,
            }
          : {
              borderTopLeftRadius: LAYOUT_RADIUS_BUTTON_CSS,
              borderTopRightRadius: LAYOUT_RADIUS_BUTTON_CSS,
              borderBottomLeftRadius: LAYOUT_RADIUS_1_5XL_CSS,
              borderBottomRightRadius: LAYOUT_RADIUS_1_5XL_CSS,
            }),
    border: widthPx ? `${widthPx}px solid ${color}` : "none",
    ...(hasSidebar ? { borderLeft: "none" as const } : {}),
    ...innerSx,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
        ...sx,
      }}
      {...props}
    >
      {/* Nav außerhalb des AppLayout-Containers */}
      {hasSidebar && (
        <Box sx={{ flexShrink: 0, display: "flex" }}>
          {sidebar}
        </Box>
      )}
      {/* AppLayout-Container: Brand-Hintergrund + innerer runder Bereich */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          overflow: "hidden",
          backgroundColor: color,
        }}
      >
        <Box component="div" sx={innerBoxSx}>
          {hasCornerBox && (
            <Box sx={{ flexShrink: 0, display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
              <MsqdxCornerBox
                logo={logo}
                appName={appName}
                headerColor={brandColor === "black" ? "white" : undefined}
                padding="md"
                borderRadius={LAYOUT_RADIUS_BUTTON_PX}
                topLeft="square"
                topRight="cutdown-a"
                bottomLeft="cutdown-b"
                bottomRight="rounded"
                sx={{ bgcolor: color }}
              />
            </Box>
          )}
          <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "auto" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
