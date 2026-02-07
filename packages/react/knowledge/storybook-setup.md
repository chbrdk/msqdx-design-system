# Storybook Setup Dokumentation

## Übersicht

Storybook 10.2.3 wurde erfolgreich in das `@msqdx/design-system` Package integriert. Diese Dokumentation beschreibt die Konfiguration und den Aufbau.

## Installation

Storybook wurde mit folgenden Paketen installiert:

- `@storybook/react-vite@^10.2.3` - React + Vite Integration (Storybook 10)
- `@storybook/react@^10.2.3` - React Framework (Storybook 10)
- `storybook@^10.2.3` - Storybook CLI (neueste Version)
- `vite@^7.3.1` - Build Tool (neueste Version)
- `react@^19.2.4` - React (neueste Version)
- `react-dom@^19.2.4` - React DOM (neueste Version)
- `typescript@^5.9.3` - TypeScript (neueste Version)

**Wichtige Änderung**: In Storybook 10 sind die Essentials-Addons bereits integriert und müssen nicht mehr separat installiert werden. Die Addons werden automatisch über die Konfiguration in `.storybook/main.ts` geladen.

**Aktualisierte Packages (Stand: 2025-01-31)**:
- ✅ Storybook 10.2.3 (vorher 8.6.15) - **2 Versionen weiter!**
- ✅ React 19.2.4 (vorher 18.3.1)
- ✅ React-DOM 19.2.4 (vorher 18.3.1)
- ✅ @types/react 19.2.10 (vorher 18.3.27)
- ✅ @types/react-dom 19.2.3 (vorher 18.3.7)
- ✅ Vite 7.3.1 (vorher 5.4.21)

## Konfiguration

### Hauptkonfiguration (`.storybook/main.ts`)

- **Framework**: React mit Vite
- **Stories Pattern**: `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- **Addons**: Essentials, Interactions, Links
- **TypeScript**: React Docgen für automatische Props-Dokumentation

### Preview Konfiguration (`.storybook/preview.tsx`)

- **Theme Integration**: MUI Theme Provider mit Light/Dark Mode
- **Design Tokens**: Integration der MSQDX_COLORS für Theme-Erstellung
- **Backgrounds**: Light/Dark Mode Hintergründe
- **Decorators**: Automatische Theme-Provider Wrapper für alle Stories

## Struktur

### Stories Organisation

Stories sind nach Atomic Design Prinzipien organisiert:

```
src/
  components/
    atoms/
      Button/MsqdxButton.stories.tsx
      Badge/MsqdxBadge.stories.tsx
      Chip/MsqdxChip.stories.tsx
      Typography/MsqdxTypography.stories.tsx
      Progress/MsqdxProgress.stories.tsx
    molecules/
      GlassCard/MsqdxGlassCard.stories.tsx
      FormField/MsqdxFormField.stories.tsx
      Select/MsqdxSelect.stories.tsx
      Tabs/MsqdxTabs.stories.tsx
      Stepper/MsqdxStepper.stories.tsx
  tokens/
    DesignTokens.stories.mdx
```

## Scripts

Die folgenden npm Scripts wurden hinzugefügt:

- `npm run storybook` - Startet Storybook Dev Server auf Port 6006
- `npm run build-storybook` - Baut eine statische Storybook-Version

## Features

### Automatische Dokumentation

Alle Stories haben `autodocs: 'tag'` aktiviert, was automatische Dokumentationsseiten generiert.

### Theme Toggle

Ein globaler Theme-Toggle ermöglicht das Wechseln zwischen Light und Dark Mode in allen Stories.

### Design Tokens Dokumentation

Eine MDX-basierte Dokumentationsseite zeigt alle Design Tokens (Colors, Spacing, Typography).

## Nächste Schritte

1. ✅ Storybook 10.2.3 installiert (neueste Version)
2. ✅ Konfiguration für React + TypeScript + MUI eingerichtet
3. ✅ Theme-Integration mit MUI Theme Provider
4. ✅ Stories für alle Atom-Komponenten erstellt
5. ✅ Stories für alle Molecule-Komponenten erstellt
6. ✅ Design Tokens Dokumentation erstellt
7. ⏳ Tests für Storybook Setup (optional)

## Wichtige Pfade

- Storybook Config: `.storybook/`
- Stories: `src/**/*.stories.tsx`
- Design Tokens Docs: `src/tokens/DesignTokens.stories.mdx`
- Knowledge Docs: `knowledge/`

## Abhängigkeiten

Storybook benötigt die folgenden Peer Dependencies (als devDependencies installiert):

- `react@^19.0.0`
- `react-dom@^19.0.0`
- `@mui/material@^7.0.0`
- `@emotion/react@^11.0.0`
- `@emotion/styled@^11.0.0`
