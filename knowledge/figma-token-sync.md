# Figma Token Sync – Mapping

Dokumentation des Syncs von MSQDX Design Tokens nach Figma (Variables + Styles).

## Variable Collection

- **Name:** `MSQDX Design Tokens`
- **Mode:** Ein Standard-Mode (Light)

## Token → Figma Mapping

| Token-Typ           | Figma Variable | Figma Style     | Beispielpfad              |
|---------------------|----------------|-----------------|---------------------------|
| Hex / rgba Farben   | COLOR          | PaintStyle      | `colors/brand/purple`     |
| Zahlen (px, rem)    | FLOAT          | –               | `numbers/spacing/scale/md`|
| Schriftfamilie      | STRING         | –               | `strings/typography/fontFamily/primary` |
| Font-Größe (rem)    | FLOAT          | –               | `numbers/typography/fontSize/sm` |

## Ausgeschlossene Token

- `MSQDX_ICON_NAMES` – reine Icon-Namenszuordnung
- `MSQDX_ANIMATION_KEYFRAMES` – Keyframe-Namen

## Pfadstruktur

- **Colors:** `colors/{token-group}/{path}` (z. B. `colors/brand/purple`)
- **Numbers:** `numbers/{token-group}/{path}` (z. B. `numbers/spacing/scale/md`)
- **Strings:** `strings/{token-group}/{path}` (nur für font-bezogene Werte)

## Styles

- **PaintStyles:** Alle Farb-Tokens werden als PaintStyle angelegt und mit der jeweiligen COLOR-Variable verknüpft.
- **TextStyles:** Aktuell nicht erzeugt (Figma Font-Loading erforderlich).

## Button Sync (state of the art)

Nach **Sync Design Tokens** kann **Sync Button** ausgeführt werden. Es erstellt einen Component Set `MSQDX/Button` via `figma.combineAsVariants()`:

- **Width:** Hug Content (`primaryAxisSizingMode = AUTO`)
- **Varianten:** Basis-Component klonen → `combineAsVariants()` – Variant × Color × Size × Radius = 180 Varianten
- **Variable-Bindungen:** Alle Werte über Variablen (keine Hardcodes). Pfade: `numbers/BUTTON/size/...`, `numbers/BUTTON/borderRadius/...`, `colors/brand/...`
- **Component Properties:** Label (TEXT), Disabled (BOOLEAN), Loading (BOOLEAN)

## Atom Sync (alle Atome)

**Sync All Atoms** erstellt für alle Atome Component Sets nach dem gleichen Muster:

| Atom | Varianten | Variable-Bindungen |
|------|-----------|-------------------|
| Button | Variant × Color × Size × Radius | height, padding, gap, radius, fill, text |
| Divider | Orientation × Thickness × Color | stroke, strokeWeight |
| Badge | Size × Color | padding, fontSize, fill (tint), stroke |
| Chip | Variant × Size × Color | height, padding, gap, fontSize, fill/stroke |
| Typography | Variant (H1, H2, Body1, …) | fontSize |
| Avatar | Size × Shape × Color | width, height, fontSize, fill |
| Progress | Color | fill (track, bar) |
| Card | Variant × Color | padding, fill, stroke |
| Label | Size | fontSize |
| Input | Size | height, padding |
| AspectRatio | Ratio | fill |

Reihenfolge: zuerst **Sync Design Tokens**, dann **Sync Button** oder **Sync All Atoms**.

## Build-Reihenfolge

1. `cd packages/tokens && npm run build:json`
2. `cd packages/figma-plugin && npm run build`
