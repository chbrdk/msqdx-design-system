# Components Reference

Complete reference for all components in the MSQDX Design System.

## Atoms

### MsqdxButton

Standard button component with pill shape, glassmorphism support, and integrated loading state.

**Props:**
- `variant`: `"contained" | "outlined" | "text"` (default: `"contained"`)
- `color`: `"primary" | "secondary" | "error" | "warning" | "info" | "success"` (default: `"primary"`)
- `size`: `"small" | "medium" | "large"` (default: `"medium"`)
- `loading`: `boolean` (default: `false`) - Shows loading spinner
- `glass`: `boolean` (default: `false`) - Applies glassmorphism effect
- `disabled`: `boolean` (default: `false`)
- `fullWidth`: `boolean` (default: `false`)
- `startIcon`: `ReactNode` (optional)
- `endIcon`: `ReactNode` (optional)

**Examples:**
```tsx
<MsqdxButton variant="contained" color="primary">
  Click me
</MsqdxButton>

<MsqdxButton variant="outlined" glass>
  Glass Button
</MsqdxButton>

<MsqdxButton variant="contained" loading>
  Loading...
</MsqdxButton>
```

### MsqdxTypography

Central typography component with built-in branding and special variants.

**Props:**
- `variant`: `"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "overline"` (default: `"body1"`)
- `weight`: `"thin" | "extralight" | "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold" | "black" | number` (optional)
- `eyebrow`: `boolean` (default: `false`) - Uppercase label style
- `color`: `string` (optional)
- `align`: `"left" | "center" | "right" | "justify"` (optional)

**Examples:**
```tsx
<MsqdxTypography variant="h1" weight="extrabold">
  Main Heading
</MsqdxTypography>

<MsqdxTypography variant="body1" weight="regular">
  Body text
</MsqdxTypography>

<MsqdxTypography variant="caption" eyebrow>
  Label
</MsqdxTypography>
```

### MsqdxChip

Versatile chip component for categories, tags, and status indicators.

**Props:**
- `variant`: `"glass" | "filled" | "outlined"` (default: `"glass"`)
- `color`: `"primary" | "secondary" | "default"` (default: `"primary"`)
- `glow`: `boolean` (default: `false`) - Adds glow effect
- `label`: `string` (required)
- `icon`: `ReactNode` (optional)
- `onDelete`: `function` (optional) - Shows delete icon when provided

**Examples:**
```tsx
<MsqdxChip variant="glass" color="primary" label="Tag" />

<MsqdxChip variant="filled" color="primary" label="Status" />

<MsqdxChip variant="outlined" label="Removable" onDelete={() => {}} />
```

## More Components

Additional components are available in the package. See the [Usage Guide](./usage-guide.md) for more examples.

## Component Patterns

### Form Field Pattern

```tsx
<div>
  <MsqdxTypography variant="caption" eyebrow>
    Label
  </MsqdxTypography>
  <MsqdxFormField />
  <MsqdxTypography variant="caption" color="error">
    Error message
  </MsqdxTypography>
</div>
```

### Button Actions Pattern

```tsx
<Stack direction="row" spacing={2} justifyContent="flex-end">
  <MsqdxButton variant="outlined">Cancel</MsqdxButton>
  <MsqdxButton variant="contained" color="primary">Save</MsqdxButton>
</Stack>
```

## TypeScript Support

All components are fully typed:

```tsx
import type { MsqdxButtonProps, MsqdxTypographyProps, MsqdxChipProps } from '@msqdx/design-system';
```

