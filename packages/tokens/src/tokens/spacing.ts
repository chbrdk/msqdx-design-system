/**
 * MSQDX Spacing Tokens
 * 
 * Border radius and spacing scale for consistent layout.
 */

export const MSQDX_SPACING = {
  // Border radius values (from msqdx.com)
  // Ordered from smallest to largest
  borderRadius: {
    none: 0,
    xxs: 2,    // 2px - very small radius
    xs: 4,     // 4px - small radius
    badge: 6,  // 6px - for badges
    sm: 8,     // 8px - from msqdx.com --radius-sm (also used for chips)
    "3xl": 24, // 24px (1.5rem) - from msqdx.com --radius-3xl
    md: 20,    // 20px - from msqdx.com --radius-md
    button: 32, // 32px - button radius from msqdx.com --radius-button
    lg: 40,    // 40px - from msqdx.com --radius-lg
    "1.5xl": 56, // 56px - zwischen button und 2xl
    "2xl": 80, // 80px - from msqdx.com --radius-2xl
    full: 999, // 999px - Full circle/pill shape
    circle: "50%", // Perfect circle (for avatars, icons, etc.)
    // Special border radius for tab indicators
    tabIndicator: "3px 3px 0 0", // Top corners only for tab indicators
    // Legacy aliases (deprecated, use main values)
    chip: 8,   // Alias for sm
    xl: 32,    // Alias for button
    xxl: 40,   // Alias for lg
    xxxl: 80,  // Alias for 2xl
  },
  
  // Unified spacing scale for padding and margins
  scale: {
    none: 0,
    xxs: 4,   // 0.25rem - very tight spacing
    xs: 8,    // 0.5rem - tight spacing
    sm: 12,   // 0.75rem - compact spacing
    md: 16,   // 1rem - default spacing
    lg: 18,   // 1.125rem - default gap (most common)
    xl: 24,   // 1.5rem - relaxed spacing
    xxl: 32,  // 2rem - loose spacing
    xxxl: 48, // 3rem - very loose spacing
    huge: 64, // 4rem - huge spacing
  },
  
  // Specific padding values
  padding: {
    none: 0,
    xxs: 4,   // 0.25rem
    xs: 8,    // 0.5rem
    sm: 12,   // 0.75rem - default card padding
    md: 16,   // 1rem
    lg: 18,   // 1.125rem - default padding
    xl: 24,   // 1.5rem
    xxl: 32,  // 2rem
    xxxl: 48, // 3rem
  },
  
  // Specific margin values
  margin: {
    none: 0,
    xxs: 4,   // 0.25rem
    xs: 8,    // 0.5rem
    sm: 12,   // 0.75rem
    md: 16,   // 1rem
    lg: 18,   // 1.125rem - default margin
    xl: 24,   // 1.5rem
    xxl: 32,  // 2rem
    xxxl: 48, // 3rem
  },
  
  // Gap values (for flex/grid gaps)
  gap: {
    none: 0,
    xxs: 4,   // 0.25rem - very tight gap
    xs: 8,    // 0.5rem - tight gap
    sm: 12,   // 0.75rem - compact gap
    md: 16,   // 1rem - default gap
    lg: 18,   // 1.125rem - default gap (most common)
    xl: 24,   // 1.5rem - relaxed gap
    xxl: 32,  // 2rem - loose gap
    xxxl: 48, // 3rem - very loose gap
  },
};

/**
 * Responsive Scaling Helpers
 * Use these to ensure consistency across mobile and desktop.
 */
export const MSQDX_RESPONSIVE = {
  // Container border radius: Mobile (MD) -> Tablet (LG) -> Desktop (Button)
  cardRadius: {
    xs: MSQDX_SPACING.borderRadius.md,   // 20px
    sm: MSQDX_SPACING.borderRadius.lg,   // 40px
    md: MSQDX_SPACING.borderRadius.button, // 32px
  },
  
  // Section padding: Mobile (LG) -> Desktop (XXL)
  sectionPadding: {
    xs: MSQDX_SPACING.scale.lg,   // 24px
    md: MSQDX_SPACING.scale.xxl,  // 48px
  },

  // MUI Grid/Stack spacing units (for direct use in MUI components)
  // These map to MUI's spacing system (1 unit = 8px)
  muiSpacing: {
    xs: 2,    // 16px
    md: 3,    // 24px
  },

  // Outer shell scaling
  outerShell: {
    radius: MSQDX_SPACING.borderRadius.lg, // 40px
    border: {
      xs: 8,
      md: 10,
    }
  },

  // Typography scaling factor (not used directly in CSS, but for reference)
  fontScale: {
    xs: 1,
    md: 1.1,
  }
};

