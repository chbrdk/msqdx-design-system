# MUI `sx` und Design-Tokens

## Problem

In MUI werden **Zahlen** in der `sx`-Prop je nach Property interpretiert:

- **`padding`**, **`margin`**, **`gap`**: `theme.spacing(n)` → typisch **n × 8px**
- **`borderRadius`**: `n * theme.shape.borderRadius` → bei Default 4 z.B. **n × 4px**; bei manchen Themes (z. B. 12) wird **n × 12** gerechnet

Wenn MSQDX-Token-**Zahlen** (z. B. `MSQDX_SPACING.padding.sm` = 12, `borderRadius.button` = 32) direkt in `sx` übergeben werden, entstehen dadurch falsche Werte (z. B. 384px statt 32px bei `borderRadius: 32` und `shape.borderRadius: 12`).

## Lösung

Für **borderRadius**, **padding**, **margin** und andere Abstände in **MUI `sx`** immer **Pixel-Strings** verwenden, wenn die Werte aus den MSQDX-Tokens kommen:

- `borderRadius: "32px"` statt `borderRadius: MSQDX_SPACING.borderRadius.button`
- `padding: "12px"` statt `padding: MSQDX_SPACING.padding.sm`
- `padding: "16px"` statt `padding: MSQDX_SPACING.padding.md`

So wird die Theme-Multiplikation umgangen und die Tokens bleiben konsistent.

## Betroffene Komponenten (bereits angepasst)

- **PrismionCard**: Card-Radius 32px, Innenabstand 12px, Hintergrund `#fff`
- **BoardCanvas**: Empty-State-Box mit 32px Radius, 32px Padding, Hintergrund `#fff`
- **CommandPalette**, **ContextMenu**, **InspectorPanel**, **MergeDrawer**: Padding/Radius als px-Strings
- **PrismionResult**, **ConnectorEdge**, **BoardOnboarding**, **BoardHeader**: ebenso

## Referenz

- MUI: [sx prop](https://mui.com/system/getting-started/the-sx-prop/)
- Tokens: `@msqdx/tokens` → `MSQDX_SPACING.borderRadius`, `MSQDX_SPACING.padding`, etc.

---

## Typography: kleinere Schrift, Mono

In Board- und Prismion-Komponenten gilt:
- **Schriftgrößen** eine Stufe kleiner: z. B. `fontSize.sm` → `fontSize.xs`, `fontSize.xs` → `fontSize["2xs"]`.
- **Schriftart** überall **Mono** aus den Tokens: `fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono` (IBM Plex Mono).
- Neuer Token: `MSQDX_TYPOGRAPHY.fontSize["2xs"]` = 11px (0.6875rem) für sehr kompakte UI.
