/**
 * MSQDX Button Tokens
 * 
 * Button-specific design tokens for sizes, variants, and styles.
 */

import { MSQDX_SPACING, MSQDX_TYPOGRAPHY, MSQDX_EFFECTS, MSQDX_ICONS } from './index';

export const MSQDX_BUTTON = {
  // Button Sizes (reduced by 10%)
  // Icon sizes reference MSQDX_ICONS.button for consistency
  size: {
    small: {
      height: 29,
      padding: {
        horizontal: 14,
        vertical: 7,
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, // 12px – eine Stufe kleiner
      iconSize: MSQDX_ICONS.button.small,
      gap: 7,
    },
    medium: {
      height: 36,
      padding: {
        horizontal: 22,
        vertical: 7,
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, // 14px – eine Stufe kleiner
      iconSize: MSQDX_ICONS.button.medium,
      gap: 11,
    },
    large: {
      height: 43,
      padding: {
        horizontal: 29,
        vertical: 11,
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.base, // 16px – eine Stufe kleiner
      iconSize: MSQDX_ICONS.button.large,
      gap: 14,
    },
  },

  // Border Radius
  borderRadius: {
    default: MSQDX_SPACING.borderRadius.full, // 999px - pill shape
    square: MSQDX_SPACING.borderRadius.button, // 32px - rounded square
    rounded: MSQDX_SPACING.borderRadius.lg, // 40px - rounded
  },

  // Font Family
  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.secondary, // IBM Plex Mono

  // Font Weight (eine Stufe höher als zuvor: regular 400)
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.regular, // 400

  // Transitions
  transition: {
    default: `${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}`,
    fast: `${MSQDX_EFFECTS.duration.fast} ${MSQDX_EFFECTS.easing.easeOut}`,
  },

  // Shadows
  shadow: {
    default: MSQDX_EFFECTS.shadows.none,
    hover: MSQDX_EFFECTS.shadows.sm,
    focus: MSQDX_EFFECTS.shadows.focusRing.default,
  },

  // Opacity
  opacity: {
    disabled: MSQDX_EFFECTS.opacity.medium, // 0.4
    hover: MSQDX_EFFECTS.opacity.strong, // 0.8
  },
} as const;

/**
 * Get icon size for a specific button size
 * Use this helper when creating icons for buttons to ensure consistency
 * 
 * @example
 * ```tsx
 * import { getButtonIconSize } from '@msqdx/design-system/tokens';
 * 
 * <MsqdxIcon name="Add" customSize={getButtonIconSize('medium')} />
 * ```
 */
export const getButtonIconSize = (size: 'small' | 'medium' | 'large'): number => {
  return MSQDX_BUTTON.size[size].iconSize;
};
