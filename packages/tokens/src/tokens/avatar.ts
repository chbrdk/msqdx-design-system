/**
 * MSQDX Avatar Tokens
 *
 * Avatar-specific design tokens for sizes, variants, and styles.
 */
import { MSQDX_SPACING, MSQDX_EFFECTS, MSQDX_COLORS } from './index';

export const MSQDX_AVATAR = {
  // Avatar Sizes
  size: {
    xs: {
      width: 24, // 24px
      height: 24, // 24px
      fontSize: "0.625rem", // 10px
      iconSize: 12, // 12px
    },
    sm: {
      width: 32, // 32px
      height: 32, // 32px
      fontSize: "0.75rem", // 12px
      iconSize: 16, // 16px
    },
    md: {
      width: 40, // 40px
      height: 40, // 40px
      fontSize: "0.8125rem", // 13px
      iconSize: 20, // 20px
    },
    lg: {
      width: 56, // 56px
      height: 56, // 56px
      fontSize: "1rem", // 16px
      iconSize: 28, // 28px
    },
    xl: {
      width: 80, // 80px
      height: 80, // 80px
      fontSize: "1.25rem", // 20px
      iconSize: 40, // 40px
    },
    xxl: {
      width: 120, // 120px
      height: 120, // 120px
      fontSize: "1.875rem", // 30px
      iconSize: 60, // 60px
    },
  },
  // Border Radius
  borderRadius: {
    circle: MSQDX_SPACING.borderRadius.circle, // 50% - perfect circle
    rounded: MSQDX_SPACING.borderRadius.md, // 20px - rounded square
    square: MSQDX_SPACING.borderRadius.none, // 0 - square
  },
  // Border
  border: {
    width: 2, // 2px
    color: MSQDX_COLORS.light.border,
    style: 'solid' as const,
  },
  // Background colors for fallback (when no image)
  fallbackBackground: {
    purple: MSQDX_COLORS.tints.purple,
    yellow: MSQDX_COLORS.tints.yellow,
    pink: MSQDX_COLORS.tints.pink,
    orange: MSQDX_COLORS.tints.orange,
    green: MSQDX_COLORS.tints.green,
    default: MSQDX_COLORS.light.border,
  },
  // Text color for initials
  textColor: {
    light: MSQDX_COLORS.light.textPrimary,
    dark: MSQDX_COLORS.dark.textPrimary,
  },
  // Shadows
  shadow: {
    none: MSQDX_EFFECTS.shadows.none,
    sm: MSQDX_EFFECTS.shadows.sm,
    md: MSQDX_EFFECTS.shadows.md,
  },
  // Transitions
  transition: `${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}`,
} as const;

/**
 * Get avatar size configuration
 *
 * @example
 * ```tsx
 * import { getAvatarSize } from '@msqdx/tokens';
 *
 * const size = getAvatarSize('md');
 * // { width: 40, height: 40, fontSize: "0.8125rem", iconSize: 20 }
 * ```
 */
export const getAvatarSize = (size: keyof typeof MSQDX_AVATAR.size) => {
  return MSQDX_AVATAR.size[size];
};
