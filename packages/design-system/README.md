# @msqdx/design-system

MSQDX Glass Design System - A comprehensive design system with tokens, components, and utilities for building consistent user interfaces.

## Installation

```bash
npm install @msqdx/design-system
# or
yarn add @msqdx/design-system
# or
pnpm add @msqdx/design-system
```

## Peer Dependencies

This package requires the following peer dependencies:

- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0
- `@mui/material` ^6.0.0 || ^7.0.0
- `@emotion/react` ^11.0.0
- `@emotion/styled` ^11.0.0

## Usage

### Design Tokens

```tsx
import { MSQDX_COLORS, MSQDX_SPACING, MSQDX_TYPOGRAPHY } from '@msqdx/design-system';

// Use colors
const primaryColor = MSQDX_COLORS.brand.green;
const successColor = MSQDX_COLORS.status.success;

// Use spacing
const borderRadius = MSQDX_SPACING.borderRadius.md;
const padding = MSQDX_SPACING.scale.lg;

// Use typography
const fontSize = MSQDX_TYPOGRAPHY.fontSize.base;
const fontWeight = MSQDX_TYPOGRAPHY.fontWeight.bold;
```

### Components

```tsx
import { MsqdxButton, MsqdxTypography, MsqdxChip } from '@msqdx/design-system';

function App() {
  return (
    <>
      <MsqdxButton variant="contained" color="primary">
        Click me
      </MsqdxButton>
      
      <MsqdxTypography variant="h1" weight="extrabold">
        Heading
      </MsqdxTypography>
      
      <MsqdxChip variant="glass" color="primary">
        Tag
      </MsqdxChip>
    </>
  );
}
```

## Documentation

Full documentation is available in the `/docs` directory:

- [Design Tokens](./docs/design-tokens.md)
- [Components](./docs/components.md)
- [Usage Guide](./docs/usage-guide.md)
- [Migration Guide](./docs/migration-guide.md)
- [CSS Classes](./docs/css-classes.md)
- [Accessibility](./docs/accessibility.md)

## DSIL Format

The design system is also available in DSIL (Design System Interface Layer) format for LLM consumption:

- [DSIL Manifest](./dsil/msqdx-design-system.dsil)
- [DSIL Compact](./dsil/msqdx-design-system-compact.dsil)

## License

MIT

