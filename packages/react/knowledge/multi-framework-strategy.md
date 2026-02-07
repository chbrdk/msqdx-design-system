# Multi-Framework Strategy - MSQDX Design System

## Übersicht

Das MSQDX Design System soll **multi-framework-fähig** werden, um sowohl **React** als auch **Svelte 4 und 5** zu unterstützen.

## Aktuelle Architektur

### ✅ Framework-Agnostic Layer (bereits vorhanden)

1. **Design Tokens** (`src/tokens/`)
   - TypeScript-Definitionen (framework-agnostic)
   - CSS Custom Properties (`src/styles/tokens.css`)
   - Können von jedem Framework verwendet werden

2. **CSS Variablen**
   - Alle Tokens als CSS Custom Properties
   - Direkt in jedem Framework verwendbar

## Empfohlene Multi-Framework-Architektur

### Option 1: Monorepo mit separaten Packages (EMPFOHLEN)

```
msqdx-design-system/
├── packages/
│   ├── tokens/              # Framework-agnostic Tokens (TypeScript + CSS)
│   │   ├── src/
│   │   │   ├── tokens/      # TypeScript Token-Definitionen
│   │   │   └── styles/      # CSS Custom Properties
│   │   └── package.json
│   │
│   ├── react/               # React-spezifische Komponenten
│   │   ├── src/
│   │   │   └── components/  # React-Komponenten (MsqdxButton, etc.)
│   │   ├── .storybook/      # React Storybook
│   │   └── package.json
│   │
│   ├── svelte/              # Svelte-spezifische Komponenten
│   │   ├── src/
│   │   │   └── components/  # Svelte-Komponenten
│   │   ├── .storybook/      # Svelte Storybook
│   │   └── package.json
│   │
│   └── svelte5/             # Svelte 5-spezifische Komponenten (optional)
│       ├── src/
│       │   └── components/
│       ├── .storybook/
│       └── package.json
│
└── package.json             # Root package.json (workspace)
```

**Vorteile:**
- ✅ Klare Trennung der Frameworks
- ✅ Jedes Framework hat sein eigenes Storybook
- ✅ Tokens werden zentral geteilt
- ✅ Framework-spezifische Optimierungen möglich
- ✅ Einfache Wartung und Skalierung

### Option 2: Ein Storybook mit Multi-Framework-Support

Storybook 7+ unterstützt theoretisch mehrere Frameworks in einem Storybook, aber:
- ⚠️ Komplexere Konfiguration
- ⚠️ Framework-spezifische Stories müssen getrennt werden
- ⚠️ Weniger flexibel für Framework-spezifische Features

**Nicht empfohlen** für unsere Anforderungen.

## Storybook Multi-Framework-Support

### Storybook kann Multi-Framework abdecken:

1. **Separate Storybook-Instanzen** (EMPFOHLEN)
   - Jedes Framework hat sein eigenes Storybook
   - Ports: React (6006), Svelte 4 (6007), Svelte 5 (6008)
   - Gemeinsame Token-Dokumentation kann geteilt werden

2. **Storybook Composition** (Alternative)
   - Ein Haupt-Storybook, das andere Storybooks einbindet
   - Komplexer, aber zentralisierte Dokumentation

## Migrations-Strategie

### Phase 1: Tokens extrahieren (SOFORT MÖGLICH)

Die Tokens sind bereits framework-agnostic:
- ✅ TypeScript-Definitionen können direkt importiert werden
- ✅ CSS-Variablen funktionieren in jedem Framework
- ✅ Keine Änderungen nötig

### Phase 2: Package-Struktur umbauen

1. **Neues `tokens` Package erstellen:**
   ```bash
   packages/tokens/
   ├── src/
   │   ├── tokens/        # Aktuelle Token-Definitionen
   │   └── styles/        # CSS Custom Properties
   └── package.json
   ```

2. **React Package umbenennen:**
   ```bash
   packages/design-system/ → packages/react/
   ```

3. **Svelte Packages erstellen:**
   ```bash
   packages/svelte/        # Svelte 4
   packages/svelte5/       # Svelte 5 (optional)
   ```

### Phase 3: Storybook für jedes Framework

Jedes Framework bekommt sein eigenes Storybook:

**React Storybook** (bereits vorhanden):
- Framework: `@storybook/react-vite`
- Port: 6006

**Svelte 4 Storybook:**
- Framework: `@storybook/svelte`
- Port: 6007

**Svelte 5 Storybook:**
- Framework: `@storybook/svelte5` (wenn verfügbar)
- Port: 6008

## Token-Sharing zwischen Frameworks

### TypeScript Tokens

```typescript
// In React
import { MSQDX_COLORS, MSQDX_SPACING } from '@msqdx/tokens';

// In Svelte
import { MSQDX_COLORS, MSQDX_SPACING } from '@msqdx/tokens';
```

### CSS Tokens

```css
/* In jedem Framework */
@import '@msqdx/tokens/styles/tokens.css';

.button {
  background-color: var(--msqdx-color-brand-purple);
  border-radius: var(--msqdx-spacing-border-radius-md);
}
```

## Komponenten-Implementierung

### React (bereits vorhanden)

```tsx
// packages/react/src/components/atoms/Button/MsqdxButton.tsx
import { MSQDX_BUTTON } from '@msqdx/tokens';

export const MsqdxButton = ({ ... }) => {
  // React-spezifische Implementierung
};
```

### Svelte 4

```svelte
<!-- packages/svelte/src/components/atoms/Button/MsqdxButton.svelte -->
<script lang="ts">
  import { MSQDX_BUTTON } from '@msqdx/tokens';
  // Svelte-spezifische Logik
</script>

<button
  style="border-radius: var(--msqdx-spacing-border-radius-{MSQDX_BUTTON.borderRadius.default});"
>
  <slot />
</button>
```

### Svelte 5

Ähnlich wie Svelte 4, aber mit Svelte 5-spezifischen Features (z.B. Runes).

## NPM Package-Struktur

### Root Package (`@msqdx/design-system`)

```json
{
  "name": "@msqdx/design-system",
  "workspaces": [
    "packages/*"
  ]
}
```

### Token Package (`@msqdx/tokens`)

```json
{
  "name": "@msqdx/tokens",
  "exports": {
    ".": "./dist/tokens/index.js",
    "./styles": "./src/styles/tokens.css"
  }
}
```

### React Package (`@msqdx/design-system-react`)

```json
{
  "name": "@msqdx/design-system-react",
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "@msqdx/tokens": "*"
  }
}
```

### Svelte Package (`@msqdx/design-system-svelte`)

```json
{
  "name": "@msqdx/design-system-svelte",
  "peerDependencies": {
    "svelte": "^4.0.0",
    "@msqdx/tokens": "*"
  }
}
```

## Storybook-Konfiguration

### React Storybook (bereits vorhanden)

```typescript
// packages/react/.storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: { name: '@storybook/react-vite' },
  // ...
};
```

### Svelte Storybook

```typescript
// packages/svelte/.storybook/main.ts
import type { StorybookConfig } from '@storybook/svelte';

const config: StorybookConfig = {
  framework: { name: '@storybook/svelte' },
  // ...
};
```

## Vorteile dieser Architektur

1. ✅ **Token-First Approach**: Tokens bleiben zentral und framework-agnostic
2. ✅ **Framework-Optimierungen**: Jedes Framework kann seine Stärken nutzen
3. ✅ **Einfache Wartung**: Änderungen an Tokens wirken sich auf alle Frameworks aus
4. ✅ **Klare Struktur**: Jedes Framework hat sein eigenes Package und Storybook
5. ✅ **Skalierbarkeit**: Neue Frameworks können einfach hinzugefügt werden

## Nächste Schritte

1. ✅ **Tokens sind bereits framework-agnostic** - keine Änderungen nötig
2. ⏳ **Package-Struktur umbauen** (wenn gewünscht)
3. ⏳ **Svelte-Komponenten implementieren** (basierend auf React-Komponenten)
4. ⏳ **Svelte Storybook einrichten**

## Fazit

**Ja, Storybook kann Multi-Framework abdecken!**

Die beste Strategie ist:
- **Separate Storybook-Instanzen** für jedes Framework
- **Gemeinsame Token-Basis** (bereits vorhanden)
- **Framework-spezifische Komponenten** in separaten Packages

Die Tokens sind bereits so strukturiert, dass sie von jedem Framework verwendet werden können. Die Hauptarbeit liegt in der Implementierung der Svelte-Komponenten.
