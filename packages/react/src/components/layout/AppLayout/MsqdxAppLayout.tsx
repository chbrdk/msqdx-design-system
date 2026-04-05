"use client";

import React, { type ReactNode } from "react";
import { Box } from "@mui/material";
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

/** Optionen für den Hintergrund des inneren Containers (Token-basiert, ohne Muster). */
export type AppLayoutInnerBackground =
  | "default" // NEUTRAL[50]
  | "offwhite" // NEUTRAL.neutral (#f8f6f0)
  | "white" // #ffffff
  /** @deprecated Alias für offwhite (früher Karo-Muster). */
  | "checker"
  /** @deprecated Alias für offwhite (früher Linienraster). */
  | "grid";

const INNER_BG = {
  default: MSQDX_NEUTRAL[50],
  offwhite: MSQDX_NEUTRAL.neutral,
  white: "#ffffff",
} as const;

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
   * Hintergrund des inneren Containers: default, offwhite, white.
   * `checker` / `grid` sind Aliase für offwhite (Rückwärtskompatibilität, kein Muster mehr).
   * @default 'default'
   */
  innerBackground?: AppLayoutInnerBackground;
  /**
   * Eigene Hintergrundfarbe (überschreibt die Farbe aus innerBackground).
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
  /**
   * Optional: CSS-Farbe oder var() für äußeren Brand-Hintergrund. Überschreibt brandColor wenn gesetzt (z. B. für User-Preferences).
   */
  brandBackgroundColor?: string;
  /**
   * Optionaler Inhalt am rechten Ende der Header-Zeile (Logo/App-Name), z. B. Projekt-Subnav.
   */
  headerEnd?: ReactNode;
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
  brandBackgroundColor,
  headerEnd,
  sx,
  ...props
}: MsqdxAppLayoutProps) => {
  const color = brandBackgroundColor ?? getBrandColor(brandColor);
  const widthPx = APP_LAYOUT_BORDER_WIDTH[borderWidth];

  const resolvedBgKey =
    innerBackground === "checker" || innerBackground === "grid"
      ? "offwhite"
      : innerBackground;
  const innerSx = {
    backgroundColor: innerBackgroundColor ?? INNER_BG[resolvedBgKey],
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
        width: "100%",
        height: "100%",
        maxWidth: "100vw",
        maxHeight: "100vh",
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
        <Box component="div" sx={{ ...innerBoxSx, overflowX: "hidden" as const }}>
          {hasCornerBox && (
            <Box sx={{ flexShrink: 0, display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
              <MsqdxCornerBox
                logo={logo}
                appName={appName}
                headerColor={brandColor === "black" ? "white" : undefined}
                headerEnd={headerEnd}
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
          <Box sx={{ flex: 1, minHeight: 0, minWidth: 0, display: "flex", flexDirection: "column", overflow: "auto" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
