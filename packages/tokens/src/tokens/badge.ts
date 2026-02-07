/**
 * MSQDX Badge Tokens
 * 
 * Badge-specific design tokens for sizes, variants, and styles.
 */

import { MSQDX_SPACING, MSQDX_TYPOGRAPHY, MSQDX_EFFECTS } from './index';

export const MSQDX_BADGE = {
  // Badge Sizes
  size: {
    small: {
      padding: {
        horizontal: MSQDX_SPACING.scale.xs, // 8px
        vertical: MSQDX_SPACING.scale.xxs, // 4px (2px top, 2px bottom)
      },
      labelFontSize: MSQDX_TYPOGRAPHY.fontSize.sm, // 14px (0.875rem)
      sublabelFontSize: MSQDX_TYPOGRAPHY.fontSize.xs, // 12px (0.75rem)
      borderWidth: 2, // 2px
      minWidth: 50, // 50px
    },
    medium: {
      padding: {
        horizontal: MSQDX_SPACING.scale.sm, // 12px
        vertical: MSQDX_SPACING.scale.xxs, // 4px (2px top, 2px bottom)
      },
      labelFontSize: MSQDX_TYPOGRAPHY.fontSize.base, // 16px (1rem)
      sublabelFontSize: MSQDX_TYPOGRAPHY.fontSize.xs, // 12px (0.75rem)
      borderWidth: 3, // 3px
      minWidth: 60, // 60px
    },
    large: {
      padding: {
        horizontal: MSQDX_SPACING.scale.md, // 16px
        vertical: MSQDX_SPACING.scale.xs, // 8px (4px top, 4px bottom)
      },
      labelFontSize: MSQDX_TYPOGRAPHY.fontSize.lg, // 18px (1.125rem)
      sublabelFontSize: MSQDX_TYPOGRAPHY.fontSize.sm, // 14px (0.875rem)
      borderWidth: 4, // 4px
      minWidth: 80, // 80px
    },
  },

  // Border Radius
  borderRadius: MSQDX_SPACING.borderRadius.badge, // 6px

  // Font Family
  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.secondary, // IBM Plex Mono

  // Font Weight
  fontWeight: {
    label: MSQDX_TYPOGRAPHY.fontWeight.extrabold, // 800
    sublabel: MSQDX_TYPOGRAPHY.fontWeight.medium, // 500
  },

  // Letter Spacing
  letterSpacing: {
    sublabel: MSQDX_TYPOGRAPHY.letterSpacing.wider, // 0.05em
  },

  // Text Transform
  textTransform: {
    sublabel: MSQDX_TYPOGRAPHY.textTransform.uppercase,
  },

  // Opacity
  opacity: {
    background: MSQDX_EFFECTS.opacity.subtle, // 0.1
    sublabel: MSQDX_EFFECTS.opacity.strong, // 0.8
  },

  // Spacing
  spacing: {
    sublabelMarginTop: MSQDX_SPACING.scale.xxs, // 4px (2px)
  },
} as const;
