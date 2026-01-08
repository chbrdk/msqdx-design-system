# Migration Guide: ECHON_* to MSQDX_*

This guide helps you migrate from the old `ECHON_*` token naming to the new `MSQDX_*` naming convention.

## Overview

All design tokens have been renamed from `ECHON_*` to `MSQDX_*` to reflect the unified design system across all MSQDX projects.

## Token Renaming

### Colors

```typescript
// Before
import { ECHON_COLORS } from '@/lib/design-tokens';
const color = ECHON_COLORS.brand.green;

// After
import { MSQDX_COLORS } from '@/lib/design-tokens';
const color = MSQDX_COLORS.brand.green;
```

### Spacing

```typescript
// Before
import { ECHON_SPACING } from '@/lib/design-tokens';
const radius = ECHON_SPACING.borderRadius.md;

// After
import { MSQDX_SPACING } from '@/lib/design-tokens';
const radius = MSQDX_SPACING.borderRadius.md;
```

### Typography

```typescript
// Before
import { ECHON_TYPOGRAPHY } from '@/lib/design-tokens';
const fontSize = ECHON_TYPOGRAPHY.fontSize.base;

// After
import { MSQDX_TYPOGRAPHY } from '@/lib/design-tokens';
const fontSize = MSQDX_TYPOGRAPHY.fontSize.base;
```

### Effects

```typescript
// Before
import { ECHON_EFFECTS } from '@/lib/design-tokens';
const blur = ECHON_EFFECTS.glass.blur;

// After
import { MSQDX_EFFECTS } from '@/lib/design-tokens';
const blur = MSQDX_EFFECTS.glass.blur;
```

### Icons

```typescript
// Before
import { ECHON_ICONS } from '@/lib/design-tokens';
const size = ECHON_ICONS.sizes.lg;

// After
import { MSQDX_ICONS } from '@/lib/design-tokens';
const size = MSQDX_ICONS.sizes.lg;
```

### Breakpoints

```typescript
// Before
import { ECHON_BREAKPOINTS, ECHON_BREAKPOINT_LABELS } from '@/lib/design-tokens';
const mobile = ECHON_BREAKPOINTS.xs;

// After
import { MSQDX_BREAKPOINTS, MSQDX_BREAKPOINT_LABELS } from '@/lib/design-tokens';
const mobile = MSQDX_BREAKPOINTS.xs;
```

### Responsive

```typescript
// Before
import { ECHON_RESPONSIVE } from '@/lib/design-tokens';
const padding = ECHON_RESPONSIVE.sectionPadding.xs;

// After
import { MSQDX_RESPONSIVE } from '@/lib/design-tokens';
const padding = MSQDX_RESPONSIVE.sectionPadding.xs;
```

## Automated Migration

### Using Find & Replace

You can use find and replace in your IDE or a script to automate the migration:

**Find:**
- `ECHON_COLORS` → `MSQDX_COLORS`
- `ECHON_SPACING` → `MSQDX_SPACING`
- `ECHON_TYPOGRAPHY` → `MSQDX_TYPOGRAPHY`
- `ECHON_EFFECTS` → `MSQDX_EFFECTS`
- `ECHON_ICONS` → `MSQDX_ICONS`
- `ECHON_BREAKPOINTS` → `MSQDX_BREAKPOINTS`
- `ECHON_BREAKPOINT_LABELS` → `MSQDX_BREAKPOINT_LABELS`
- `ECHON_RESPONSIVE` → `MSQDX_RESPONSIVE`

### Using sed (Unix/Mac)

```bash
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's/ECHON_COLORS/MSQDX_COLORS/g; \
   s/ECHON_SPACING/MSQDX_SPACING/g; \
   s/ECHON_TYPOGRAPHY/MSQDX_TYPOGRAPHY/g; \
   s/ECHON_EFFECTS/MSQDX_EFFECTS/g; \
   s/ECHON_ICONS/MSQDX_ICONS/g; \
   s/ECHON_BREAKPOINTS/MSQDX_BREAKPOINTS/g; \
   s/ECHON_BREAKPOINT_LABELS/MSQDX_BREAKPOINT_LABELS/g; \
   s/ECHON_RESPONSIVE/MSQDX_RESPONSIVE/g' {} +
```

## Breaking Changes

### None

This is a pure renaming migration. All token values, structures, and APIs remain exactly the same. Only the constant names have changed.

## Verification

After migration, verify that:

1. ✅ All imports use `MSQDX_*` instead of `ECHON_*`
2. ✅ No references to `ECHON_*` remain in your codebase
3. ✅ TypeScript compilation succeeds
4. ✅ No runtime errors occur
5. ✅ Visual appearance remains unchanged

## Rollback

If you need to rollback, simply reverse the find & replace operations:

**Find:**
- `MSQDX_COLORS` → `ECHON_COLORS`
- `MSQDX_SPACING` → `ECHON_SPACING`
- etc.

## Support

If you encounter any issues during migration, please check:

1. The [Design Tokens Documentation](./design-tokens.md) for correct usage
2. The [Usage Guide](./usage-guide.md) for examples
3. Your project's TypeScript configuration

