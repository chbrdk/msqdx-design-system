/**
 * MSQDX Typography Tokens
 * 
 * Font families, sizes, line heights, and font weights.
 */

export const MSQDX_TYPOGRAPHY = {
  fontFamily: {
    primary: '"Noto Sans JP", "Noto Sans JP Fallback", system-ui, sans-serif',
    secondary: '"IBM Plex Mono", "IBM Plex Mono Fallback", ui-monospace, monospace',
    mono: '"IBM Plex Mono", "IBM Plex Mono Fallback", ui-monospace, monospace',
  },
  fontSize: {
    xs: "0.75rem",      // 12px - from msqdx.com
    sm: "0.875rem",     // 14px - from msqdx.com
    base: "1rem",       // 16px - from msqdx.com
    lg: "1.125rem",     // 18px - from msqdx.com
    xl: "1.25rem",      // 20px - from msqdx.com
    "2xl": "1.5rem",    // 24px - from msqdx.com
    "3xl": "1.75rem",   // 28px - from msqdx.com
    "4xl": "2rem",      // 32px - from msqdx.com
    "5xl": "2.5rem",    // 40px - from msqdx.com
    "6xl": "3rem",      // 48px - from msqdx.com
    "7xl": "3.5rem",    // 56px - from msqdx.com
    "8xl": "4rem",      // 64px - from msqdx.com
    "9xl": "5rem",      // 80px - from msqdx.com
    "10xl": "6rem",     // 96px - from msqdx.com
    // Legacy aliases
    body2: "0.875rem",  // 14px
    body1: "1rem",      // 16px
    md: "1rem",         // 16px - from msqdx.com
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,       // --leading-normal from msqdx.com
    relaxed: 1.625,    // --leading-relaxed from msqdx.com
    loose: 1.8,
  },
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,        // --font-weight-light from msqdx.com
    regular: 400,      // --font-weight-normal from msqdx.com
    normal: 400,       // Alias
    medium: 500,       // --font-weight-medium from msqdx.com
    semibold: 600,     // --font-weight-semibold from msqdx.com
    bold: 700,         // --font-weight-bold from msqdx.com
    extrabold: 800,
    black: 900,
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",   // Used in Badge, Select, FormField
    widest: "0.12em",  // Used in Typography eyebrow variant
  },
  textTransform: {
    none: "none",
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
  },
};

