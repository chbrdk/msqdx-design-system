/**
 * MSQDX Effects Tokens
 * 
 * Glass effects, shadows, transitions, and z-index scale.
 */

export const MSQDX_EFFECTS = {
  glass: {
    blur: "12px",
    saturate: "150%",
  },
  shadows: {
    light: "none",
    dark: "none",
  },
  // Animation & Transitions
  transitions: {
    fast: "0.15s ease-out",
    standard: "0.2s ease-in-out",
    slow: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
};

