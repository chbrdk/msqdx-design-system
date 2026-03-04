# Brand-Farbe per CSS-Variable

Damit die vom User gewählte Brand-Farbe überall im Design System greift, nutzen die Komponenten eine **CSS Custom Property** statt einer festen Farbe (z. B. Grün).

## Variable

- **Name:** `--msqdx-brand-color`
- **Token:** `MSQDX_BRAND_COLOR_CSS` = `var(--msqdx-brand-color, #00ca55)` (Fallback Grün)
- **Definiert in:** `@msqdx/tokens` → `tokens/colors.ts`

## Nutzung in der Host-App

Die Anwendung (z. B. PLEXON) setzt die Variable einmal, z. B. im Root oder Theme:

```css
:root {
  --msqdx-brand-color: #00ca55; /* oder die vom User gewählte Farbe */
}
```

Wenn der User eine andere Brand-Farbe wählt, wird nur diese Variable aktualisiert; alle Komponenten (Cards, Toolbar, Ports, Connectors, Tabs, Switch, etc.) verwenden sie automatisch.

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

Für Farben mit Transparenz wird `color-mix(in srgb, var(--msqdx-brand-color, #00ca55) X%, transparent)` verwendet (z. B. BoardHeader Share-Bereich, Port-Fokus-Ring).

## Ausnahme

Komponenten mit **explizitem** `brandColor`-Prop (z. B. Accordion, AdminNav, AppLayout) wählen weiterhin aus der Palette (purple, yellow, pink, …). Für die „eine“ User-Brand-Farbe ist nur `--msqdx-brand-color` maßgeblich.
