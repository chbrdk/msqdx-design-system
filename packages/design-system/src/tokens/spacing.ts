/**
 * MSQDX Spacing Tokens
 * 
 * Border radius and spacing scale for consistent layout.
 */

export const MSQDX_SPACING = {
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40, // Match the outer shell corner
    full: 999,
  },
  // Unified spacing scale for padding and margins
  scale: {
    none: 0,
    xxs: 4,   // 0.25rem
    xs: 8,    // 0.5rem
    sm: 12,   // 0.75rem
    md: 16,   // 1rem
    lg: 24,   // 1.5rem
    xl: 32,   // 2rem
    xxl: 48,  // 3rem
    xxxl: 64, // 4rem
  }
};

/**
 * Responsive Scaling Helpers
 * Use these to ensure consistency across mobile and desktop.
 */
export const MSQDX_RESPONSIVE = {
  // Container border radius: Mobile (MD) -> Tablet (LG) -> Desktop (XL)
  cardRadius: {
    xs: MSQDX_SPACING.borderRadius.md,   // 16px
    sm: MSQDX_SPACING.borderRadius.lg,   // 24px
    md: MSQDX_SPACING.borderRadius.xl,   // 32px
  },
  
  // Section padding: Mobile (LG) -> Desktop (XXL)
  sectionPadding: {
    xs: MSQDX_SPACING.scale.lg,   // 24px
    md: MSQDX_SPACING.scale.xxl,  // 48px
  },

  // Component spacing (gap): Mobile (2 = 16px) -> Desktop (3 = 24px)
  // Use these directly in MUI Grid/Stack spacing props
  gap: {
    xs: 2,
    md: 3,
  },

  // Outer shell scaling
  outerShell: {
    radius: MSQDX_SPACING.borderRadius.xxl, // 40px
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

