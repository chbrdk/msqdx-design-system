# MSQDX Design System

Complete design system package for MSQDX projects, including design tokens, React components, theme configuration, and comprehensive documentation.

## Structure

```
msqdx-design-system/
├── packages/
│   └── design-system/     # Main package
│       ├── src/
│       │   ├── tokens/     # Design tokens
│       │   ├── components/ # React components
│       │   ├── theme/      # MUI theme configuration
│       │   └── styles/     # CSS variables and classes
│       └── dist/           # Build output
├── docs/                   # Documentation
│   ├── design-tokens.md
│   ├── components.md
│   ├── usage-guide.md
│   ├── migration-guide.md
│   ├── css-classes.md
│   └── accessibility.md
└── dsil/                   # DSIL format for LLMs
    ├── msqdx-design-system.dsil
    └── msqdx-design-system-compact.dsil
```

## Quick Start

See [packages/design-system/README.md](./packages/design-system/README.md) for installation and usage instructions.

## Documentation

- [Design Tokens Documentation](./docs/design-tokens.md)
- [Components Documentation](./docs/components.md)
- [Usage Guide](./docs/usage-guide.md)
- [Migration Guide](./docs/migration-guide.md)
- [CSS Classes](./docs/css-classes.md)
- [Accessibility Guidelines](./docs/accessibility.md)

## DSIL Format

The design system is available in DSIL (Design System Interface Layer) format optimized for LLM consumption:

- [Full DSIL Manifest](./dsil/msqdx-design-system.dsil)
- [Compact Format](./dsil/msqdx-design-system-compact.dsil)

## Contributing

This design system is used across multiple MSQDX projects:
- ECHON
- UNION
- AUDION
- DEVON

When making changes, ensure compatibility across all projects.

## License

MIT

