# Knowledge Base - MSQDX Design System

Diese Knowledge Base enthält wichtige Dokumentationen, Regeln und Prinzipien für das MSQDX Design System.

## Wichtige Regeln

### 🚨 Design Tokens Principle (ABSOLUTE REGEL)
**→ [design-tokens-principle.md](./design-tokens-principle.md)**

**ALLE Design-Entscheidungen MÜSSEN auf Basis der Design Tokens getroffen werden.**
- Keine hardcodierten Werte
- Fehlende Tokens müssen zuerst ergänzt werden
- Token-First Approach für alle Komponenten

## Dokumentationen

### Setup & Konfiguration
- **[storybook-setup.md](./storybook-setup.md)** - Storybook Setup und Konfiguration
- **[storybook-urls.md](./storybook-urls.md)** - Storybook URLs und wichtige Pfade

### Design Tokens
- **[msqdx-com-tokens.md](./msqdx-com-tokens.md)** - Extrahierte Tokens von msqdx.com
- **[figma-color-integration.md](./figma-color-integration.md)** - Figma Color Integration Guide

## Workflow

1. **Vor jeder neuen Komponente/Feature:**
   - Prüfe: Welche Tokens werden benötigt?
   - Fehlen Tokens? → Zuerst Tokens ergänzen
   - Dann Komponente mit Tokens implementieren

2. **Token ergänzen:**
   - Token in entsprechende Datei hinzufügen
   - CSS Variable in `tokens.css` hinzufügen
   - Storybook Dokumentation aktualisieren

3. **Code Review:**
   - Alle Werte kommen aus Tokens?
   - Keine hardcodierten Werte?
   - Neue Tokens dokumentiert?

## Wichtige Dateien

- Token Definitionen: `src/tokens/*.ts`
- CSS Variablen: `src/styles/tokens.css`
- Storybook Docs: `src/tokens/DesignTokens.stories.tsx`
- MUI Theme: `.storybook/preview.tsx`
