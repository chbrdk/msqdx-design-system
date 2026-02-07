# MSQDX Design System

Monorepo mit **Design Tokens** (`@msqdx/tokens`) und **React-Komponenten** (`@msqdx/react`). Storybook läuft im React-Paket.

---

## Quick Start

```bash
npm install
npm run build
npm run storybook
```

Storybook startet unter **http://localhost:6006**.

---

## Struktur

| Paket | Beschreibung |
|-------|----------------|
| `packages/tokens` | Design Tokens (Farben, Spacing, Typography, Effects, Icons, …) |
| `packages/react` | React-Komponenten (Atoms, Molecules, Layout, AUDION), abhängig von `@msqdx/tokens` |

**Scripts (Root):**

- `npm run build` – baut zuerst Tokens, dann React
- `npm run build:tokens` – nur Tokens bauen
- `npm run storybook` – Storybook im React-Paket starten

---

## In anderen Projekten verwenden

### Lokaler Pfad (z. B. AUDION)

Wenn das Design-System neben deinem Projekt liegt:

```bash
cd path/to/msqdx-design-system && npm install && npm run build
```

In der `package.json` des anderen Projekts:

```json
{
  "dependencies": {
    "@msqdx/tokens": "file:../msqdx-design-system/packages/tokens",
    "@msqdx/react": "file:../msqdx-design-system/packages/react"
  }
}
```

Dann im Projekt `npm install` ausführen.

### Als npm-Pakete publizieren

1. Für den Scope `@msqdx` eine npm-Organisation anlegen (oder Packages z. B. als `@chbrdk/tokens` / `@chbrdk/react` benennen).

2. Aus dem Repo-Root:

   ```bash
   npm run build
   cd packages/tokens && npm publish --access public
   cd ../react && npm publish --access public
   ```

   Beim ersten Publish von Scoped-Paketen ist `--access public` nötig.

3. Im anderen Projekt:

   ```bash
   npm install @msqdx/tokens @msqdx/react
   ```

### GitHub Packages

1. In `packages/tokens/package.json` und `packages/react/package.json` ergänzen:

   ```json
   "publishConfig": {
     "registry": "https://npm.pkg.github.com/chbrdk"
   }
   ```

2. Paketnamen an Org anpassen (z. B. `@chbrdk/tokens`, `@chbrdk/react`). In der konsumierenden App `.npmrc`:

   ```
   @chbrdk:registry=https://npm.pkg.github.com
   ```

3. Wie unter „Als npm-Pakete publizieren“ bauen und in den jeweiligen `packages/*`-Ordnern `npm publish` ausführen.

---

## Repo auf GitHub pushen

```bash
git add .
git commit -m "chore: monorepo with @msqdx/tokens and @msqdx/react, README"
git push origin main
```

Falls noch kein Remote gesetzt ist:

```bash
gh repo create chbrdk/msqdx-design-system --private --source=. --push
```

---

## Technik

- **Workspaces:** `packages/tokens`, `packages/react` (npm workspaces)
- **Build:** TypeScript (`tsc`), Stories für den Publish ausgeschlossen
- **React:** MUI (Material UI), Emotion, Design Tokens aus `@msqdx/tokens`
