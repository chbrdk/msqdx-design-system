"use client";

import { Box, styled } from "@mui/material";
import { MSQDX_COLORS, MSQDX_EFFECTS, MSQDX_NEUTRAL, MSQDX_SPACING, MSQDX_TYPOGRAPHY } from "@msqdx/tokens";
import React from "react";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerThickness = "thin" | "medium" | "thick";
export type DividerColor = "default" | "purple" | "yellow" | "pink" | "orange" | "green" | "black";
export type DividerSpacing = "none" | "xs" | "sm" | "md" | "lg";

const spacingMap: Record<DividerSpacing, number> = {
  none: 0,
  xs: MSQDX_SPACING.scale.xxs,
  sm: MSQDX_SPACING.scale.xs,
  md: MSQDX_SPACING.scale.sm,
  lg: MSQDX_SPACING.scale.md,
};

const borderStyleMap: Record<DividerVariant, string> = {
  solid: "solid",
  dashed: "dashed",
  dotted: "dotted",
};

function getColor(color: DividerColor): string {
  if (color === "default") return MSQDX_NEUTRAL[300];
  if (color === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[color];
}

export interface MsqdxDividerProps {
  /** Horizontal or vertical line. @default 'horizontal' */
  orientation?: DividerOrientation;
  /** Line style. @default 'solid' */
  variant?: DividerVariant;
  /** Line thickness. @default 'thin' */
  thickness?: DividerThickness;
  /** Line color. @default 'default' */
  color?: DividerColor;
  /** Margin (before/after or around). @default 'sm' */
  spacing?: DividerSpacing;
  /** Optional label in the middle (horizontal) or top (vertical). */
  label?: React.ReactNode;
  /** Grow to fill space in flex layouts. @default false */
  flex?: boolean;
  /** Additional class name. */
  className?: string;
  /** Additional sx. */
  sx?: Record<string, unknown>;
}

const StyledDividerRoot = styled(Box, {
  shouldForwardProp: (p) =>
    p !== "orientation" &&
    p !== "variant" &&
    p !== "thickness" &&
    p !== "dividerColor" &&
    p !== "spacing" &&
    p !== "flex",
})<{
  orientation: DividerOrientation;
  variant: DividerVariant;
  thickness: DividerThickness;
  dividerColor: DividerColor;
  spacing: DividerSpacing;
  flex: boolean;
}>(({ orientation, variant, thickness, dividerColor, spacing, flex }) => {
  const borderWidth = MSQDX_EFFECTS.borderWidth[thickness];
  const color = getColor(dividerColor);
  const borderStyle = borderStyleMap[variant];
  const margin = spacingMap[spacing];

  const lineStyles = {
    borderColor: color,
    borderStyle,
    borderWidth: 0,
    flex: flex ? 1 : undefined,
    minWidth: flex ? 0 : undefined,
    minHeight: flex ? 0 : undefined,
  };

  if (orientation === "horizontal") {
    return {
      display: "flex",
      alignItems: "center",
      width: "100%",
      margin: `${margin}px 0`,
      "& .msqdx-divider-line": {
        ...lineStyles,
        borderTopWidth: borderWidth,
        flex: 1,
        minWidth: 20,
      },
      "& .msqdx-divider-label": {
        paddingLeft: MSQDX_SPACING.scale.sm,
        paddingRight: MSQDX_SPACING.scale.sm,
        fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
        fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
        color: "inherit",
        flexShrink: 0,
      },
    };
  }

  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    height: "100%",
    minHeight: 24,
    margin: `0 ${margin}px`,
    "& .msqdx-divider-line": {
      ...lineStyles,
      borderLeftWidth: borderWidth,
      flex: 1,
      minHeight: 20,
    },
    "& .msqdx-divider-label": {
      paddingTop: MSQDX_SPACING.scale.xs,
      paddingBottom: MSQDX_SPACING.scale.xs,
      fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
      fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
      color: "inherit",
      flexShrink: 0,
      textAlign: "center",
    },
  };
});

/**
 * MsqdxDivider
 *
 * Flexible divider line: horizontal or vertical, solid/dashed/dotted,
 * thickness and color from tokens, optional label.
 */
export const MsqdxDivider = ({
  orientation = "horizontal",
  variant = "solid",
  thickness = "thin",
  color = "default",
  spacing = "sm",
  label,
  flex = false,
  className,
  sx,
}: MsqdxDividerProps) => {
  if (label != null) {
    return (
      <StyledDividerRoot
        className={className}
        sx={sx}
        orientation={orientation}
        variant={variant}
        thickness={thickness}
        dividerColor={color}
        spacing={spacing}
        flex={flex}
        role="separator"
        aria-orientation={orientation}
      >
        <span className="msqdx-divider-line" />
        <span className="msqdx-divider-label">{label}</span>
        <span className="msqdx-divider-line" />
      </StyledDividerRoot>
    );
  }

  return (
    <StyledDividerRoot
      className={className}
      sx={sx}
      orientation={orientation}
      variant={variant}
      thickness={thickness}
      dividerColor={color}
      spacing={spacing}
      flex={flex}
      role="separator"
      aria-orientation={orientation}
    >
      <span className="msqdx-divider-line" />
    </StyledDividerRoot>
  );
};
