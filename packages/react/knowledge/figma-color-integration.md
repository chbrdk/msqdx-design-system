# Figma Color Integration Guide

## Übersicht

Dieses Dokument beschreibt, wie Farben aus dem MSQ-DX Brand Toolkit (Figma) in das Design System integriert werden.

## Figma Link

**Brand Toolkit**: https://www.figma.com/design/xGAr9Xowk1mRUu8ONUwmbZ/MSQ-DX_BRAND-TOOLKIT_EXTERNAL-1?node-id=2002-1278

## Farb-Struktur

Die Farb-Tokens sind in `src/tokens/colors.ts` organisiert:

### 1. Primary Brand Colors (`MSQDX_BRAND_PRIMARY`)
- 50-950 Scale (10 Stufen)
- Basis: 500
- Verwendung: Hauptmarkenfarben

### 2. Secondary Brand Colors (`MSQDX_BRAND_SECONDARY`)
- 50-950 Scale (10 Stufen)
- Basis: 500
- Verwendung: Sekundäre Markenfarben

### 3. Accent Colors (`MSQDX_BRAND_ACCENTS`)
- purple, yellow, pink, orange, blue, green
- Verwendung: Akzentfarben für spezielle Elemente

### 4. Neutral Colors (`MSQDX_NEUTRAL`)
- 50-950 Scale (10 Stufen)
- Verwendung: Grautöne für Text, Borders, etc.

### 5. Status Colors (`MSQDX_STATUS`)
- success, warning, error, info
- Jeder mit light, base, dark Varianten
- Verwendung: UI-Zustände und Feedback

### 6. Theme Palettes (`MSQDX_THEME`)
- light / dark Mode
- background, surface, text, border Kategorien
- Verwendung: Theme-spezifische Farben

## So integrierst du Farben aus Figma

### Schritt 1: Farben aus Figma extrahieren

1. Öffne das Figma Brand Toolkit
2. Navigiere zu den Farb-Paletten
3. Kopiere die Hex-Werte für jede Farbe

### Schritt 2: Farben in `colors.ts` eintragen

**Beispiel für Primary Colors:**
```typescript
export const MSQDX_BRAND_PRIMARY = {
  50: "#f0f9ff",   // Aus Figma: Lightest tint
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",  // Aus Figma: Base primary
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e",  // Aus Figma: Darkest shade
  950: "#082f49",
} as const;
```

**Beispiel für Accent Colors:**
```typescript
export const MSQDX_BRAND_ACCENTS = {
  purple: "#b638ff",  // Aus Figma
  yellow: "#fef14d",  // Aus Figma
  // ... weitere Farben
} as const;
```

### Schritt 3: Storybook aktualisieren

Die Storybook-Story in `src/tokens/DesignTokens.stories.tsx` zeigt automatisch alle Farben an. Nach dem Update der Farben werden sie in Storybook sichtbar.

### Schritt 4: Testen

1. Starte Storybook: `npm run storybook`
2. Navigiere zu "Design System/Design Tokens" → "Colors"
3. Überprüfe, ob alle Farben korrekt angezeigt werden

## Best Practices

1. **Konsistenz**: Verwende immer die gleiche Struktur (50-950 Scale)
2. **Naming**: Halte dich an die etablierten Namenskonventionen
3. **Dokumentation**: Kommentiere die Quelle der Farben (z.B. "Aus Figma Brand Toolkit")
4. **Backward Compatibility**: Die `MSQDX_COLORS` Export-Struktur bleibt für Kompatibilität erhalten

## Aktuelle Farb-Quellen

- **Primary/Secondary**: Standard Tailwind-Scale (kann aus Figma ersetzt werden)
- **Accents**: Aktuelle Werte aus dem Design System
- **Neutral**: Standard Grau-Scale (kann aus Figma ersetzt werden)
- **Status**: Aktuelle Werte (kann aus Figma angepasst werden)
- **Theme**: Aktuelle Light/Dark Werte (kann aus Figma angepasst werden)

## Nächste Schritte

1. ✅ Farb-Struktur erstellt
2. ⏳ Farben aus Figma extrahieren
3. ⏳ Farben in `colors.ts` eintragen
4. ⏳ In Storybook überprüfen
5. ⏳ Komponenten mit neuen Farben aktualisieren
