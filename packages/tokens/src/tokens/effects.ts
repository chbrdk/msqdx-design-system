/**
 * MSQDX Effects Tokens
 * 
 * Glass effects, shadows, transitions, z-index, opacity, borders, and animations.
 */

export const MSQDX_EFFECTS = {
  glass: {
    blur: "12px",
    saturate: "150%",
  },
  
  // Shadow/Elevation Scale
  shadows: {
    none: "none",
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
    // Focus rings (used in FormField, Select, etc.)
    focusRing: {
      default: "0 0 0 4px rgba(0, 202, 85, 0.1)", // Green focus ring
      error: "0 0 0 4px rgba(239, 68, 68, 0.1)",   // Error focus ring
      success: "0 0 0 4px rgba(34, 197, 94, 0.1)",  // Success focus ring
    },
  },
  
  // Opacity Scale
  opacity: {
    transparent: 0,
    invisible: 0.05,  // Used in GlassCard
    subtle: 0.1,      // Used in focus rings, overlays
    light: 0.2,       // Used in borders, dividers
    medium: 0.3,     // Used in borders, hover states
    semi: 0.4,       // Used in borders, accents
    half: 0.5,       // Used in disabled states
    strong: 0.7,     // Used in text, icons
    heavy: 0.8,      // Used in badges, labels
    opaque: 1,
  },
  
  // Border Widths
  borderWidth: {
    none: 0,
    thin: 1,    // 1px - most common
    medium: 2,  // 2px - emphasis
    thick: 3,   // 3px - strong emphasis
    heavy: 4,   // 4px - very strong emphasis
  },
  
  // Easing Functions (softer curves)
  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.33, 0, 0.83, 1)",
    easeOut: "cubic-bezier(0.17, 0, 0.33, 1)",
    easeInOut: "cubic-bezier(0.33, 0, 0.67, 1)",
    spring: "cubic-bezier(0.34, 0.15, 0.2, 1)",
    bounce: "cubic-bezier(0.5, 0, 0.35, 1.2)",
  },
  
  // Duration Scale (verlangsamt für ruhigere Animationen)
  duration: {
    instant: "0ms",
    fast: "220ms",      // fast interactions
    standard: "300ms",  // standard transitions
    slow: "420ms",      // slow transitions
    slower: "550ms",    // spring / emphasis
    slowest: "700ms",   // very slow transitions
  },
  
  // Animation & Transitions (composed from duration + easing)
  transitions: {
    fast: "220ms cubic-bezier(0.17, 0, 0.33, 1)",
    standard: "300ms cubic-bezier(0.33, 0, 0.67, 1)",
    slow: "420ms cubic-bezier(0.33, 0, 0.67, 1)",
    spring: "550ms cubic-bezier(0.34, 0.15, 0.2, 1)",
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
  
  // Backdrop/Overlay
  backdrop: {
    blur: "8px",
    opacity: 0.5,
  },

  /**
   * Double Border / Outer Ring
   * Eine Rahmenfarbe, nach außen ausfadend: innere Border 100 %, äußere Border 40 % Deckkraft.
   * Gap-Farbe = Hintergrund (z. B. paper), damit der Abstand sichtbar wird.
   */
  doubleBorder: {
    /** Standard: eine Farbe, innen 100 %, außen 40 % */
    default:
      "0 0 0 1px rgba(0, 0, 0, 0.12), 0 0 0 5px rgba(255, 255, 255, 1), 0 0 0 6px rgba(0, 0, 0, 0.048)",
    /** Dunkler Kontrast */
    strong:
      "0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 0 5px rgba(255, 255, 255, 1), 0 0 0 6px rgba(0, 0, 0, 0.08)",
    /** Fokus: Rahmenfarbe Grün, außen 40 % */
    focus:
      "0 0 0 1px rgba(0, 202, 85, 0.5), 0 0 0 5px rgba(255, 255, 255, 1), 0 0 0 6px rgba(0, 202, 85, 0.2)",
    /** Enger Abstand (2px) */
    tight: {
      default:
        "0 0 0 1px rgba(0, 0, 0, 0.12), 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.048)",
      strong:
        "0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.08)",
      focus:
        "0 0 0 1px rgba(0, 202, 85, 0.5), 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 202, 85, 0.2)",
    },
    /** Weiter Abstand (6px) */
    wide: {
      default:
        "0 0 0 1px rgba(0, 0, 0, 0.12), 0 0 0 7px rgba(255, 255, 255, 1), 0 0 0 8px rgba(0, 0, 0, 0.048)",
      strong:
        "0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 0 7px rgba(255, 255, 255, 1), 0 0 0 8px rgba(0, 0, 0, 0.08)",
      focus:
        "0 0 0 1px rgba(0, 202, 85, 0.5), 0 0 0 7px rgba(255, 255, 255, 1), 0 0 0 8px rgba(0, 202, 85, 0.2)",
    },
    recipe: {
      innerWidth: 1,
      outerWidth: 1,
      gapTight: 2,
      gapDefault: 4,
      gapWide: 6,
      borderColor: "rgba(0, 0, 0, 0.12)",
      gapColor: "rgba(255, 255, 255, 1)",
      outerOpacity: 0.4,
    },
  },

  /**
   * Triple Border
   * Eine Rahmenfarbe, nach außen ausfadend: innen 100 %, mittlerer Ring 75 %, äußerer Ring 40 % Deckkraft.
   */
  tripleBorder: {
    /** Standard: eine Farbe, 100 % / 75 % / 40 % */
    default:
      "0 0 0 1px rgba(0, 0, 0, 0.12), 0 0 0 5px rgba(255, 255, 255, 1), 0 0 0 6px rgba(0, 0, 0, 0.09), 0 0 0 10px rgba(255, 255, 255, 1), 0 0 0 11px rgba(0, 0, 0, 0.048)",
    /** Dunkler Kontrast */
    strong:
      "0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 0 5px rgba(255, 255, 255, 1), 0 0 0 6px rgba(0, 0, 0, 0.15), 0 0 0 10px rgba(255, 255, 255, 1), 0 0 0 11px rgba(0, 0, 0, 0.08)",
    /** Fokus: Rahmenfarbe Grün, 100 % / 75 % / 40 % */
    focus:
      "0 0 0 1px rgba(0, 202, 85, 0.5), 0 0 0 5px rgba(255, 255, 255, 1), 0 0 0 6px rgba(0, 202, 85, 0.375), 0 0 0 10px rgba(255, 255, 255, 1), 0 0 0 11px rgba(0, 202, 85, 0.2)",
    /** Enger Abstand (2px) */
    tight: {
      default:
        "0 0 0 1px rgba(0, 0, 0, 0.12), 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.09), 0 0 0 6px rgba(255, 255, 255, 1), 0 0 0 7px rgba(0, 0, 0, 0.048)",
      strong:
        "0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.15), 0 0 0 6px rgba(255, 255, 255, 1), 0 0 0 7px rgba(0, 0, 0, 0.08)",
      focus:
        "0 0 0 1px rgba(0, 202, 85, 0.5), 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 202, 85, 0.375), 0 0 0 6px rgba(255, 255, 255, 1), 0 0 0 7px rgba(0, 202, 85, 0.2)",
    },
    /** Weiter Abstand (6px) */
    wide: {
      default:
        "0 0 0 1px rgba(0, 0, 0, 0.12), 0 0 0 7px rgba(255, 255, 255, 1), 0 0 0 8px rgba(0, 0, 0, 0.09), 0 0 0 14px rgba(255, 255, 255, 1), 0 0 0 15px rgba(0, 0, 0, 0.048)",
      strong:
        "0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 0 7px rgba(255, 255, 255, 1), 0 0 0 8px rgba(0, 0, 0, 0.15), 0 0 0 14px rgba(255, 255, 255, 1), 0 0 0 15px rgba(0, 0, 0, 0.08)",
      focus:
        "0 0 0 1px rgba(0, 202, 85, 0.5), 0 0 0 7px rgba(255, 255, 255, 1), 0 0 0 8px rgba(0, 202, 85, 0.375), 0 0 0 14px rgba(255, 255, 255, 1), 0 0 0 15px rgba(0, 202, 85, 0.2)",
    },
    recipe: {
      innerWidth: 1,
      middleWidth: 1,
      outerWidth: 1,
      gapTight: 2,
      gapDefault: 4,
      gapWide: 6,
      borderColor: "rgba(0, 0, 0, 0.12)",
      gapColor: "rgba(255, 255, 255, 1)",
      middleOpacity: 0.75,
      outerOpacity: 0.4,
    },
  },
};

