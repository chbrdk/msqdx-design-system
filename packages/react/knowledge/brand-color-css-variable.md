# Brand-Farbe per CSS-Variable (wie PLEXON Sidebar)

Damit die vom User gewählte Brand-Farbe überall im Design System greift, nutzen die Komponenten dieselbe **CSS-Variable wie die PLEXON-Navigation/Sidebar**.

## Variable

- **Name:** `--color-theme-accent` (wie in PLEXON `lib/theme-accent.ts` und Sidebar)
- **Token:** `MSQDX_BRAND_COLOR_CSS` = `var(--color-theme-accent, #00ca55)` (Fallback Grün)
- **Definiert in:** `@msqdx/tokens` → `tokens/colors.ts`

## Nutzung in der Host-App

PLEXON setzt die Variable bereits für die Sidebar (z. B. in Theme/globals). Sobald `--color-theme-accent` gesetzt ist, verwenden **Sidebar und alle MSQDX-Komponenten** dieselbe Farbe – keine zweite Variable nötig.

```css
:root {
  --color-theme-accent: #00ca55; /* oder die vom User gewählte Farbe */
}
```

## Komponenten

Alle Stellen, die zuvor `MSQDX_COLORS.brand.green` für die **primäre** Brand-Farbe genutzt haben, verwenden jetzt `MSQDX_BRAND_COLOR_CSS`:

- MsqdxIconButton (Focus-Ring)
- MsqdxPrismionCard (Rahmen bei selected)
- MsqdxPrismionToolbar (geöffneter Ring)
- SimpleBoardCanvas (neue Prismions, Toolbar-Button)
- BoardCanvas (Empty-State-Rahmen)
- MsqdxConnectorEdge (Linie bei selected, Drag-Preview)
- MsqdxTabs (Indicator, ausgewählter Tab)
- BoardOnboarding (Icon-Farbe, Step-Dots)
- BoardHeader (Check-Icon, Hover, Share-Hintergrund)
- PrismionPorts (Port-Hintergrund, Fokus-Ring)
- ConnectorMenu (Rahmen, Bild-Farbe, Schließen-Button)
- MsqdxSwitchField (Track bei checked)

Für Farben mit Transparenz wird `color-mix(in srgb, var(--color-theme-accent, #00ca55) X%, transparent)` verwendet (z. B. BoardHeader Share-Bereich, Port-Fokus-Ring).

## Ausnahme

Komponenten mit **explizitem** `brandColor`-Prop (z. B. Accordion, AdminNav, AppLayout) wählen weiterhin aus der Palette (purple, yellow, pink, …). Für die „eine“ User-Brand-Farbe ist nur `--color-theme-accent` maßgeblich (wie in PLEXON Sidebar/theme-accent).
