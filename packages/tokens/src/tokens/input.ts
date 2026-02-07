/**
 * MSQDX Input Tokens
 *
 * Input field-specific design tokens for sizes, variants, and styles.
 */
import { MSQDX_SPACING, MSQDX_TYPOGRAPHY, MSQDX_EFFECTS, MSQDX_COLORS, MSQDX_ICONS } from './index';
import { MSQDX_NEUTRAL } from './colors';

export const MSQDX_INPUT = {
  // Input Sizes (compact – alles eine Stufe kleiner)
  size: {
    small: {
      height: 30, // 30px
      padding: {
        horizontal: MSQDX_SPACING.scale.xs, // 8px
        vertical: MSQDX_SPACING.scale.xxs, // 4px
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, // 12px (0.75rem)
      iconSize: 14, // 14px
      gap: MSQDX_SPACING.scale.xxs, // 4px
    },
    medium: {
      height: 36, // 36px
      padding: {
        horizontal: MSQDX_SPACING.scale.sm, // 12px
        vertical: MSQDX_SPACING.scale.xs, // 8px
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, // 12px
      iconSize: 16, // 16px
      gap: MSQDX_SPACING.scale.xs, // 8px
    },
    large: {
      height: 42, // 42px
      padding: {
        horizontal: MSQDX_SPACING.scale.md, // 16px
        vertical: MSQDX_SPACING.scale.sm, // 12px
      },
      fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, // 14px (0.875rem)
      iconSize: 20, // 20px
      gap: MSQDX_SPACING.scale.sm, // 12px
    },
  },
  // Border Radius
  borderRadius: MSQDX_SPACING.borderRadius.md, // 20px (from msqdx.com --radius-md)
  // Font Family
  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary, // Noto Sans JP
  // Font Weight
  fontWeight: {
    label: MSQDX_TYPOGRAPHY.fontWeight.semibold, // 600
    input: MSQDX_TYPOGRAPHY.fontWeight.regular, // 400
    helper: MSQDX_TYPOGRAPHY.fontWeight.regular, // 400
  },
  // Label (kompakt)
  label: {
    fontSize: '0.6875rem', // 11px
    fontFamily: MSQDX_TYPOGRAPHY.fontFamily.secondary, // IBM Plex Mono
    textTransform: MSQDX_TYPOGRAPHY.textTransform.uppercase,
    letterSpacing: MSQDX_TYPOGRAPHY.letterSpacing.wider, // 0.05em
    gap: MSQDX_SPACING.scale.xxs, // 4px - gap between label and input
  },
  // Helper Text
  helper: {
    fontSize: '0.6875rem', // 11px
    marginTop: MSQDX_SPACING.scale.xxs, // 4px
  },
  // Textarea-specific
  textarea: {
    defaultMinRows: 4,
    lineHeight: MSQDX_TYPOGRAPHY.lineHeight.relaxed, // 1.625
    resize: 'vertical' as const,
  },
  // Transitions
  transition: `${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeInOut}`,
  // Background
  background: {
    default: `rgba(255, 255, 255, ${MSQDX_EFFECTS.opacity.subtle})`, // 0.1
    hover: `rgba(255, 255, 255, ${MSQDX_EFFECTS.opacity.light})`, // 0.2
    focused: `rgba(255, 255, 255, ${MSQDX_EFFECTS.opacity.medium})`, // 0.3
    disabled: `rgba(255, 255, 255, ${MSQDX_EFFECTS.opacity.invisible})`, // 0.05
  },
  // Border Colors (always full opacity / solid)
  border: {
    default: MSQDX_NEUTRAL[300], // #d4d4d4
    hover: MSQDX_NEUTRAL[400], // #a3a3a3
    focused: MSQDX_COLORS.brand.green,
    error: MSQDX_COLORS.status.error,
    success: MSQDX_COLORS.status.success,
    disabled: MSQDX_NEUTRAL[200], // #e5e5e5
  },
  // Focus Ring
  focusRing: {
    default: MSQDX_EFFECTS.shadows.focusRing.default,
    error: MSQDX_EFFECTS.shadows.focusRing.error,
    success: MSQDX_EFFECTS.shadows.focusRing.success,
  },
  // Backdrop Filter
  backdropFilter: `blur(${MSQDX_EFFECTS.glass.blur})`, // 12px
  // Icon Colors
  icon: {
    default: `rgba(0, 0, 0, ${MSQDX_EFFECTS.opacity.strong})`, // 0.7
    error: MSQDX_COLORS.status.error,
    success: MSQDX_COLORS.status.success,
    disabled: `rgba(0, 0, 0, ${MSQDX_EFFECTS.opacity.half})`, // 0.5
  },
} as const;

/**
 * Get input size configuration
 *
 * @example
 * ```tsx
 * import { getInputSize } from '@msqdx/tokens';
 *
 * const size = getInputSize('medium');
 * // { height: 44, padding: { horizontal: 16, vertical: 12 }, fontSize: "1rem", iconSize: 20, gap: 12 }
 * ```
 */
export const getInputSize = (size: keyof typeof MSQDX_INPUT.size) => {
  return MSQDX_INPUT.size[size];
};
