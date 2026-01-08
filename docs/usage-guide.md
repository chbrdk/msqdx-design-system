# Usage Guide

Complete guide for using the MSQDX Design System in your projects.

## Installation

```bash
npm install @msqdx/design-system
# or
yarn add @msqdx/design-system
# or
pnpm add @msqdx/design-system
```

## Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## Basic Setup

### 1. Import Design Tokens

```tsx
import { MSQDX_COLORS, MSQDX_SPACING, MSQDX_TYPOGRAPHY } from '@msqdx/design-system';
```

### 2. Import Components

```tsx
import { MsqdxButton, MsqdxTypography, MsqdxChip } from '@msqdx/design-system';
```

### 3. Use in Your Components

```tsx
function MyComponent() {
  return (
    <div>
      <MsqdxTypography variant="h1" weight="extrabold">
        Welcome
      </MsqdxTypography>
      
      <MsqdxButton variant="contained" color="primary">
        Get Started
      </MsqdxButton>
      
      <MsqdxChip variant="glass" color="primary" label="New" />
    </div>
  );
}
```

## Theme Integration

### MUI Theme Setup

The design system tokens can be integrated into your MUI theme:

```tsx
import { createTheme } from '@mui/material/styles';
import { MSQDX_COLORS, MSQDX_SPACING, MSQDX_TYPOGRAPHY } from '@msqdx/design-system';

const theme = createTheme({
  palette: {
    primary: {
      main: MSQDX_COLORS.brand.green,
    },
    background: {
      default: MSQDX_COLORS.light.background,
      paper: MSQDX_COLORS.light.paper,
    },
  },
  typography: {
    fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary,
  },
  shape: {
    borderRadius: MSQDX_SPACING.borderRadius.md,
  },
});
```

## Component Examples

### Button

```tsx
// Basic button
<MsqdxButton variant="contained" color="primary">
  Click me
</MsqdxButton>

// Loading state
<MsqdxButton variant="contained" loading>
  Loading...
</MsqdxButton>

// Glass effect
<MsqdxButton variant="outlined" glass>
  Glass Button
</MsqdxButton>

// With icon
<MsqdxButton variant="contained" startIcon={<Icon />}>
  With Icon
</MsqdxButton>
```

### Typography

```tsx
// Headings
<MsqdxTypography variant="h1" weight="extrabold">
  Main Heading
</MsqdxTypography>

<MsqdxTypography variant="h2" weight="extrabold">
  Section Heading
</MsqdxTypography>

// Body text
<MsqdxTypography variant="body1" weight="regular">
  Body text content
</MsqdxTypography>

// Eyebrow label
<MsqdxTypography variant="caption" eyebrow>
  Label
</MsqdxTypography>

// Custom weight
<MsqdxTypography variant="body1" weight="light">
  Light text
</MsqdxTypography>
```

### Chip

```tsx
// Glass variant
<MsqdxChip variant="glass" color="primary" label="Tag" />

// Filled variant
<MsqdxChip variant="filled" color="primary" label="Status" />

// Outlined variant
<MsqdxChip variant="outlined" color="primary" label="Category" />

// With glow
<MsqdxChip variant="glass" color="primary" label="Featured" glow />

// With delete
<MsqdxChip 
  variant="outlined" 
  label="Removable" 
  onDelete={() => console.log('Deleted')} 
/>
```

## Design Tokens Usage

### Colors

```tsx
import { MSQDX_COLORS } from '@msqdx/design-system';

// Brand colors
const primaryColor = MSQDX_COLORS.brand.green;
const accentColor = MSQDX_COLORS.brand.purple;

// Status colors
const successColor = MSQDX_COLORS.status.success;
const errorColor = MSQDX_COLORS.status.error;

// Theme colors
const bgColor = MSQDX_COLORS.light.background;
const textColor = MSQDX_COLORS.light.textPrimary;
```

### Spacing

```tsx
import { MSQDX_SPACING } from '@msqdx/design-system';

// Border radius
const cardRadius = MSQDX_SPACING.borderRadius.md;

// Padding/Margin
const padding = MSQDX_SPACING.scale.lg;
const margin = MSQDX_SPACING.scale.md;
```

### Typography

```tsx
import { MSQDX_TYPOGRAPHY } from '@msqdx/design-system';

const fontFamily = MSQDX_TYPOGRAPHY.fontFamily.primary;
const fontSize = MSQDX_TYPOGRAPHY.fontSize.base;
const fontWeight = MSQDX_TYPOGRAPHY.fontWeight.bold;
const lineHeight = MSQDX_TYPOGRAPHY.lineHeight.normal;
```

## Styled Components

You can use design tokens with styled components:

```tsx
import { styled } from '@mui/material/styles';
import { MSQDX_COLORS, MSQDX_SPACING } from '@msqdx/design-system';

const StyledCard = styled('div')({
  backgroundColor: MSQDX_COLORS.light.paper,
  borderRadius: MSQDX_SPACING.borderRadius.md,
  padding: MSQDX_SPACING.scale.lg,
  border: `1px solid ${MSQDX_COLORS.light.border}`,
});
```

## Best Practices

### 1. Use Design Tokens

Always use design tokens instead of hardcoded values:

```tsx
// ❌ Bad
<div style={{ padding: '24px', borderRadius: '16px' }}>

// ✅ Good
<div style={{ 
  padding: MSQDX_SPACING.scale.lg, 
  borderRadius: MSQDX_SPACING.borderRadius.md 
}}>
```

### 2. Prefer Components

Use React components over CSS classes:

```tsx
// ❌ Bad
<button className="msqdx-glass-button">Click</button>

// ✅ Good
<MsqdxButton variant="contained">Click</MsqdxButton>
```

### 3. Consistent Spacing

Use the spacing scale consistently:

```tsx
// ✅ Good
<Stack spacing={MSQDX_SPACING.scale.md}>
  <Item>1</Item>
  <Item>2</Item>
</Stack>
```

### 4. Typography Hierarchy

Follow the typography hierarchy:

```tsx
// ✅ Good
<MsqdxTypography variant="h1" weight="extrabold">Main</MsqdxTypography>
<MsqdxTypography variant="h2" weight="extrabold">Section</MsqdxTypography>
<MsqdxTypography variant="body1" weight="regular">Content</MsqdxTypography>
```

## Responsive Design

Use responsive helpers for mobile-first design:

```tsx
import { MSQDX_RESPONSIVE } from '@msqdx/design-system';

// Responsive padding
<Box sx={{ 
  p: { xs: MSQDX_RESPONSIVE.sectionPadding.xs, md: MSQDX_RESPONSIVE.sectionPadding.md } 
}}>
  Content
</Box>

// Responsive border radius
<Box sx={{ 
  borderRadius: { xs: MSQDX_RESPONSIVE.cardRadius.xs, md: MSQDX_RESPONSIVE.cardRadius.md } 
}}>
  Card
</Box>
```

## Dark Mode

The design system supports dark mode automatically. Ensure your theme provider is set up correctly:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## TypeScript Support

All components and tokens are fully typed:

```tsx
import type { MsqdxButtonProps } from '@msqdx/design-system';

const buttonProps: MsqdxButtonProps = {
  variant: 'contained',
  color: 'primary',
  loading: false,
};
```

## Troubleshooting

### Common Issues

1. **Peer dependency errors**: Make sure all peer dependencies are installed
2. **Type errors**: Ensure TypeScript is configured correctly
3. **Styling issues**: Check that MUI theme is properly set up
4. **Import errors**: Verify package installation and import paths

### Getting Help

- Check the [Design Tokens Documentation](./design-tokens.md)
- Review the [Components Documentation](./components.md)
- See the [Migration Guide](./migration-guide.md) for upgrading

