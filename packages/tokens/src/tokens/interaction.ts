/**
 * MSQDX Interaction & Accessibility Tokens
 *
 * Min touch target, focus outline, and reduced motion for accessible UIs.
 */

export const MSQDX_INTERACTION = {
  /**
   * Min Touch Target
   * Mindestgröße für klickbare/touchbare Elemente (WCAG, Mobile).
   * Empfehlung: mind. 44×44px (Apple HIG) bzw. 48×48px (Material).
   */
  minTouchTarget: {
    /** WCAG / Apple HIG: 44px */
    min: 44,
    /** Material Design: 48px */
    recommended: 48,
    /** Kompakte UIs (z. B. dichte Listen), nur wenn nötig */
    compact: 32,
  },

  /**
   * Focus Outline
   * Für :focus-visible – outline-Werte (ergänzt focusRing box-shadow in effects).
   * Nutzung: outline: `${width}px ${style} ${color}`, outlineOffset: `${offset}px`
   */
  focusOutline: {
    width: 2,
    offset: 2,
    style: "solid" as const,
  },

  /**
   * Reduced Motion
   * Wenn prefers-reduced-motion: reduce – Animationen deaktivieren oder stark verkürzen.
   * Nutzung: @media (prefers-reduced-motion: reduce) { transition-duration: MSQDX_INTERACTION.reducedMotion.duration }
   */
  reducedMotion: {
    duration: "0ms",
    /** Für JS: sofort keine Animation */
    durationMs: 0,
  },
} as const;
