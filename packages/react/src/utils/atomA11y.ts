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

/** Duration + easing only — invalid alone in `transition` (CSS defaults to `all`). */
export const transitionTiming = MSQDX_EFFECTS.transitions.standard;

/** @deprecated Use {@link transitionProperties} — bare timing animates all properties. */
export const transitionStandard = transitionTiming;

/** Build targeted transition declarations (avoids implicit CSS `all`). */
export function transitionProperties(...properties: string[]): string {
  return properties.map((prop) => `${prop} ${transitionTiming}`).join(", ");
}

/** Cards, buttons, avatars, chips — hover/focus surfaces */
export const transitionInteractive = transitionProperties(
  "background-color",
  "border-color",
  "box-shadow",
  "color",
  "opacity",
);

/** Lift / scale hover (e.g. clickable cards) */
export const transitionTransform = transitionProperties("transform", "box-shadow");

/** MUI LinearProgress bar width */
export const transitionProgressFill = transitionProperties("transform", "background-color");

/** Scrollbar thumb hover */
export const transitionScrollbarThumb = transitionProperties("background-color");

/** Switch track checked state */
export const transitionSwitchTrack = transitionProperties("background-color", "opacity");
