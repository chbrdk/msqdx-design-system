# Button Component Documentation

## Overview

The `MsqdxButton` component is a comprehensive, fully tokenized button implementation for the MSQDX Glass Design System. It provides extensive customization options while maintaining consistency through design tokens.

## Features

- ✅ **Multiple Variants**: contained, outlined, text, glass
- ✅ **All Brand Colors**: purple, yellow, pink, orange, green
- ✅ **Three Sizes**: small, medium, large
- ✅ **Loading State**: Integrated spinner
- ✅ **Disabled State**: Proper opacity and styling
- ✅ **Icon Support**: Start and end icons
- ✅ **Typography**: Uses IBM Plex Mono (secondary font)
- ✅ **Fully Tokenized**: All values from design tokens
- ✅ **Border Radius Options**: default (pill), square, rounded

## Design Tokens

All button styles are defined in `src/tokens/button.ts`:

### Sizes
- **Small**: 32px height, 14px font, 16px icon
- **Medium**: 40px height, 16px font, 20px icon (default)
- **Large**: 48px height, 18px font, 24px icon

### Border Radius
- **default**: 999px (pill shape)
- **square**: 32px (rounded square)
- **rounded**: 40px (rounded)

### Typography
- **Font Family**: IBM Plex Mono (secondary font)
- **Font Weight**: 600 (semibold)

### Transitions
- **Default**: 0.2s ease-in-out
- **Fast**: 0.15s ease-out

## Usage

### Basic Usage

```tsx
import { MsqdxButton } from '@msqdx/design-system';

// Basic button
<MsqdxButton variant="contained" brandColor="green">
  Click me
</MsqdxButton>
```

### Variants

```tsx
// Contained (filled background)
<MsqdxButton variant="contained" brandColor="purple">
  Contained
</MsqdxButton>

// Outlined (border only)
<MsqdxButton variant="outlined" brandColor="orange">
  Outlined
</MsqdxButton>

// Text (no background, no border)
<MsqdxButton variant="text" brandColor="pink">
  Text
</MsqdxButton>

// Glass (glassmorphism effect)
<MsqdxButton glass brandColor="green">
  Glass
</MsqdxButton>
```

### Brand Colors

All MSQDX brand colors are available:

```tsx
<MsqdxButton variant="contained" brandColor="purple">Purple</MsqdxButton>
<MsqdxButton variant="contained" brandColor="yellow">Yellow</MsqdxButton>
<MsqdxButton variant="contained" brandColor="pink">Pink</MsqdxButton>
<MsqdxButton variant="contained" brandColor="orange">Orange</MsqdxButton>
<MsqdxButton variant="contained" brandColor="green">Green</MsqdxButton>
```

### Sizes

```tsx
<MsqdxButton size="small" brandColor="green">Small</MsqdxButton>
<MsqdxButton size="medium" brandColor="green">Medium</MsqdxButton>
<MsqdxButton size="large" brandColor="green">Large</MsqdxButton>
```

### With Icons

```tsx
import { MsqdxIcon } from '../Icon/MsqdxIcon';

<MsqdxButton 
  variant="contained" 
  brandColor="green" 
  startIcon={<MsqdxIcon name="Add" />}
>
  Add Item
</MsqdxButton>

<MsqdxButton 
  variant="outlined" 
  brandColor="purple" 
  endIcon={<MsqdxIcon name="ArrowForward" />}
>
  Continue
</MsqdxButton>
```

### Loading State

```tsx
<MsqdxButton 
  variant="contained" 
  brandColor="green" 
  loading
>
  Loading...
</MsqdxButton>
```

### Disabled State

```tsx
<MsqdxButton 
  variant="contained" 
  brandColor="green" 
  disabled
>
  Disabled
</MsqdxButton>
```

### Border Radius Variants

```tsx
<MsqdxButton borderRadius="default" brandColor="green">Pill</MsqdxButton>
<MsqdxButton borderRadius="square" brandColor="green">Square</MsqdxButton>
<MsqdxButton borderRadius="rounded" brandColor="green">Rounded</MsqdxButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'contained' \| 'outlined' \| 'text' \| 'glass'` | `'contained'` | Button variant style |
| `brandColor` | `'purple' \| 'yellow' \| 'pink' \| 'orange' \| 'green'` | - | MSQDX brand color |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `borderRadius` | `'default' \| 'square' \| 'rounded'` | `'default'` | Border radius variant |
| `glass` | `boolean` | `false` | Enable glassmorphism effect |
| `loading` | `boolean` | `false` | Show loading state |
| `disabled` | `boolean` | `false` | Disable the button |
| `startIcon` | `ReactNode` | - | Icon before text |
| `endIcon` | `ReactNode` | - | Icon after text |
| `children` | `ReactNode` | - | Button content |

## CSS Variables

All button tokens are also available as CSS variables:

```css
/* Typography */
--msqdx-button-font-family: "IBM Plex Mono", ...;
--msqdx-button-font-weight: 600;

/* Sizes - Small */
--msqdx-button-size-small-height: 32px;
--msqdx-button-size-small-padding-horizontal: 16px;
--msqdx-button-size-small-padding-vertical: 8px;
--msqdx-button-size-small-font-size: 0.875rem;
--msqdx-button-size-small-icon-size: 16px;
--msqdx-button-size-small-gap: 8px;

/* Sizes - Medium */
--msqdx-button-size-medium-height: 40px;
--msqdx-button-size-medium-padding-horizontal: 24px;
--msqdx-button-size-medium-padding-vertical: 8px;
--msqdx-button-size-medium-font-size: 1rem;
--msqdx-button-size-medium-icon-size: 20px;
--msqdx-button-size-medium-gap: 12px;

/* Sizes - Large */
--msqdx-button-size-large-height: 48px;
--msqdx-button-size-large-padding-horizontal: 32px;
--msqdx-button-size-large-padding-vertical: 12px;
--msqdx-button-size-large-font-size: 1.125rem;
--msqdx-button-size-large-icon-size: 24px;
--msqdx-button-size-large-gap: 16px;

/* Border Radius */
--msqdx-button-radius-default: 999px;
--msqdx-button-radius-square: 32px;
--msqdx-button-radius-rounded: 40px;

/* Transitions */
--msqdx-button-transition-default: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
--msqdx-button-transition-fast: 0.15s cubic-bezier(0, 0, 0.2, 1);

/* Shadows */
--msqdx-button-shadow-default: none;
--msqdx-button-shadow-hover: 0 1px 3px 0 rgba(0, 0, 0, 0.1), ...;
--msqdx-button-shadow-focus: 0 0 0 4px rgba(0, 202, 85, 0.1);

/* Opacity */
--msqdx-button-opacity-disabled: 0.4;
--msqdx-button-opacity-hover: 0.8;
```

## Design Principles

1. **Token-First**: All values come from design tokens
2. **Consistency**: Uses IBM Plex Mono for all buttons
3. **Accessibility**: Proper focus states, disabled states, and contrast
4. **Flexibility**: Supports all brand colors and variants
5. **Performance**: Optimized transitions and rendering

## Examples

See the Storybook documentation for comprehensive examples:
- All brand colors
- All variants
- All sizes
- With icons
- Loading and disabled states
- Complete showcase

## Related Tokens

- `MSQDX_BUTTON` - Button-specific tokens
- `MSQDX_BRAND_PRIMARY` - Brand colors
- `MSQDX_SPACING` - Spacing and border radius
- `MSQDX_TYPOGRAPHY` - Typography tokens
- `MSQDX_EFFECTS` - Effects (shadows, transitions, opacity)
