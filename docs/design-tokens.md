# MSQDX Design Tokens

Complete reference for all design tokens in the MSQDX Design System.

## Colors

### Brand Colors

```typescript
import { MSQDX_COLORS } from '@msqdx/design-system';

MSQDX_COLORS.brand.purple   // #b638ff - Primary Accent
MSQDX_COLORS.brand.yellow   // #fef14d
MSQDX_COLORS.brand.pink     // #f256b6
MSQDX_COLORS.brand.orange   // #ff6a3b
MSQDX_COLORS.brand.blue     // #3b82f6
MSQDX_COLORS.brand.green    // #00ca55
MSQDX_COLORS.brand.white    // #ffffff
MSQDX_COLORS.brand.black    // #000000
```

### Tints

Tints are used for glass backgrounds, tags, and subtle color applications:

```typescript
MSQDX_COLORS.tints.purple   // rgba(182, 56, 255, 0.15)
MSQDX_COLORS.tints.yellow   // rgba(254, 241, 77, 0.15)
MSQDX_COLORS.tints.pink     // rgba(242, 86, 182, 0.15)
MSQDX_COLORS.tints.orange   // rgba(255, 106, 59, 0.15)
MSQDX_COLORS.tints.blue     // rgba(59, 130, 246, 0.15)
MSQDX_COLORS.tints.green    // rgba(0, 202, 85, 0.15)
```

### Status Colors

```typescript
MSQDX_COLORS.status.success // #22c55e
MSQDX_COLORS.status.warning // #f97316
MSQDX_COLORS.status.error   // #f87171
MSQDX_COLORS.status.info    // #3b82f6
```

### Theme Palettes

#### Light Mode

```typescript
MSQDX_COLORS.light.background    // #f8f6f0
MSQDX_COLORS.light.paper         // #ffffff
MSQDX_COLORS.light.border        // rgba(0, 0, 0, 0.12)
MSQDX_COLORS.light.textPrimary   // #0f172a
MSQDX_COLORS.light.textSecondary // #475569
```

#### Dark Mode

```typescript
MSQDX_COLORS.dark.background    // #0f0f0f
MSQDX_COLORS.dark.paper         // #1a1a1a
MSQDX_COLORS.dark.border        // rgba(255, 255, 255, 0.12)
MSQDX_COLORS.dark.textPrimary   // #ffffff
MSQDX_COLORS.dark.textSecondary // #cccccc
```

## Spacing

### Border Radius

```typescript
import { MSQDX_SPACING } from '@msqdx/design-system';

MSQDX_SPACING.borderRadius.none  // 0
MSQDX_SPACING.borderRadius.xs    // 4px
MSQDX_SPACING.borderRadius.sm    // 8px
MSQDX_SPACING.borderRadius.md    // 16px
MSQDX_SPACING.borderRadius.lg    // 24px
MSQDX_SPACING.borderRadius.xl    // 32px
MSQDX_SPACING.borderRadius.xxl   // 40px
MSQDX_SPACING.borderRadius.full  // 999px (pill shape)
```

### Spacing Scale

```typescript
MSQDX_SPACING.scale.none  // 0
MSQDX_SPACING.scale.xxs   // 4px (0.25rem)
MSQDX_SPACING.scale.xs    // 8px (0.5rem)
MSQDX_SPACING.scale.sm    // 12px (0.75rem)
MSQDX_SPACING.scale.md    // 16px (1rem)
MSQDX_SPACING.scale.lg    // 24px (1.5rem)
MSQDX_SPACING.scale.xl    // 32px (2rem)
MSQDX_SPACING.scale.xxl   // 48px (3rem)
MSQDX_SPACING.scale.xxxl  // 64px (4rem)
```

### Responsive Helpers

```typescript
import { MSQDX_RESPONSIVE } from '@msqdx/design-system';

// Card border radius (responsive)
MSQDX_RESPONSIVE.cardRadius.xs  // 16px (mobile)
MSQDX_RESPONSIVE.cardRadius.sm  // 24px (tablet)
MSQDX_RESPONSIVE.cardRadius.md  // 32px (desktop)

// Section padding (responsive)
MSQDX_RESPONSIVE.sectionPadding.xs  // 24px (mobile)
MSQDX_RESPONSIVE.sectionPadding.md  // 48px (desktop)

// Component gap (for MUI Grid/Stack)
MSQDX_RESPONSIVE.gap.xs  // 2 (16px on mobile)
MSQDX_RESPONSIVE.gap.md  // 3 (24px on desktop)
```

## Typography

### Font Families

```typescript
import { MSQDX_TYPOGRAPHY } from '@msqdx/design-system';

MSQDX_TYPOGRAPHY.fontFamily.primary  // "Noto Sans JP", sans-serif
MSQDX_TYPOGRAPHY.fontFamily.mono     // "JetBrains Mono", monospace
```

### Font Sizes

```typescript
MSQDX_TYPOGRAPHY.fontSize.xs     // 0.625rem (10px)
MSQDX_TYPOGRAPHY.fontSize.sm     // 0.75rem (12px)
MSQDX_TYPOGRAPHY.fontSize.body2   // 0.8125rem (13px)
MSQDX_TYPOGRAPHY.fontSize.body1   // 0.875rem (14px)
MSQDX_TYPOGRAPHY.fontSize.base    // 1rem (16px)
MSQDX_TYPOGRAPHY.fontSize.lg      // 1.125rem (18px)
MSQDX_TYPOGRAPHY.fontSize.xl      // 1.25rem (20px)
MSQDX_TYPOGRAPHY.fontSize["2xl"]  // 1.5rem (24px)
MSQDX_TYPOGRAPHY.fontSize["3xl"]  // 2rem (32px)
MSQDX_TYPOGRAPHY.fontSize["4xl"]  // 2.5rem (40px)
```

### Line Heights

```typescript
MSQDX_TYPOGRAPHY.lineHeight.tight    // 1.2
MSQDX_TYPOGRAPHY.lineHeight.normal  // 1.4
MSQDX_TYPOGRAPHY.lineHeight.relaxed // 1.6
MSQDX_TYPOGRAPHY.lineHeight.loose   // 1.8
```

### Font Weights

```typescript
MSQDX_TYPOGRAPHY.fontWeight.thin       // 100
MSQDX_TYPOGRAPHY.fontWeight.extralight // 200
MSQDX_TYPOGRAPHY.fontWeight.light      // 300
MSQDX_TYPOGRAPHY.fontWeight.regular   // 400
MSQDX_TYPOGRAPHY.fontWeight.medium     // 500
MSQDX_TYPOGRAPHY.fontWeight.semibold   // 600
MSQDX_TYPOGRAPHY.fontWeight.bold       // 700
MSQDX_TYPOGRAPHY.fontWeight.extrabold  // 800
MSQDX_TYPOGRAPHY.fontWeight.black      // 900
```

## Effects

### Glass Effects

```typescript
import { MSQDX_EFFECTS } from '@msqdx/design-system';

MSQDX_EFFECTS.glass.blur      // "12px"
MSQDX_EFFECTS.glass.saturate  // "150%"
```

### Transitions

```typescript
MSQDX_EFFECTS.transitions.fast     // "0.15s ease-out"
MSQDX_EFFECTS.transitions.standard // "0.2s ease-in-out"
MSQDX_EFFECTS.transitions.slow     // "0.3s cubic-bezier(0.4, 0, 0.2, 1)"
MSQDX_EFFECTS.transitions.spring   // "0.4s cubic-bezier(0.4, 0, 0.2, 1)"
```

### Z-Index Scale

```typescript
MSQDX_EFFECTS.zIndex.base          // 0
MSQDX_EFFECTS.zIndex.dropdown      // 1000
MSQDX_EFFECTS.zIndex.sticky        // 1100
MSQDX_EFFECTS.zIndex.fixed         // 1200
MSQDX_EFFECTS.zIndex.modalBackdrop // 1300
MSQDX_EFFECTS.zIndex.modal         // 1400
MSQDX_EFFECTS.zIndex.popover       // 1500
MSQDX_EFFECTS.zIndex.tooltip       // 1600
```

## Breakpoints

### Breakpoint Values

```typescript
import { MSQDX_BREAKPOINTS } from '@msqdx/design-system';

MSQDX_BREAKPOINTS.xs  // 0px (Extra small devices - phones)
MSQDX_BREAKPOINTS.sm  // 600px (Small devices - tablets, portrait)
MSQDX_BREAKPOINTS.md  // 900px (Medium devices - tablets, landscape)
MSQDX_BREAKPOINTS.lg  // 1200px (Large devices - desktops)
MSQDX_BREAKPOINTS.xl  // 1536px (Extra large devices - large desktops)
```

### Breakpoint Labels

```typescript
import { MSQDX_BREAKPOINT_LABELS } from '@msqdx/design-system';

MSQDX_BREAKPOINT_LABELS.xs  // "Mobile (0px+)"
MSQDX_BREAKPOINT_LABELS.sm  // "Tablet Portrait (600px+)"
MSQDX_BREAKPOINT_LABELS.md  // "Tablet Landscape (900px+)"
MSQDX_BREAKPOINT_LABELS.lg  // "Desktop (1200px+)"
MSQDX_BREAKPOINT_LABELS.xl  // "Large Desktop (1536px+)"
```

## Icons

### Icon Sizes

```typescript
import { MSQDX_ICONS } from '@msqdx/design-system';

MSQDX_ICONS.sizes.xs   // 12px
MSQDX_ICONS.sizes.sm   // 16px
MSQDX_ICONS.sizes.md   // 20px
MSQDX_ICONS.sizes.lg   // 24px
MSQDX_ICONS.sizes.xl   // 32px
MSQDX_ICONS.sizes.xxl  // 48px
```

### Icon Weights

```typescript
MSQDX_ICONS.weights.light     // 200
MSQDX_ICONS.weights.thin      // 300
MSQDX_ICONS.weights.regular   // 400
MSQDX_ICONS.weights.medium    // 500
MSQDX_ICONS.weights.semibold  // 600
MSQDX_ICONS.weights.bold      // 700
```

## Usage Examples

### Using Colors in Components

```tsx
import { MSQDX_COLORS } from '@msqdx/design-system';

const MyComponent = () => (
  <div style={{ 
    backgroundColor: MSQDX_COLORS.brand.green,
    color: MSQDX_COLORS.light.textPrimary 
  }}>
    Content
  </div>
);
```

### Using Spacing in Styled Components

```tsx
import { styled } from '@mui/material';
import { MSQDX_SPACING } from '@msqdx/design-system';

const StyledCard = styled('div')({
  borderRadius: MSQDX_SPACING.borderRadius.md,
  padding: MSQDX_SPACING.scale.lg,
});
```

### Using Typography Tokens

```tsx
import { MSQDX_TYPOGRAPHY } from '@msqdx/design-system';

const StyledText = styled('p')({
  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary,
  fontSize: MSQDX_TYPOGRAPHY.fontSize.base,
  fontWeight: MSQDX_TYPOGRAPHY.fontWeight.medium,
  lineHeight: MSQDX_TYPOGRAPHY.lineHeight.normal,
});
```

