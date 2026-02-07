"use client";

import { Chip, styled, alpha } from "@mui/material";
import type { ChipProps } from "@mui/material";
import { 
  MSQDX_COLORS, 
  MSQDX_TYPOGRAPHY, 
  MSQDX_SPACING, 
  MSQDX_CHIP,
  MSQDX_BRAND_PRIMARY,
  MSQDX_EFFECTS,
  MSQDX_ICONS,
} from "@msqdx/tokens";
import { reducedMotionStyles, focusOutlineStyles } from "../../../utils/atomA11y";
import React from "react";

// Brand color type
export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green';

// Chip variant type
export type ChipVariant = 'glass' | 'filled' | 'outlined';

// Chip size type (xs = kompakteste Variante, kleinere Schrift, wenig Padding)
export type ChipSize = 'xs' | 'small' | 'medium' | 'large';

export interface MsqdxChipProps extends Omit<ChipProps, 'variant' | 'size'> {
  /**
   * Chip variant style
   * @default 'glass'
   */
  variant?: ChipVariant;
  
  /**
   * Chip size
   * @default 'small'
   */
  size?: ChipSize;
  
  /**
   * Brand color - uses MSQDX brand colors (purple, yellow, pink, orange, green)
   * If not provided, uses MUI's standard color prop (primary, secondary, success, warning, error, info)
   */
  brandColor?: BrandColor;
  
  /**
   * Enable glow effect
   */
  glow?: boolean;

  /**
   * Icon weight (for MsqdxIcon). Heavier weight improves visibility in chips.
   * @default 'medium'
   */
  iconWeight?: keyof typeof MSQDX_ICONS.weight;
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

// Get brand color tint for glass variant
const getBrandColorTint = (brandColor?: BrandColor): string => {
  if (!brandColor) return MSQDX_COLORS.tints.green;
  
  switch (brandColor) {
    case 'purple':
      return MSQDX_COLORS.tints.purple;
    case 'yellow':
      return MSQDX_COLORS.tints.yellow;
    case 'pink':
      return MSQDX_COLORS.tints.pink;
    case 'orange':
      return MSQDX_COLORS.tints.orange;
    case 'green':
      return MSQDX_COLORS.tints.green;
    default:
      return MSQDX_COLORS.tints.green;
  }
};

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => 
    prop !== 'glow' && 
    prop !== 'customVariant' && 
    prop !== 'brandColor' &&
    prop !== 'chipSize',
})<MsqdxChipProps & { customVariant?: ChipVariant; chipSize?: ChipSize }>(({ 
  theme, 
  customVariant = 'glass', 
  glow, 
  color = 'primary',
  brandColor,
  chipSize = 'small',
}) => {
  const brandColorValue = brandColor ? getBrandColor(brandColor) : null;
  const sizeConfig = MSQDX_CHIP.size[chipSize] ?? MSQDX_CHIP.size.small;
  
  // Get base color (brand color or MUI color)
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
    // Typography
    fontFamily: MSQDX_CHIP.fontFamily,
    fontWeight: MSQDX_CHIP.fontWeight[customVariant],
    fontSize: sizeConfig.fontSize,
    letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.normal,
    
    // Sizing (einheitliche Min-Höhe für alle Chips)
    minHeight: "28px",
    height: `${sizeConfig.height}px`,
    padding: `${sizeConfig.padding.vertical}px ${sizeConfig.padding.horizontal}px`,
    borderRadius: MSQDX_CHIP.borderRadius,
    
    // Transitions
    transition: `all ${MSQDX_CHIP.transition} ${MSQDX_EFFECTS.easing.easeInOut}`,
    
    // Shadows
    boxShadow: MSQDX_CHIP.shadow.default,
    
    // Icon spacing and vertical alignment
    color: MSQDX_COLORS.brand.black,
    '& .MuiChip-icon': {
      fontSize: `${sizeConfig.iconSize}px`,
      width: `${sizeConfig.iconSize}px`,
      height: `${sizeConfig.iconSize}px`,
      marginLeft: 0,
      marginRight: `${sizeConfig.gap}px`,
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .msqdx-material-symbol, .material-symbols-outlined': {
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1,
      },
    },
    '& .MuiChip-label': {
      paddingLeft: 0,
      paddingRight: 0,
    },
    
    // Hover state
    '&:hover': {
      boxShadow: MSQDX_CHIP.shadow.hover,
    },
    // Focus (keyboard a11y)
    ...focusOutlineStyles,
    // Reduced motion
    ...reducedMotionStyles,
    
    // Glass variant (Text immer schwarzer Token)
    ...(customVariant === 'glass' && {
      backgroundColor: alpha(baseColor, MSQDX_CHIP.opacity.glass.background),
      backdropFilter: `blur(${MSQDX_EFFECTS.glass.blur})`,
      WebkitBackdropFilter: `blur(${MSQDX_EFFECTS.glass.blur})`,
      border: `1px solid ${alpha(baseColor, MSQDX_CHIP.opacity.glass.border)}`,
      '&:hover': {
        backgroundColor: alpha(baseColor, MSQDX_CHIP.opacity.glass.hover),
        borderColor: alpha(baseColor, MSQDX_CHIP.opacity.glass.border + 0.1),
      },
    }),
    // Filled variant (Text weiß für Kontrast auf bunter Fläche)
    ...(customVariant === 'filled' && {
      backgroundColor: baseColor,
      color: MSQDX_COLORS.brand.white,
      '&:hover': {
        backgroundColor: alpha(baseColor, MSQDX_CHIP.opacity.filled.hover),
      },
    }),
    // Outlined variant (Text immer schwarzer Token)
    ...(customVariant === 'outlined' && {
      backgroundColor: 'transparent',
      border: `1px solid ${alpha(baseColor, MSQDX_CHIP.opacity.outlined.border)}`,
      '&:hover': {
        backgroundColor: alpha(baseColor, MSQDX_CHIP.opacity.outlined.hover),
        borderColor: baseColor,
      },
    }),
    
    // Glow effect
    ...(glow && {
      boxShadow: MSQDX_CHIP.shadow.glow(alpha(baseColor, MSQDX_EFFECTS.opacity.light)),
      '&:hover': {
        boxShadow: MSQDX_CHIP.shadow.glow(alpha(baseColor, MSQDX_EFFECTS.opacity.medium)),
      },
    }),
  };
});

/**
 * MsqdxChip
 * 
 * Versatile chip component for categories, tags, and status indicators.
 * 
 * Features:
 * - Multiple variants: glass, filled, outlined
 * - All brand colors: purple, yellow, pink, orange, green
 * - Three sizes: small, medium, large
 * - Glow effect option
 * - Icon support
 * - Uses IBM Plex Mono font (secondary font)
 * - Fully tokenized with design tokens
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <MsqdxChip variant="glass" brandColor="purple" label="Tag" />
 * 
 * // With icon
 * <MsqdxChip 
 *   variant="filled" 
 *   brandColor="green" 
 *   label="Success"
 *   icon={<MsqdxIcon name="Check" />}
 * />
 * 
 * // With glow
 * <MsqdxChip 
 *   variant="glass" 
 *   brandColor="pink" 
 *   label="Featured"
 *   glow
 * />
 * ```
 */
export const MsqdxChip = ({ 
  variant = 'glass', 
  size = 'small',
  brandColor,
  glow,
  iconWeight = 'medium',
  icon,
  ...props 
}: MsqdxChipProps) => {
  // Determine MUI variant
  const muiVariant = variant === 'glass' || variant === 'filled' ? 'filled' : 'outlined';
  
  // Determine MUI color (only if brandColor is not provided)
  const { color, ...restProps } = props;
  const muiColor = brandColor ? undefined : (color || 'primary');

  // Apply default icon weight so chip icons are heavier; allow override via icon's own weight
  const resolvedIcon =
    icon && React.isValidElement(icon) && (icon.props as { weight?: keyof typeof MSQDX_ICONS.weight })?.weight == null
      ? React.cloneElement(icon as React.ReactElement<{ weight?: keyof typeof MSQDX_ICONS.weight }>, {
          weight: iconWeight,
        })
      : icon;
  
  return (
    <StyledChip
      variant={muiVariant}
      color={muiColor as any}
      customVariant={variant}
      brandColor={brandColor}
      chipSize={size}
      glow={glow}
      icon={resolvedIcon}
      {...restProps}
    />
  );
};
