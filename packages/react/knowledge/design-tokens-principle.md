# Design Tokens Principle - Absolute Rule

## Datum
2025-01-31

## Regel

**ALLE Design-Entscheidungen MÜSSEN auf Basis der Design Tokens getroffen werden.**

### Grundprinzipien:

1. **Token-First Approach**
   - Jede Design-Entscheidung (Farben, Abstände, Typografie, etc.) MUSS auf existierenden Tokens basieren
   - Keine hardcodierten Werte in Komponenten oder Styles
   - Alle Werte müssen aus den Token-Dateien kommen

2. **Token-Ergänzung bei fehlenden Definitionen**
   - Wenn ein Wert benötigt wird, der noch nicht als Token existiert:
     - **Zuerst** den Token hinzufügen
     - **Dann** den Token in der Komponente verwenden
   - Nie direkt einen Wert verwenden, ohne ihn als Token zu definieren

3. **Token-Struktur**
   - Tokens sind in `src/tokens/` definiert:
     - `colors.ts` - Alle Farben
     - `typography.ts` - Font Families, Sizes, Weights, Line Heights, Letter Spacing, Text Transform
     - `spacing.ts` - Spacing Scale, Border Radius
     - `effects.ts` - Glass Effects, Shadows, etc.
     - `breakpoints.ts` - Responsive Breakpoints
   - CSS Variablen in `src/styles/tokens.css`
   - Storybook Dokumentation in `src/tokens/DesignTokens.stories.tsx`

4. **Verwendung**
   - **TypeScript/JavaScript**: Import aus `@msqdx/design-system/tokens`
   - **CSS**: Verwendung von CSS Custom Properties (`var(--msqdx-*)`)
   - **MUI Theme**: Tokens werden in das MUI Theme integriert

## Beispiele

### ✅ RICHTIG:
```typescript
// Token zuerst definieren
export const MSQDX_SPACING = {
  padding: {
    card: 24,
  }
};

// Dann verwenden
<Box sx={{ padding: MSQDX_SPACING.padding.card }}>
```

### ❌ FALSCH:
```typescript
// Direkt hardcodiert
<Box sx={{ padding: 24 }}>
```

## Workflow

1. **Neue Komponente/Feature erstellen**
   - Prüfen: Welche Tokens werden benötigt?
   - Fehlen Tokens? → Zuerst Tokens ergänzen
   - Dann Komponente mit Tokens implementieren

2. **Token ergänzen**
   - Token in entsprechende Datei hinzufügen (`colors.ts`, `typography.ts`, etc.)
   - CSS Variable in `tokens.css` hinzufügen
   - Storybook Dokumentation aktualisieren
   - Build testen

3. **Code Review Checklist**
   - [ ] Alle Werte kommen aus Tokens?
   - [ ] Keine hardcodierten Farben/Abstände/Typografie?
   - [ ] Neue Tokens sind dokumentiert?
   - [ ] CSS Variablen sind vorhanden?

## Wichtige Dateien

- Token Definitionen: `src/tokens/*.ts`
- CSS Variablen: `src/styles/tokens.css`
- Storybook Docs: `src/tokens/DesignTokens.stories.tsx`
- MUI Theme Integration: `.storybook/preview.tsx`

## Ausnahmen

**KEINE** - Diese Regel hat keine Ausnahmen. Alle Design-Werte müssen als Tokens definiert sein.
