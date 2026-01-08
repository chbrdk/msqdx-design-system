"use client";

import type { TypographyProps } from "@mui/material";
import { Typography, styled } from "@mui/material";
import type { ReactNode } from "react";
import { MSQDX_TYPOGRAPHY } from "../../../tokens";

export type FontWeightVariant = 
  | "thin" 
  | "extralight" 
  | "light" 
  | "regular" 
  | "medium" 
  | "semibold" 
  | "bold" 
  | "extrabold" 
  | "black"
  | number;

export interface MsqdxTypographyProps extends Omit<TypographyProps, 'fontWeight'> {
  children: ReactNode;
  eyebrow?: boolean;
  weight?: FontWeightVariant;
}

// Default font weights for different variants
const VARIANT_WEIGHTS: Record<string, number> = {
  h1: MSQDX_TYPOGRAPHY.fontWeight.extrabold, // 800
  h2: MSQDX_TYPOGRAPHY.fontWeight.extrabold, // 800
  h3: MSQDX_TYPOGRAPHY.fontWeight.bold, // 700
  h4: MSQDX_TYPOGRAPHY.fontWeight.bold, // 700
  h5: MSQDX_TYPOGRAPHY.fontWeight.semibold, // 600
  h6: MSQDX_TYPOGRAPHY.fontWeight.semibold, // 600
  subtitle1: MSQDX_TYPOGRAPHY.fontWeight.medium, // 500
  subtitle2: MSQDX_TYPOGRAPHY.fontWeight.semibold, // 600
  body1: MSQDX_TYPOGRAPHY.fontWeight.regular, // 400
  body2: MSQDX_TYPOGRAPHY.fontWeight.regular, // 400
  button: MSQDX_TYPOGRAPHY.fontWeight.semibold, // 600
  caption: MSQDX_TYPOGRAPHY.fontWeight.regular, // 400
  overline: MSQDX_TYPOGRAPHY.fontWeight.medium, // 500
};

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "eyebrow" && prop !== "weight",
})<MsqdxTypographyProps>(({ theme, eyebrow, weight, variant = "body1" }) => {
  // Determine font weight
  // Priority: explicit weight prop > variant default > theme default
  let fontWeight: number = MSQDX_TYPOGRAPHY.fontWeight.regular; // Default fallback
  
  if (weight) {
    // Explicit weight prop takes precedence
    if (typeof weight === 'number') {
      fontWeight = weight;
    } else if (weight in MSQDX_TYPOGRAPHY.fontWeight) {
      fontWeight = MSQDX_TYPOGRAPHY.fontWeight[weight as keyof typeof MSQDX_TYPOGRAPHY.fontWeight];
    }
  } else {
    // Use variant-specific default weight
    const variantKey = typeof variant === 'string' ? variant : 'body1';
    const variantWeight = VARIANT_WEIGHTS[variantKey];
    if (variantWeight) {
      fontWeight = variantWeight;
    } else {
      // Fallback to theme if variant not found
      fontWeight = (theme.typography.fontWeightRegular as number) || MSQDX_TYPOGRAPHY.fontWeight.regular;
    }
  }

  return {
    fontFamily: "var(--font-noto-sans-jp), sans-serif",
    fontWeight,
    
    ...(eyebrow && {
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      fontSize: "0.75rem",
      fontWeight: MSQDX_TYPOGRAPHY.fontWeight.bold,
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(0.5),
    }),
  };
});

/**
 * MsqdxTypography
 * 
 * Central typography component for the msqdx-glass design system.
 * Built on top of MUI Typography with built-in branding and special variants like 'eyebrow'.
 * 
 * @example
 * <MsqdxTypography variant="h1" weight="extrabold">Bold Heading</MsqdxTypography>
 * <MsqdxTypography variant="body1" weight="light">Light Text</MsqdxTypography>
 * <MsqdxTypography variant="body2" weight={500}>Custom Weight</MsqdxTypography>
 */
export const MsqdxTypography = ({ eyebrow, weight, ...props }: MsqdxTypographyProps) => {
  return <StyledTypography eyebrow={eyebrow} weight={weight} {...props} />;
};

