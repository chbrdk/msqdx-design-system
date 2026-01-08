# CSS Classes Reference

Complete reference for all `.msqdx-glass-*` CSS classes in the MSQDX Design System.

## Overview

The MSQDX Design System uses CSS classes with the prefix `.msqdx-glass-*` for styling atomic elements. These classes provide consistent styling across the design system and can be used directly in HTML or with CSS-in-JS solutions.

## Button Classes

### `.msqdx-glass-button`

Rounded pill buttons with glassmorphism support.

```html
<button class="msqdx-glass-button">Click me</button>
```

**Properties:**
- `border-radius: 999px` (pill shape)
- `text-transform: none`
- `font-weight: 600` (semibold)
- `padding: 8px 24px`
- `transition: all 0.2s ease-in-out`

## Chip Classes

### `.msqdx-glass-chip`

Status indicators and tags with glassmorphism styling.

```html
<span class="msqdx-glass-chip">Tag</span>
```

**Properties:**
- `border-radius: 8px`
- `font-weight: 500` (medium)
- `font-size: 0.75rem`
- `height: 24px`
- `transition: all 0.2s ease-in-out`

## Field Classes

### `.msqdx-glass-field`

Form inputs and labels with consistent styling.

```html
<div class="msqdx-glass-field">
  <label>Label</label>
  <input type="text" />
</div>
```

## List Classes

### `.msqdx-glass-list`

Lists with specific styling for consistent appearance.

```html
<ul class="msqdx-glass-list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

## Panel Classes

### `.msqdx-glass-panel`

Layout containers with glassmorphism background.

```html
<div class="msqdx-glass-panel">
  Content
</div>
```

**Properties:**
- `background: rgba(255, 255, 255, 0.1)` (light mode)
- `backdrop-filter: blur(12px)`
- `border: 1px solid rgba(0, 0, 0, 0.12)`
- `border-radius: 16px` (responsive)

## Usage Guidelines

### When to Use CSS Classes

- **Direct HTML/JSX**: When you need simple styling without React components
- **Legacy Code**: When migrating existing code
- **Performance**: When you need minimal JavaScript overhead

### When to Use React Components

- **New Development**: Always prefer React components (`MsqdxButton`, `MsqdxChip`, etc.)
- **Type Safety**: When you need TypeScript support
- **Props & Variants**: When you need component variants and props
- **Accessibility**: React components include built-in ARIA attributes

### Migration Path

```html
<!-- Old: CSS Class -->
<button class="msqdx-glass-button">Click</button>

<!-- New: React Component -->
<MsqdxButton variant="contained">Click</MsqdxButton>
```

## Dark Mode Support

All CSS classes automatically adapt to dark mode using the `[data-theme="dark"]` attribute:

```css
[data-theme="dark"] .msqdx-glass-panel {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.12);
}
```

## Customization

CSS classes can be customized using CSS variables:

```css
.msqdx-glass-button {
  --msqdx-button-padding: 12px 32px;
  --msqdx-button-radius: 999px;
}
```

## Best Practices

1. **Prefer Components**: Use React components (`MsqdxButton`, etc.) over CSS classes when possible
2. **Consistency**: Don't mix CSS classes with component styles
3. **Accessibility**: Ensure proper ARIA attributes when using CSS classes directly
4. **Responsive**: Use responsive helpers from design tokens for spacing

## Examples

### Button with CSS Class

```html
<button class="msqdx-glass-button" type="button">
  Submit
</button>
```

### Chip with CSS Class

```html
<span class="msqdx-glass-chip" role="status">
  Active
</span>
```

### Panel Layout

```html
<div class="msqdx-glass-panel">
  <h2>Panel Title</h2>
  <p>Panel content</p>
</div>
```

