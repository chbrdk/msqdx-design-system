# Accessibility Guidelines

Accessibility guidelines and best practices for the MSQDX Design System.

## Overview

The MSQDX Design System is designed with accessibility in mind. All components follow WCAG 2.1 Level AA guidelines.

## Color Contrast

### Text Contrast Ratios

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text (18px+)**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Color Usage

Never rely solely on color to convey information:

```tsx
// ❌ Bad - Color only
<MsqdxChip color="error" label="Error" />

// ✅ Good - Color + Icon + Text
<MsqdxChip color="error" label="Error" icon={<ErrorIcon />} />
```

## Keyboard Navigation

### Tab Order

- All interactive elements must be keyboard accessible
- Tab order should follow visual flow
- Focus indicators must be visible

### Keyboard Shortcuts

- `Tab`: Move to next focusable element
- `Shift+Tab`: Move to previous focusable element
- `Enter` / `Space`: Activate button or link
- `Escape`: Close modal or dismiss notification

## ARIA Patterns

### Buttons

```tsx
<MsqdxButton 
  variant="contained"
  aria-label="Submit form"
  aria-busy={loading}
>
  {loading ? 'Loading...' : 'Submit'}
</MsqdxButton>
```

### Form Fields

```tsx
<div>
  <label htmlFor="email">Email</label>
  <input 
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <div id="email-error" role="alert">
      Invalid email address
    </div>
  )}
</div>
```

### Status Indicators

```tsx
<MsqdxChip 
  variant="filled" 
  color="success"
  label="Active"
  role="status"
  aria-live="polite"
/>
```

## Screen Reader Support

### Semantic HTML

Always use semantic HTML elements:

```tsx
// ✅ Good
<MsqdxTypography variant="h1">Heading</MsqdxTypography>
<button>Action</button>
<nav>Navigation</nav>

// ❌ Bad
<div style={{ fontSize: '2rem' }}>Heading</div>
<div onClick={handleClick}>Action</div>
```

### ARIA Labels

Provide descriptive labels for icon-only buttons:

```tsx
<MsqdxButton 
  variant="text"
  startIcon={<CloseIcon />}
  aria-label="Close dialog"
/>
```

## Focus Management

### Focus Indicators

All interactive elements have visible focus indicators:

```css
/* Focus styles are included in components */
button:focus-visible {
  outline: 2px solid var(--msqdx-color-primary);
  outline-offset: 2px;
}
```

### Focus Trapping

Modals and dialogs should trap focus:

```tsx
// Use MUI's Modal component which handles focus trapping
<Modal open={open} onClose={handleClose}>
  {/* Content */}
</Modal>
```

## Best Practices

1. **Always provide labels**: Every form field needs a label
2. **Use semantic HTML**: Prefer semantic elements over divs
3. **Test with keyboard**: Navigate your UI using only keyboard
4. **Test with screen readers**: Use NVDA, JAWS, or VoiceOver
5. **Check color contrast**: Use tools like WebAIM Contrast Checker
6. **Provide alternatives**: Don't rely on color alone

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

