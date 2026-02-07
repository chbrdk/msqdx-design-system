/**
 * Shared A11y & Animation helpers for atoms.
 * Use with MSQDX_INTERACTION and MSQDX_EFFECTS so transitions respect reduced motion.
 */
import { MSQDX_INTERACTION, MSQDX_EFFECTS } from '@msqdx/tokens';

/** Styles to apply so transitions are disabled when user prefers reduced motion */
export const reducedMotionStyles = {
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    transitionDuration: MSQDX_INTERACTION.reducedMotion.duration,
  },
} as const;

/** Focus-visible outline from interaction token (for keyboard focus) */
export const focusOutlineStyles = {
  '&:focus-visible': {
    outline: `${MSQDX_INTERACTION.focusOutline.width}px ${MSQDX_INTERACTION.focusOutline.style} currentColor`,
    outlineOffset: `${MSQDX_INTERACTION.focusOutline.offset}px`,
  },
} as const;

/** Min touch target (px) for interactive elements – use as minWidth/minHeight */
export const minTouchTarget = MSQDX_INTERACTION.minTouchTarget.min;
export const minTouchTargetRecommended = MSQDX_INTERACTION.minTouchTarget.recommended;
export const minTouchTargetCompact = MSQDX_INTERACTION.minTouchTarget.compact;

/** Standard transition string from effects (use for hover/focus transitions) */
export const transitionStandard = MSQDX_EFFECTS.transitions.standard;
