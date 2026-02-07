/**
 * MSQDX Chip Tokens
 * 
 * Chip-specific design tokens for sizes, variants, and styles.
 */

import { MSQDX_SPACING, MSQDX_TYPOGRAPHY, MSQDX_EFFECTS, MSQDX_ICONS, MSQDX_BUTTON } from './index';

export const MSQDX_CHIP = {
  // Chip Sizes (kompakt; xs = noch kompakter für Cards)
  size: {
    xs: {
      height: 12,
      padding: {
        horizontal: MSQDX_SPACING.scale.xxs,
        vertical: 0,
      },
      fontSize: "0.625rem", // 10px – kleiner als xs (12px)
      iconSize: MSQDX_ICONS.sizes.xs,
      gap: MSQDX_SPACING.scale.xxs,
    },
    small: {
      height: 10,
      padding: {
        horizontal: MSQDX_SPACING.scale.xxs,
        vertical: 1,
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
      iconSize: MSQDX_ICONS.sizes.xs,
      gap: MSQDX_SPACING.scale.xxs,
    },
    medium: {
      height: 14,
      padding: {
        horizontal: MSQDX_SPACING.scale.xs,
        vertical: 1,
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
      iconSize: MSQDX_ICONS.sizes.xs,
      gap: MSQDX_SPACING.scale.xxs,
    },
    large: {
      height: 18,
      padding: {
        horizontal: MSQDX_SPACING.scale.sm,
        vertical: 2,
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
      iconSize: MSQDX_ICONS.sizes.sm,
      gap: MSQDX_SPACING.scale.xs,
    },
  },

  // Border Radius
  borderRadius: MSQDX_SPACING.borderRadius.chip, // 8px

  // Font Family
  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.secondary, // IBM Plex Mono

  // Font Weight
  fontWeight: {
    glass: MSQDX_TYPOGRAPHY.fontWeight.medium, // 500
    filled: MSQDX_TYPOGRAPHY.fontWeight.semibold, // 600
    outlined: MSQDX_TYPOGRAPHY.fontWeight.medium, // 500
  },

  // Transitions
  transition: MSQDX_EFFECTS.duration.standard, // 0.2s

  // Shadows
  shadow: {
    default: MSQDX_EFFECTS.shadows.none,
    hover: MSQDX_EFFECTS.shadows.xs,
    glow: (color: string) => `0 0 10px ${color}`, // Custom glow shadow
  },

  // Opacity
  opacity: {
    glass: {
      background: MSQDX_EFFECTS.opacity.subtle, // 0.1
      border: MSQDX_EFFECTS.opacity.light, // 0.2
      hover: MSQDX_EFFECTS.opacity.light, // 0.2
    },
    filled: {
      hover: MSQDX_BUTTON.opacity.hover, // 0.8
    },
    outlined: {
      border: MSQDX_EFFECTS.opacity.medium, // 0.4
      hover: MSQDX_EFFECTS.opacity.subtle, // 0.1
    },
  },
} as const;
