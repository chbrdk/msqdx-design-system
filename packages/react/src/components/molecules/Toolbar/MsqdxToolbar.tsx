"use client";

import React from "react";
import {
  Toolbar as MuiToolbar,
  styled,
  alpha,
  Box,
  IconButton,
} from "@mui/material";
import type { ToolbarProps as MuiToolbarProps } from "@mui/material/Toolbar";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
} from "@msqdx/tokens";
import { MsqdxIcon } from "../../atoms/Icon";

export type ToolbarBrandColor =
  | "purple"
  | "yellow"
  | "pink"
  | "orange"
  | "green"
  | "black";

function getBorderRadiusCss(
  key: keyof typeof MSQDX_SPACING.borderRadius
): string {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? `${value}px` : String(value);
}

function getBrandColor(color?: ToolbarBrandColor): string {
  if (!color) return MSQDX_COLORS.brand.green;
  if (color === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[color];
}

/** Visual appearance of the toolbar. */
export type ToolbarAppearance = "flat" | "outlined" | "elevated" | "filled";

/** Gap between toolbar items. */
export type ToolbarGap = keyof typeof MSQDX_SPACING.scale;

export interface MsqdxToolbarProps extends Omit<MuiToolbarProps, "variant"> {
  /**
   * MUI variant: regular (default) or dense (reduced padding).
   * @default 'regular'
   */
  variant?: "regular" | "dense";
  /**
   * Visual appearance.
   * - flat: transparent background
   * - outlined: border, light background
   * - elevated: shadow, white background
   * - filled: solid brand color background
   * @default 'flat'
   */
  appearance?: ToolbarAppearance;
  /**
   * Brand color for borders/accents (outlined) or background (filled).
   * @default 'green'
   */
  brandColor?: ToolbarBrandColor;
  /**
   * Gap between children (flex gap). Uses MSQDX_SPACING.scale.
   * @default 'sm'
   */
  gap?: ToolbarGap;
  /**
   * Show a divider line (bottom for horizontal, right for vertical).
   * @default false
   */
  divider?: boolean;
  /**
   * Orientation of the toolbar.
   * @default 'horizontal'
   */
  orientation?: "horizontal" | "vertical";
  /**
   * If true, horizontal and vertical padding (gutters) are removed.
   * @default false
   */
  disableGutters?: boolean;
  /**
   * Vertical only: Toolbar kann eingeklappt werden; expandiert nach unten.
   * Eingeklappt = minimale Höhe (nur Toggle sichtbar), ausgeklappt = volle Höhe.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Eingeklappt (nur bei collapsible). Controlled.
   */
  collapsed?: boolean;
  /**
   * Initial eingeklappt (uncontrolled, nur bei collapsible).
   * @default false
   */
  defaultCollapsed?: boolean;
  /**
   * Callback wenn Ein-/Ausklappen wechselt (nur bei collapsible).
   */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * Toolbar schwebt über dem Inhalt (position absolute, Schatten, z-Index).
   * @default false
   */
  floating?: boolean;
  /**
   * Toolbar in ausfahrbarem Panel (von links/rechts einblendbar).
   * @default false
   */
  slideOut?: boolean;
  /**
   * Panel offen (controlled, nur bei slideOut).
   */
  slideOutOpen?: boolean;
  /**
   * Panel initial offen (uncontrolled, nur bei slideOut).
   * @default false
   */
  defaultSlideOutOpen?: boolean;
  /**
   * Callback wenn Slide-Out geöffnet/geschlossen wird (nur bei slideOut).
   */
  onSlideOutOpenChange?: (open: boolean) => void;
  /**
   * Seite, von der das Slide-Out-Panel einfährt (nur bei slideOut).
   * @default 'left'
   */
  slideOutPosition?: "left" | "right";
}

/** Höhe der vertikalen Toolbar wenn eingeklappt (expandiert nach unten). */
const COLLAPSED_HEIGHT = 48;
const SLIDE_OUT_WIDTH = 240;

const StyledToolbar = styled(MuiToolbar, {
  shouldForwardProp: (prop) =>
    prop !== "appearance" &&
    prop !== "brandColor" &&
    prop !== "gap" &&
    prop !== "divider" &&
    prop !== "orientation" &&
    prop !== "collapsed" &&
    prop !== "floating",
})<{
  appearance?: ToolbarAppearance;
  brandColor?: ToolbarBrandColor;
  gap?: ToolbarGap;
  divider?: boolean;
  orientation?: "horizontal" | "vertical";
  collapsed?: boolean;
  floating?: boolean;
}>(({ theme, appearance = "flat", brandColor, gap = "sm", divider, orientation = "horizontal", disableGutters, collapsed, floating }) => {
  const color = getBrandColor(brandColor);
  const gapPx = MSQDX_SPACING.scale[gap ?? "sm"];
  const isVertical = orientation === "vertical";

  const padding = disableGutters
    ? { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }
    : {
        paddingTop: MSQDX_SPACING.scale.xs,
        paddingBottom: MSQDX_SPACING.scale.xs,
        paddingLeft: MSQDX_SPACING.scale.md,
        paddingRight: MSQDX_SPACING.scale.md,
      };

  const base = {
    minHeight: "auto",
    ...padding,
    gap: gapPx,
    flexWrap: "wrap" as const,
    color: theme.palette.text.primary,
    transition: `background-color ${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}, box-shadow ${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}, border-color ${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}`,
    "& .MuiIconButton-root": {
      color: "inherit",
    },
  };

  const appearanceStyles: Record<ToolbarAppearance, Record<string, unknown>> = {
    flat: {
      backgroundColor: "transparent",
      boxShadow: "none",
      border: "none",
    },
    outlined: {
      backgroundColor: alpha(MSQDX_NEUTRAL[50], 0.6),
      border: `${MSQDX_EFFECTS.borderWidth.thin}px solid ${brandColor ? color : MSQDX_NEUTRAL[200]}`,
      borderRadius: getBorderRadiusCss("md"),
      boxShadow: "none",
    },
    elevated: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      borderRadius: getBorderRadiusCss("md"),
      boxShadow: MSQDX_EFFECTS.shadows.sm,
    },
    filled: {
      backgroundColor: color,
      border: "none",
      borderRadius: getBorderRadiusCss("md"),
      boxShadow: MSQDX_EFFECTS.shadows.xs,
      color: brandColor === "yellow" || brandColor === "green" ? MSQDX_NEUTRAL[900] : "#fff",
    },
  };

  const dividerBorder =
    orientation === "vertical"
      ? { borderRight: `${MSQDX_EFFECTS.borderWidth.thin}px solid ${MSQDX_NEUTRAL[200]}` }
      : { borderBottom: `${MSQDX_EFFECTS.borderWidth.thin}px solid ${MSQDX_NEUTRAL[200]}` };

  return {
    ...base,
    ...appearanceStyles[appearance],
    ...(divider ? dividerBorder : {}),
    ...(isVertical && !disableGutters
      ? {
          flexDirection: "column",
          width: "auto",
          paddingTop: MSQDX_SPACING.scale.md,
          paddingBottom: MSQDX_SPACING.scale.md,
          paddingLeft: MSQDX_SPACING.scale.xs,
          paddingRight: MSQDX_SPACING.scale.xs,
        }
      : isVertical
        ? { flexDirection: "column", width: "auto" }
        : {}),
    /* Collapsed-Höhe wird per Wrapper gesteuert (expandiert nach unten), nicht hier */
    ...(floating
      ? {
          position: "absolute",
          right: MSQDX_SPACING.scale.md,
          top: MSQDX_SPACING.scale.md,
          zIndex: MSQDX_EFFECTS.zIndex.fixed,
          boxShadow: MSQDX_EFFECTS.shadows.lg,
        }
      : {}),
  };
});

/**
 * MsqdxToolbar
 *
 * Toolbar in allen Ausprägungen: flat, outlined, elevated, filled.
 * Optionen: variant (regular/dense), gap, divider, orientation (horizontal/vertical),
 * collapsible (vertical), floating, slideOut, disableGutters, brandColor.
 */
export const MsqdxToolbar = React.forwardRef<HTMLDivElement, MsqdxToolbarProps>(
  (
    {
      variant = "regular",
      appearance = "flat",
      brandColor = "green",
      gap = "sm",
      divider = false,
      orientation = "horizontal",
      disableGutters = false,
      collapsible = false,
      collapsed: collapsedProp,
      defaultCollapsed = false,
      onCollapsedChange,
      floating = false,
      slideOut = false,
      slideOutOpen: slideOutOpenProp,
      defaultSlideOutOpen = false,
      onSlideOutOpenChange,
      slideOutPosition = "left",
      children,
      ...rest
    },
    ref
  ) => {
    const [collapsedState, setCollapsedState] = React.useState(defaultCollapsed);
    const [slideOutOpenState, setSlideOutOpenState] =
      React.useState(defaultSlideOutOpen);

    const collapsed =
      collapsedProp !== undefined ? collapsedProp : collapsedState;
    const setCollapsed = React.useCallback(
      (next: boolean) => {
        if (collapsedProp === undefined) setCollapsedState(next);
        onCollapsedChange?.(next);
      },
      [collapsedProp, onCollapsedChange]
    );

    const slideOutOpen =
      slideOutOpenProp !== undefined ? slideOutOpenProp : slideOutOpenState;
    const setSlideOutOpen = React.useCallback(
      (next: boolean) => {
        if (slideOutOpenProp === undefined) setSlideOutOpenState(next);
        onSlideOutOpenChange?.(next);
      },
      [slideOutOpenProp, onSlideOutOpenChange]
    );

    const isVertical = orientation === "vertical";
    const showCollapseToggle = collapsible && isVertical;

    const collapseToggle = showCollapseToggle ? (
      <IconButton
        size="small"
        aria-label={collapsed ? "Toolbar nach unten ausklappen" : "Toolbar einklappen"}
        onClick={() => setCollapsed(!collapsed)}
        sx={{ flexShrink: 0 }}
      >
        <MsqdxIcon
          name={collapsed ? "ExpandMore" : "ExpandLess"}
          size="sm"
          decorative
        />
      </IconButton>
    ) : null;

    const toolbarContent = (
      <StyledToolbar
        ref={ref}
        variant={variant}
        appearance={appearance}
        brandColor={brandColor}
        gap={gap}
        divider={divider}
        orientation={orientation}
        disableGutters={disableGutters}
        collapsed={false}
        floating={floating}
        {...rest}
      >
        {showCollapseToggle ? collapseToggle : null}
        {children}
      </StyledToolbar>
    );

    /* Collapsible vertical: Wrapper mit Höhen-Animation, expandiert nach unten */
    if (showCollapseToggle) {
      return (
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            maxHeight: collapsed ? COLLAPSED_HEIGHT : 400,
            overflow: "hidden",
            transition: `max-height ${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}`,
          }}
        >
          {toolbarContent}
        </Box>
      );
    }

    if (slideOut) {
      const isLeft = slideOutPosition === "left";
      return (
        <Box
          sx={{
            display: "flex",
            position: "relative",
            alignItems: "stretch",
            justifyContent: isLeft ? "flex-start" : "flex-end",
          }}
        >
          <Box
            sx={{
              width: slideOutOpen ? SLIDE_OUT_WIDTH : 0,
              minHeight: 120,
              overflow: "hidden",
              transition: `width ${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}`,
              backgroundColor: "background.paper",
              boxShadow: isLeft
                ? "4px 0 12px rgba(0,0,0,0.08)"
                : "-4px 0 12px rgba(0,0,0,0.08)",
              borderRadius: isLeft
                ? "0 8px 8px 0"
                : "8px 0 0 8px",
            }}
          >
            {toolbarContent}
          </Box>
          <IconButton
            size="small"
            aria-label={slideOutOpen ? "Toolbar schließen" : "Toolbar öffnen"}
            onClick={() => setSlideOutOpen(!slideOutOpen)}
            sx={{
              position: "absolute",
              [isLeft ? "left" : "right"]: slideOutOpen
                ? (isLeft ? SLIDE_OUT_WIDTH : 0)
                : 0,
              top: MSQDX_SPACING.scale.xs,
              zIndex: 1,
              backgroundColor: "background.paper",
              boxShadow: MSQDX_EFFECTS.shadows.sm,
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <MsqdxIcon
              name={
                slideOutOpen
                  ? isLeft
                    ? "ChevronLeft"
                    : "ChevronRight"
                  : isLeft
                    ? "ChevronRight"
                    : "ChevronLeft"
              }
              size="sm"
              decorative
            />
          </IconButton>
        </Box>
      );
    }

    return toolbarContent;
  }
);

MsqdxToolbar.displayName = "MsqdxToolbar";
