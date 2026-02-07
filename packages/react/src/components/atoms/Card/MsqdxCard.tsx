"use client";

import { Box, styled, alpha } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_SPACING, MSQDX_EFFECTS, MSQDX_TYPOGRAPHY, MSQDX_LAYOUT } from "@msqdx/tokens";
import { reducedMotionStyles, focusOutlineStyles } from "../../../utils/atomA11y";
import type { ReactNode } from "react";
import { MsqdxTypography } from "../Typography/MsqdxTypography";

export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green';

export type CardVariant = 'flat' | 'glass' | 'elevated';

function getBorderRadiusCss(key: keyof typeof MSQDX_SPACING.borderRadius): string {
  const v = MSQDX_SPACING.borderRadius[key];
  return typeof v === "number" ? `${v}px` : String(v);
}

export interface MsqdxCardProps extends Omit<BoxProps, 'variant'> {
  children: ReactNode;
  variant?: CardVariant;
  brandColor?: BrandColor;
  clickable?: boolean;
  hoverable?: boolean;
  /** Border radius from MSQDX_SPACING.borderRadius. @default 'button' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Optional full-bleed media (e.g. image) rendered above content; no padding. */
  media?: ReactNode;
  headline?: string;
  text?: string;
}

const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => !['variant', 'brandColor', 'clickable', 'hoverable', 'borderRadius'].includes(prop as string),
})<MsqdxCardProps>(({ theme, variant = 'flat', brandColor, clickable, hoverable, borderRadius: borderRadiusKey = 'button' }) => {
  const themeMode = theme.palette.mode || 'light';
  const baseColor = brandColor ? MSQDX_COLORS.brand[brandColor] : undefined;
  const borderRadiusCss = getBorderRadiusCss(borderRadiusKey);

  return {
    position: "relative",
    overflow: MSQDX_LAYOUT.overflow?.hidden ?? "hidden",
    transition: MSQDX_EFFECTS.transitions.standard,
    ...reducedMotionStyles,
    display: "flex",
    flexDirection: "column",
    borderRadius: borderRadiusCss,
    
    ...(variant === 'flat' && {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
      boxShadow: 'none',
    }),
    
    ...(variant === 'glass' && {
      backgroundColor: alpha(theme.palette.mode === 'dark' ? "#000000" : "#ffffff", 0.05),
      backdropFilter: `blur(${MSQDX_EFFECTS.glass.blur})`,
      WebkitBackdropFilter: `blur(${MSQDX_EFFECTS.glass.blur})`,
      border: `1px solid ${alpha(theme.palette.mode === 'dark' ? "#ffffff" : "#000000", 0.12)}`,
      boxShadow: theme.palette.mode === 'dark' ? MSQDX_EFFECTS.shadows.md : MSQDX_EFFECTS.shadows.sm,
    }),
    
    ...(variant === 'elevated' && {
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      boxShadow: MSQDX_EFFECTS.shadows.md,
    }),

    ...(baseColor && {
      borderColor: alpha(baseColor, 0.3),
    }),

    ...((clickable || hoverable) && {
      cursor: clickable ? MSQDX_LAYOUT.cursor.pointer : MSQDX_LAYOUT.cursor.default,
      ...(clickable && focusOutlineStyles),
      "&:hover": {
        backgroundColor: variant === 'flat' 
          ? alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.05 : 0.02)
          : variant === 'glass'
            ? alpha(theme.palette.mode === 'dark' ? "#000000" : "#ffffff", 0.08)
            : theme.palette.background.paper,
        borderColor: baseColor ? alpha(baseColor, 0.5) : alpha(theme.palette.text.primary, 0.2),
        boxShadow: variant === 'glass' 
          ? (theme.palette.mode === 'dark' ? MSQDX_EFFECTS.shadows.lg : MSQDX_EFFECTS.shadows.md)
          : MSQDX_EFFECTS.shadows.md,
        transform: hoverable ? "translateY(-2px)" : undefined,
      },
    }),
  };
});

/**
 * MsqdxCard
 * 
 * Flexible card component with corner decoration support.
 * 
 * Features:
 * - Multiple variants: flat, glass, elevated
 * - Brand color support
 * - Clickable and hoverable states
 * - Optional headline and text props
 * 
 * @example
 * ```tsx
 * <MsqdxCard 
 *   variant="flat" 
 *   brandColor="green"
 *
 * >
 *   Content
 * </MsqdxCard>
 * ```
 */
export const MsqdxCard = ({
  children,
  variant = 'flat',
  brandColor,
  clickable,
  hoverable,
  borderRadius = 'button',
  media,
  headline,
  text,
  sx,
  ...props
}: MsqdxCardProps) => {
  const topRadiusCss = getBorderRadiusCss(borderRadius);
  return (
    <StyledCard
      variant={variant}
      brandColor={brandColor}
      clickable={clickable}
      hoverable={hoverable}
      borderRadius={borderRadius}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      sx={sx}
      {...props}
    >
      {media != null && (
        <Box
          sx={{
            overflow: "hidden",
            borderTopLeftRadius: topRadiusCss,
            borderTopRightRadius: topRadiusCss,
            flexShrink: 0,
          }}
        >
          {media}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: headline || text ? `${MSQDX_SPACING.scale.sm}px` : 0,
          padding: `${MSQDX_SPACING.scale.md}px`,
        }}
      >
        {headline && (
          <MsqdxTypography variant="h6" sx={{ fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono }}>
            {headline}
          </MsqdxTypography>
        )}
        {text && (
          <MsqdxTypography variant="body2">
            {text}
          </MsqdxTypography>
        )}
        {children}
      </Box>
    </StyledCard>
  );
};
