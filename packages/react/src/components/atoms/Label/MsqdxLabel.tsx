"use client";

import { Box, styled, SxProps, Theme } from "@mui/material";
import { 
  MSQDX_TYPOGRAPHY, 
  MSQDX_EFFECTS,
} from "@msqdx/tokens";
import React from "react";

export type LabelSize = 'small' | 'medium' | 'large';

/** Font family: primary (sans) or mono (IBM Plex Mono). */
export type LabelFont = 'primary' | 'mono';

/** Font weight from typography tokens. */
export type LabelWeight = keyof typeof MSQDX_TYPOGRAPHY.fontWeight;

/** Text transform from typography tokens. */
export type LabelTransform = keyof typeof MSQDX_TYPOGRAPHY.textTransform;

export interface MsqdxLabelProps {
  /**
   * Label text content
   */
  children: React.ReactNode;
  
  /**
   * Label size
   * @default 'medium'
   */
  size?: LabelSize;

  /**
   * Font family: primary (Noto Sans) or mono (IBM Plex Mono).
   * @default 'mono'
   */
  font?: LabelFont;

  /**
   * Font weight from design tokens.
   * @default 'bold'
   */
  weight?: LabelWeight;

  /**
   * Text transform (e.g. uppercase for labels).
   * @default 'uppercase'
   */
  transform?: LabelTransform;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Additional inline styles
   */
  sx?: SxProps<Theme>;
}

const sizeConfig: Record<LabelSize, { fontSize: string; letterSpacing: string }> = {
  small: {
    fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
    letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.wider,
  },
  medium: {
    fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
    letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.widest,
  },
  large: {
    fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
    letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.widest,
  },
};

const fontFamilyMap: Record<LabelFont, string> = {
  primary: MSQDX_TYPOGRAPHY.fontFamily.primary,
  mono: MSQDX_TYPOGRAPHY.fontFamily.mono,
};

const StyledLabel = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'size' && prop !== 'labelFont' && prop !== 'labelWeight' && prop !== 'labelTransform',
})<{
  size: LabelSize;
  labelFont: LabelFont;
  labelWeight: LabelWeight;
  labelTransform: LabelTransform;
}>(({ size, labelFont, labelWeight, labelTransform }) => {
  const config = sizeConfig[size];
  return {
    fontFamily: fontFamilyMap[labelFont],
    fontSize: config.fontSize,
    fontWeight: MSQDX_TYPOGRAPHY.fontWeight[labelWeight],
    letterSpacing: config.letterSpacing,
    textTransform: MSQDX_TYPOGRAPHY.textTransform[labelTransform],
    opacity: MSQDX_EFFECTS.opacity.strong,
    color: 'inherit',
    lineHeight: 1.4,
    margin: 0,
    display: 'inline-block',
  };
});

/**
 * MsqdxLabel
 *
 * Label component for section headings and labels. Uses mono font (IBM Plex Mono) by default.
 *
 * Features:
 * - Font: primary (sans) or mono (default)
 * - Sizes: small, medium, large
 * - Optional weight and text transform from typography tokens
 * - Uses design tokens for spacing and effects
 *
 * @example
 * ```tsx
 * <MsqdxLabel>Focus</MsqdxLabel>
 * <MsqdxLabel size="small" font="mono">Section</MsqdxLabel>
 * <MsqdxLabel size="large" weight="semibold" transform="uppercase">Heading</MsqdxLabel>
 * <MsqdxLabel font="primary" transform="none">No transform</MsqdxLabel>
 * ```
 */
export const MsqdxLabel = ({
  children,
  size = 'medium',
  font = 'mono',
  weight = 'bold',
  transform = 'uppercase',
  className,
  sx,
}: MsqdxLabelProps) => {
  return (
    <StyledLabel
      size={size}
      labelFont={font}
      labelWeight={weight}
      labelTransform={transform}
      className={className}
      sx={sx}
    >
      {children}
    </StyledLabel>
  );
};
