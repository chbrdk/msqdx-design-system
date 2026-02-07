"use client";

import { Button, CircularProgress, alpha, styled } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { 
  MSQDX_COLORS, 
  MSQDX_TYPOGRAPHY, 
  MSQDX_SPACING, 
  MSQDX_BUTTON,
  MSQDX_BRAND_PRIMARY,
  MSQDX_EFFECTS,
} from "@msqdx/tokens";
import { reducedMotionStyles, minTouchTarget } from "../../../utils/atomA11y";

// Brand color type
export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green';

// Button variant type
export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'glass';

// Button size type
export type ButtonSize = 'small' | 'medium' | 'large';

export interface MsqdxButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  /**
   * Loading state - shows a spinner and disables the button
   */
  loading?: boolean;
  
  /**
   * Glass variant - applies glassmorphism effect
   */
  glass?: boolean;
  
  /**
   * Button variant style
   * @default 'contained'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'small'
   */
  size?: ButtonSize;
  
  /**
   * Brand color - uses MSQDX brand colors (purple, yellow, pink, orange, green)
   * If not provided, uses MUI's standard color prop (primary, secondary, success, warning, error, info)
   */
  brandColor?: BrandColor;
  
  /**
   * Border radius variant
   * @default 'default' (pill shape)
   */
  borderRadius?: 'default' | 'square' | 'rounded';
}

// Get brand color value
const getBrandColor = (brandColor?: BrandColor): string => {
  if (!brandColor) return MSQDX_COLORS.brand.green; // Default to green
  
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

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => 
    prop !== "loading" && 
    prop !== "glass" && 
    prop !== "brandColor" && 
    prop !== "borderRadius",
})<MsqdxButtonProps>(({ theme, glass, brandColor, size = 'small', borderRadius = 'default' }) => {
  const brandColorValue = brandColor ? getBrandColor(brandColor) : MSQDX_COLORS.brand.green;
  const brandTint = brandColor ? getBrandColorTint(brandColor) : MSQDX_COLORS.tints.green;
  const sizeConfig = MSQDX_BUTTON.size[size];
  
  return {
    // Typography
    fontFamily: MSQDX_BUTTON.fontFamily,
    fontWeight: MSQDX_BUTTON.fontWeight,
    fontSize: sizeConfig.fontSize,
    textTransform: "none",
    letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.normal,
    
    // Sizing (min touch target for a11y)
    minWidth: 'auto',
    minHeight: `${Math.max(sizeConfig.height, minTouchTarget)}px`,
    height: `${sizeConfig.height}px`,
    padding: `${sizeConfig.padding.vertical}px ${sizeConfig.padding.horizontal}px`,
    borderRadius: MSQDX_BUTTON.borderRadius[borderRadius],
    
    // Transitions
    transition: MSQDX_BUTTON.transition.default,
    
    // Shadows
    boxShadow: MSQDX_BUTTON.shadow.default,
    
    // Icon spacing
    '& .MuiButton-startIcon': {
      marginRight: `${sizeConfig.gap}px`,
      marginLeft: 0,
    },
    '& .MuiButton-endIcon': {
      marginLeft: `${sizeConfig.gap}px`,
      marginRight: 0,
    },
    
    // Hover state
    "&:hover": {
      boxShadow: MSQDX_BUTTON.shadow.hover,
    },
    
    // Focus state (keyboard a11y)
    "&:focus-visible": {
      outline: 'none',
      boxShadow: MSQDX_BUTTON.shadow.focus,
    },
    // Reduced motion
    ...reducedMotionStyles,
    
    // Disabled state
    "&:disabled": {
      opacity: MSQDX_BUTTON.opacity.disabled,
    },
    
    // Glass variant
    ...(glass && {
      background: alpha(theme.palette.background.paper, MSQDX_EFFECTS.opacity.subtle),
      backdropFilter: `blur(${MSQDX_EFFECTS.glass.blur})`,
      WebkitBackdropFilter: `blur(${MSQDX_EFFECTS.glass.blur})`,
      border: `1px solid ${alpha(brandColorValue, MSQDX_EFFECTS.opacity.light)}`,
      color: theme.palette.text.primary,
      "&:hover": {
        background: alpha(theme.palette.background.paper, MSQDX_EFFECTS.opacity.light),
        borderColor: brandColorValue,
        boxShadow: MSQDX_BUTTON.shadow.hover,
      },
      "&:disabled": {
        background: alpha(theme.palette.background.paper, MSQDX_EFFECTS.opacity.subtle),
        borderColor: alpha(theme.palette.text.disabled, MSQDX_EFFECTS.opacity.subtle),
      },
    }),
    
    // Brand color variants (when brandColor is provided)
    ...(brandColor && !glass && {
      // Contained variant with brand color
      "&.MuiButton-contained": {
        background: brandColorValue,
        color: theme.palette.getContrastText(brandColorValue),
        "&:hover": {
          background: alpha(brandColorValue, MSQDX_BUTTON.opacity.hover),
        },
        "&:disabled": {
          background: alpha(brandColorValue, MSQDX_BUTTON.opacity.disabled),
        },
      },
      // Outlined variant with brand color
      "&.MuiButton-outlined": {
        borderColor: brandColorValue,
        color: brandColorValue,
        "&:hover": {
          borderColor: brandColorValue,
          background: alpha(brandColorValue, MSQDX_EFFECTS.opacity.subtle),
        },
        "&:disabled": {
          borderColor: alpha(brandColorValue, MSQDX_BUTTON.opacity.disabled),
          color: alpha(brandColorValue, MSQDX_BUTTON.opacity.disabled),
        },
      },
      // Text variant with brand color
      "&.MuiButton-text": {
        color: brandColorValue,
        "&:hover": {
          background: alpha(brandColorValue, MSQDX_EFFECTS.opacity.subtle),
        },
        "&:disabled": {
          color: alpha(brandColorValue, MSQDX_BUTTON.opacity.disabled),
        },
      },
    }),
    
    // Standard MUI color variants (when brandColor is not provided)
    ...(!brandColor && {
      "&.MuiButton-containedPrimary": {
        background: MSQDX_COLORS.brand.green,
        "&:hover": {
          background: alpha(MSQDX_COLORS.brand.green, MSQDX_BUTTON.opacity.hover),
        },
      },
      "&.MuiButton-containedSecondary": {
        background: MSQDX_COLORS.brand.yellow,
        color: theme.palette.getContrastText(MSQDX_COLORS.brand.yellow),
        "&:hover": {
          background: alpha(MSQDX_COLORS.brand.yellow, MSQDX_BUTTON.opacity.hover),
        },
      },
    }),
  };
});

/**
 * MsqdxButton
 * 
 * Comprehensive button component for the MSQDX Glass Design System.
 * 
 * Features:
 * - Multiple variants: contained, outlined, text, glass
 * - All brand colors: purple, yellow, pink, orange, green
 * - Three sizes: small, medium, large
 * - Loading state with spinner
 * - Disabled state
 * - Icon support (start/end)
 * - Uses IBM Plex Mono font (secondary font)
 * - Fully tokenized with design tokens
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <MsqdxButton variant="contained" brandColor="purple">
 *   Click me
 * </MsqdxButton>
 * 
 * // Glass variant
 * <MsqdxButton variant="glass" brandColor="green" size="large">
 *   Glass Button
 * </MsqdxButton>
 * 
 * // With icon and loading
 * <MsqdxButton 
 *   variant="outlined" 
 *   brandColor="orange" 
 *   startIcon={<MsqdxIcon name="Add" />}
 *   loading
 * >
 *   Add Item
 * </MsqdxButton>
 * ```
 */
export const MsqdxButton = ({ 
  loading, 
  glass,
  variant = glass ? undefined : 'contained',
  brandColor,
  size = 'small',
  borderRadius = 'default',
  children, 
  disabled, 
  startIcon, 
  endIcon,
  ...props 
}: MsqdxButtonProps) => {
  // Determine MUI variant (glass uses outlined as base)
  const muiVariant: 'contained' | 'outlined' | 'text' = glass 
    ? 'outlined' 
    : (variant === 'glass' ? 'outlined' : (variant || 'contained'));
  
  // Remove color from props if brandColor is provided
  const { color, ...restProps } = props;
  const muiColor = brandColor ? undefined : (color || 'primary');
  
  return (
    <StyledButton
      variant={muiVariant}
      color={muiColor}
      brandColor={brandColor}
      glass={glass}
      size={size}
      borderRadius={borderRadius}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={MSQDX_BUTTON.size[size].iconSize} color="inherit" /> : startIcon}
      endIcon={endIcon}
      {...restProps}
    >
      {children}
    </StyledButton>
  );
};
