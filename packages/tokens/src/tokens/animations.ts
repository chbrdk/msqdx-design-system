/**
 * MSQDX Animation Tokens
 *
 * Duration, easing, transitions and animation presets for consistent motion.
 */
import { MSQDX_EFFECTS } from './effects';

/** Animation duration tokens (alias from effects for semantic use) */
export const MSQDX_ANIMATION_DURATION = {
  instant: MSQDX_EFFECTS.duration.instant,
  fast: MSQDX_EFFECTS.duration.fast,
  standard: MSQDX_EFFECTS.duration.standard,
  slow: MSQDX_EFFECTS.duration.slow,
  slower: MSQDX_EFFECTS.duration.slower,
  slowest: MSQDX_EFFECTS.duration.slowest,
};

/** Animation easing tokens (alias from effects for semantic use) */
export const MSQDX_ANIMATION_EASING = {
  linear: MSQDX_EFFECTS.easing.linear,
  easeIn: MSQDX_EFFECTS.easing.easeIn,
  easeOut: MSQDX_EFFECTS.easing.easeOut,
  easeInOut: MSQDX_EFFECTS.easing.easeInOut,
  spring: MSQDX_EFFECTS.easing.spring,
  bounce: MSQDX_EFFECTS.easing.bounce,
};

/** Pre-composed transition strings (duration + easing) */
export const MSQDX_ANIMATION_TRANSITIONS = {
  fast: MSQDX_EFFECTS.transitions.fast,
  standard: MSQDX_EFFECTS.transitions.standard,
  slow: MSQDX_EFFECTS.transitions.slow,
  spring: MSQDX_EFFECTS.transitions.spring,
};

/** Animation presets – full CSS transition/animation shorthand for common effects */
export const MSQDX_ANIMATIONS = {
  fadeIn: `${MSQDX_EFFECTS.duration.standard} opacity ${MSQDX_EFFECTS.easing.easeOut}`,
  fadeOut: `${MSQDX_EFFECTS.duration.fast} opacity ${MSQDX_EFFECTS.easing.easeIn}`,
  scaleIn: `${MSQDX_EFFECTS.duration.standard} transform ${MSQDX_EFFECTS.easing.spring}`,
  scaleOut: `${MSQDX_EFFECTS.duration.fast} transform ${MSQDX_EFFECTS.easing.easeIn}`,
  slideUp: `${MSQDX_EFFECTS.duration.standard} transform ${MSQDX_EFFECTS.easing.easeOut}`,
  slideDown: `${MSQDX_EFFECTS.duration.standard} transform ${MSQDX_EFFECTS.easing.easeOut}`,
  expand: `${MSQDX_EFFECTS.duration.slow} height ${MSQDX_EFFECTS.easing.easeInOut}, ${MSQDX_EFFECTS.duration.slow} opacity ${MSQDX_EFFECTS.easing.easeOut}`,
  collapse: `${MSQDX_EFFECTS.duration.fast} height ${MSQDX_EFFECTS.easing.easeIn}, ${MSQDX_EFFECTS.duration.fast} opacity ${MSQDX_EFFECTS.easing.easeIn}`,
  default: MSQDX_EFFECTS.transitions.standard,
};

/** Keyframe names for @keyframes (use with animation-name in CSS/JS) */
export const MSQDX_ANIMATION_KEYFRAMES = {
  fadeIn: 'msqdx-fade-in',
  fadeOut: 'msqdx-fade-out',
  slideUp: 'msqdx-slide-up',
  slideDown: 'msqdx-slide-down',
  scaleIn: 'msqdx-scale-in',
  spin: 'msqdx-spin',
  pulse: 'msqdx-pulse',
};
