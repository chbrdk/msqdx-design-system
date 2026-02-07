# Storybook URLs und Pfade

## Lokale Entwicklung

- **Storybook Dev Server**: `http://localhost:6006`
- **Start Command**: `npm run storybook`

## Build

- **Storybook Build**: `npm run build-storybook`
- **Output Directory**: `storybook-static/`

## Wichtige Dateien

- **Storybook Config**: `.storybook/main.ts`
- **Preview Config**: `.storybook/preview.tsx`
- **Stories**: `src/**/*.stories.tsx`
- **Design Tokens Docs**: `src/tokens/DesignTokens.stories.tsx`

## Storybook Navigation

Stories sind nach folgender Struktur organisiert:

- **Design System**
  - **Design Tokens** (Colors, Spacing, Typography)
  - **Atoms**
    - Button
    - Badge
    - Chip
    - Typography
    - Progress
  - **Molecules**
    - GlassCard
    - FormField
    - Select
    - Tabs
    - Stepper
