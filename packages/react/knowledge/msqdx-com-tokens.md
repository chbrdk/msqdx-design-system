# MSQDX.com Design Tokens Extraktion

## Datum
2025-01-31

## Quelle
CSS-Dateien von https://www.msqdx.com

## Extrahierte Farben

### Brand Colors
- **Purple**: `#b638ff`
- **Yellow**: `#fef14d`
- **Pink**: `#f256b6`
- **Pink on Light**: `#d5108a` (für helle Hintergründe)
- **Orange**: `#ff6a3b`
- **Blue**: `#3080ff` (aktualisiert von `#3b82f6`)
- **Green**: `#00ca55`

### Tints (für Glass-Effekte)
- **Yellow Tint**: `#f3f0c8`
- **Pink Tint**: `#f3d9e3`
- **Orange Tint**: `#f8d5cb`
- **Orange Overlay 20%**: `#ff6a3b33`
- **Green Tint**: `#dff1e1`
- **Grey Light Tint**: `#d4d2d280`

### Neutral Colors
- **Neutral Background**: `#f8f6f0`
- **Grey Light**: `#d4d2d2`

### Primary Colors
- **Black**: `#000000`
- **White**: `#ffffff`

## Typografie

### Font Families
- **Primary Font**: `"Noto Sans JP", "Noto Sans JP Fallback", system-ui, sans-serif`
- **Secondary Font**: `"IBM Plex Mono", "IBM Plex Mono Fallback", ui-monospace, monospace`

### Font Sizes (in rem)
- `xs`: `0.75rem` (12px)
- `sm`: `0.875rem` (14px)
- `base`: `1rem` (16px)
- `lg`: `1.125rem` (18px)
- `xl`: `1.25rem` (20px)
- `2xl`: `1.5rem` (24px)
- `3xl`: `1.75rem` (28px)
- `4xl`: `2rem` (32px)
- `5xl`: `2.5rem` (40px)
- `6xl`: `3rem` (48px)
- `7xl`: `3.5rem` (56px)
- `8xl`: `4rem` (64px)
- `9xl`: `5rem` (80px)
- `10xl`: `6rem` (96px)

### Font Weights
- `light`: `300`
- `normal`: `400`
- `medium`: `500`
- `semibold`: `600`
- `bold`: `700`

### Line Heights
- `normal`: `1.5`
- `relaxed`: `1.625`

## Spacing & Border Radius

### Border Radius (in px)
- `sm`: `8px`
- `md`: `20px`
- `lg`: `40px`
- `button`: `32px`
- `2xl`: `80px`
- `3xl`: `24px` (1.5rem)

### Spacing Base
- Base spacing unit: `0.25rem` (4px)

## Implementierung

Die Tokens wurden in folgenden Dateien aktualisiert:
- `src/tokens/colors.ts` - Farben und Tints
- `src/tokens/typography.ts` - Font Families, Sizes, Weights, Line Heights
- `src/tokens/spacing.ts` - Border Radius Werte

## CSS Variablen Referenz

Die Website verwendet CSS Custom Properties:
- `--color-secondary-dx-*` für Brand Colors
- `--color-secondary-dx-*-tint` für Tints
- `--font-primary` und `--font-secondary` für Font Families
- `--text-*` für Font Sizes
- `--font-weight-*` für Font Weights
- `--radius-*` für Border Radius
- `--spacing` für Base Spacing Unit
