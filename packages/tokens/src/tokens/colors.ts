/**
 * MSQDX Color Tokens
 * 
 * Brand colors, tints, status colors, and theme palettes.
 * Based on msqdx.com CSS variables
 */

// Primary Brand Colors (from msqdx.com)
// These are the main brand colors used on msqdx.com
export const MSQDX_BRAND_PRIMARY = {
  purple: "#b638ff",
  yellow: "#fef14d",
  pink: "#f256b6",
  pinkOnLight: "#d5108a", // Pink variant for light backgrounds
  orange: "#ff6a3b",
  green: "#00ca55",
} as const;

// Neutral Colors (from msqdx.com)
export const MSQDX_NEUTRAL = {
  neutral: "#f8f6f0", // Neutral background color
  greyLight: "#d4d2d2", // Light grey
  // Grayscale scale for reference
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
  950: "#0a0a0a",
} as const;

// Status Colors
export const MSQDX_STATUS = {
  success: {
    light: "#22c55e",
    base: "#16a34a",
    dark: "#15803d",
  },
  warning: {
    light: "#f97316",
    base: "#ea580c",
    dark: "#c2410c",
  },
  error: {
    light: "#f87171",
    base: "#ef4444",
    dark: "#dc2626",
  },
  info: {
    light: "#3b82f6",
    base: "#2563eb",
    dark: "#1d4ed8",
  },
} as const;

// Theme Palettes
export const MSQDX_THEME = {
  light: {
    background: {
      primary: "#ffffff",
      secondary: MSQDX_NEUTRAL.neutral, // #f8f6f0 from msqdx.com
      tertiary: "#f5f5f5",
    },
    surface: {
      primary: "#ffffff",
      secondary: "#fafafa",
      elevated: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      tertiary: "#64748b",
      disabled: "#94a3b8",
      inverse: "#ffffff",
    },
    border: {
      default: "rgba(0, 0, 0, 0.12)",
      strong: "rgba(0, 0, 0, 0.24)",
      subtle: "rgba(0, 0, 0, 0.06)",
    },
  },
  dark: {
    background: {
      primary: "#0f0f0f",
      secondary: "#1a1a1a",
      tertiary: "#262626",
    },
    surface: {
      primary: "#1a1a1a",
      secondary: "#262626",
      elevated: "#2a2a2a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
      tertiary: "#a3a3a3",
      disabled: "#525252",
      inverse: "#0f172a",
    },
    border: {
      default: "rgba(255, 255, 255, 0.12)",
      strong: "rgba(255, 255, 255, 0.24)",
      subtle: "rgba(255, 255, 255, 0.06)",
    },
  },
} as const;

// Tints (Used for glass backgrounds, tags, etc.) - from msqdx.com
export const MSQDX_TINTS = {
  purple: "rgba(182, 56, 255, 0.15)",
  yellow: "#f3f0c8", // yellow-tint from msqdx.com
  pink: "#f3d9e3", // pink-tint from msqdx.com
  orange: "#f8d5cb", // orange-tint from msqdx.com
  orangeOverlay20: "#ff6a3b33", // orange-overlay-20 from msqdx.com
  green: "#dff1e1", // green-tint from msqdx.com
  greyLight: "#d4d2d280", // grey-light-tint from msqdx.com
} as const;

// Legacy export for backward compatibility
export const MSQDX_COLORS = {
  // Brand Colors (legacy)
  brand: {
    purple: MSQDX_BRAND_PRIMARY.purple,
    yellow: MSQDX_BRAND_PRIMARY.yellow,
    pink: MSQDX_BRAND_PRIMARY.pink,
    orange: MSQDX_BRAND_PRIMARY.orange,
    green: MSQDX_BRAND_PRIMARY.green,
    white: "#ffffff",
    black: "#000000",
    pinkOnLight: MSQDX_BRAND_PRIMARY.pinkOnLight,
  },
  
  // Additional colors from msqdx.com
  greyLight: MSQDX_NEUTRAL.greyLight,
  
  // Tints
  tints: MSQDX_TINTS,

  // Status Colors (legacy)
  status: {
    success: MSQDX_STATUS.success.base,
    warning: MSQDX_STATUS.warning.base,
    error: MSQDX_STATUS.error.base,
    info: MSQDX_STATUS.info.base,
  },

  // Theme Palettes (legacy)
  dark: {
    background: MSQDX_THEME.dark.background.primary,
    paper: MSQDX_THEME.dark.surface.primary,
    border: MSQDX_THEME.dark.border.default,
    textPrimary: MSQDX_THEME.dark.text.primary,
    textSecondary: MSQDX_THEME.dark.text.secondary,
  },

  light: {
    background: MSQDX_NEUTRAL.neutral, // #f8f6f0 from msqdx.com
    paper: MSQDX_THEME.light.surface.primary,
    border: MSQDX_THEME.light.border.default,
    textPrimary: MSQDX_THEME.light.text.primary,
    textSecondary: MSQDX_THEME.light.text.secondary,
  },
} as const;
