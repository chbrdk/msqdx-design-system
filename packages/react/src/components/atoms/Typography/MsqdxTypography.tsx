"use client";

import { Typography, styled } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import { MSQDX_TYPOGRAPHY, MSQDX_SPACING } from "@msqdx/tokens";
import React from "react";

export type FontWeightVariant = 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

export interface MsqdxTypographyProps extends Omit<TypographyProps, 'fontWeight'> {
  /**
   * Font weight variant
   */
  weight?: FontWeightVariant | number;
  
  /**
   * Enable eyebrow style (uppercase, letter spacing)
   */
  eyebrow?: boolean;
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "eyebrow" && prop !== "weight",
})<MsqdxTypographyProps>(({ theme, eyebrow, weight, variant = "body1" }) => {
  // Determine font weight
  let fontWeight: number;
  if (typeof weight === "number") {
    fontWeight = weight;
  } else if (weight) {
    fontWeight = MSQDX_TYPOGRAPHY.fontWeight[weight];
  } else {
    // Default font weights based on variant
    const variantWeights: Record<string, number> = {
      h1: MSQDX_TYPOGRAPHY.fontWeight.extrabold,
      h2: MSQDX_TYPOGRAPHY.fontWeight.extrabold,
      h3: MSQDX_TYPOGRAPHY.fontWeight.bold,
      h4: MSQDX_TYPOGRAPHY.fontWeight.bold,
      h5: MSQDX_TYPOGRAPHY.fontWeight.semibold,
      h6: MSQDX_TYPOGRAPHY.fontWeight.semibold,
      subtitle1: MSQDX_TYPOGRAPHY.fontWeight.medium,
      subtitle2: MSQDX_TYPOGRAPHY.fontWeight.semibold,
      body1: MSQDX_TYPOGRAPHY.fontWeight.regular,
      body2: MSQDX_TYPOGRAPHY.fontWeight.regular,
      button: MSQDX_TYPOGRAPHY.fontWeight.semibold,
      caption: MSQDX_TYPOGRAPHY.fontWeight.regular,
      overline: MSQDX_TYPOGRAPHY.fontWeight.medium,
    };
    fontWeight = variantWeights[variant] || MSQDX_TYPOGRAPHY.fontWeight.regular;
  }

  return {
    fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary,
    fontWeight,
    lineHeight: MSQDX_TYPOGRAPHY.lineHeight.normal,
    marginTop: 0,
    marginBottom: 0,
    
    // Override specific MUI selectors that might add margins
    "&.MuiTypography-root": {
      marginTop: 0,
      marginBottom: 0,
    },
    "&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6": {
      marginTop: 0,
      marginBottom: 0,
    },
    "&.MuiTypography-subtitle1, &.MuiTypography-subtitle2, &.MuiTypography-body1, &.MuiTypography-body2, &.MuiTypography-caption, &.MuiTypography-overline": {
      marginTop: 0,
      marginBottom: 0,
    },
    
    ...(eyebrow && {
      textTransform: MSQDX_TYPOGRAPHY.textTransform.uppercase,
      letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.widest,
      fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
      fontWeight: MSQDX_TYPOGRAPHY.fontWeight.bold,
      color: theme.palette.text.secondary,
      marginBottom: MSQDX_SPACING.scale.xxs,
    }),
  };
});

/**
 * MsqdxTypography
 * 
 * Central typography component for the MSQDX Glass Design System.
 * Built on top of MUI Typography with built-in branding and special variants.
 * 
 * Features:
 * - All MUI Typography variants (h1-h6, subtitle1/2, body1/2, caption, overline, button)
 * - Custom font weight support
 * - Eyebrow variant for labels
 * - Uses design tokens for typography
 * - No default margins (explicit spacing control)
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <MsqdxTypography variant="h1">Heading 1</MsqdxTypography>
 * 
 * // With custom weight
 * <MsqdxTypography variant="h2" weight="extrabold">Bold Heading</MsqdxTypography>
 * 
 * // Eyebrow style
 * <MsqdxTypography eyebrow>Section Label</MsqdxTypography>
 * ```
 */
export const MsqdxTypography = ({ 
  children,
  weight,
  eyebrow,
  variant = "body1",
  ...props 
}: MsqdxTypographyProps) => {
  return (
    <StyledTypography
      variant={variant}
      weight={weight}
      eyebrow={eyebrow}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};
