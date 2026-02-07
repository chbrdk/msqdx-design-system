"use client";

import { Box, styled, alpha } from "@mui/material";
import { 
  MSQDX_COLORS, 
  MSQDX_BADGE,
  MSQDX_BRAND_PRIMARY,
} from "@msqdx/tokens";
import React from "react";

// Brand color type
export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green';

// Badge size type
export type BadgeSize = 'small' | 'medium' | 'large';

export interface MsqdxBadgeProps {
  /**
   * Main label (number or string)
   */
  label: string | number;
  
  /**
   * Optional sublabel text
   */
  sublabel?: string;
  
  /**
   * Brand color - uses MSQDX brand colors (purple, yellow, pink, orange, green)
   * If not provided, uses standard color prop (primary, secondary, success, warning, error, info)
   */
  brandColor?: BrandColor;
  
  /**
   * Standard color (used when brandColor is not provided)
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Badge size
   * @default 'small'
   */
  size?: BadgeSize;
}

// Get brand color value
const getBrandColor = (brandColor?: BrandColor): string => {
  if (!brandColor) return MSQDX_COLORS.brand.green;
  
  switch (brandColor) {
    case 'purple':
      return MSQDX_BRAND_PRIMARY.purple;
    case 'yellow':
      return MSQDX_BRAND_PRIMARY.yellow;
    case 'pink':
      return MSQDX_BRAND_PRIMARY.pink;
    case 'orange':
      return MSQDX_BRAND_PRIMARY.orange;
    case 'green':
      return MSQDX_BRAND_PRIMARY.green;
    default:
      return MSQDX_COLORS.brand.green;
  }
};

const BadgeContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'size' && prop !== 'brandColor',
})<{ color: string; size: BadgeSize; brandColor?: BrandColor }>(({ theme, color, size, brandColor }) => {
  const brandColorValue = brandColor ? getBrandColor(brandColor) : null;
  const sizeConfig = MSQDX_BADGE.size[size];
  
  // Get base color (brand color or standard color)
  const getBaseColor = () => {
    if (brandColorValue) return brandColorValue;
    if (color === 'primary') return MSQDX_COLORS.brand.green;
    if (color === 'secondary') return MSQDX_COLORS.brand.yellow;
    if (color === 'success') return MSQDX_COLORS.status.success;
    if (color === 'warning') return MSQDX_COLORS.status.warning;
    if (color === 'error') return MSQDX_COLORS.status.error;
    if (color === 'info') return MSQDX_COLORS.status.info;
    return theme.palette.grey[500];
  };
  const baseColor = getBaseColor();

  return {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: `${sizeConfig.padding.vertical}px ${sizeConfig.padding.horizontal}px`,
    borderRadius: MSQDX_BADGE.borderRadius,
    backgroundColor: alpha(baseColor, MSQDX_BADGE.opacity.background),
    borderRight: `${sizeConfig.borderWidth}px solid ${baseColor}`,
    minWidth: `${sizeConfig.minWidth}px`,
  };
});

const Label = styled('span')<{ size: BadgeSize }>(({ size }) => ({
  fontFamily: MSQDX_BADGE.fontFamily,
  fontSize: MSQDX_BADGE.size[size].labelFontSize,
  fontWeight: MSQDX_BADGE.fontWeight.label,
  color: 'inherit',
  lineHeight: 1,
}));

const Sublabel = styled('span')<{ size: BadgeSize }>(({ theme, size }) => ({
  fontFamily: MSQDX_BADGE.fontFamily,
  fontSize: MSQDX_BADGE.size[size].sublabelFontSize,
  fontWeight: MSQDX_BADGE.fontWeight.sublabel,
  textTransform: MSQDX_BADGE.textTransform.sublabel,
  letterSpacing: MSQDX_BADGE.letterSpacing.sublabel,
  color: theme.palette.text.secondary,
  opacity: MSQDX_BADGE.opacity.sublabel,
  marginTop: `${MSQDX_BADGE.spacing.sublabelMarginTop}px`,
}));

/**
 * MsqdxBadge
 * 
 * Specialized badge component for displaying metrics and scores.
 * 
 * Features:
 * - All brand colors: purple, yellow, pink, orange, green
 * - Three sizes: small, medium, large
 * - Label and optional sublabel
 * - Uses IBM Plex Mono font (secondary font)
 * - Fully tokenized with design tokens
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <MsqdxBadge label={42} brandColor="green" />
 * 
 * // With sublabel
 * <MsqdxBadge 
 *   label="95" 
 *   sublabel="Score" 
 *   brandColor="purple" 
 * />
 * 
 * // Large size
 * <MsqdxBadge 
 *   label="100%" 
 *   sublabel="Match" 
 *   brandColor="orange"
 *   size="large"
 * />
 * ```
 */
export const MsqdxBadge = ({ 
  label, 
  sublabel, 
  brandColor,
  color = 'primary', 
  size = 'small' 
}: MsqdxBadgeProps) => {
  return (
    <BadgeContainer color={color} size={size} brandColor={brandColor}>
      <Label size={size}>{label}</Label>
      {sublabel && <Sublabel size={size}>{sublabel}</Sublabel>}
    </BadgeContainer>
  );
};
