# MSQDX Design System

Monorepo mit **Tokens** (`@msqdx/tokens`) und **React-Komponenten** (`@msqdx/react`). Storybook läuft im React-Paket.

## Repo auf GitHub pushen

```bash
# Abhängigkeiten installieren (aus Repo-Root)
npm install

# Packages bauen (tokens zuerst, dann react)
npm run build

# Änderungen committen und pushen
git add .
git commit -m "chore: design system as publishable packages"
git push origin main
```

Falls `origin` noch nicht gesetzt ist oder du ein neues Repo anlegen willst:

```bash
gh repo create chbrdk/msqdx-design-system --private --source=. --push
# oder öffentlich: --public
```

## In anderen Projekten verwenden

### Option A: Lokaler Pfad (ohne Publish, z. B. AUDION)

Wenn das Design-System neben deinem Projekt liegt:

```bash
# Im Design-System zuerst bauen
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

### Option B: Als npm-Pakete publizieren

1. **Registrierung:** Für den Scope `@msqdx` brauchst du eine npm-Organisation „msqdx“ (oder du benennst die Packages z. B. in `@chbrdk/tokens` und `@chbrdk/react` um).

2. **Build & Publish (aus Repo-Root):**

   ```bash
   npm run build
   cd packages/tokens && npm publish --access public
   cd ../react && npm publish --access public
   ```

   Beim ersten Publish von Scoped-Paketen (`@msqdx/...`) ist `--access public` nötig (oder vorher in der jeweiligen `package.json`: `"publishConfig": { "access": "public" }`).

3. **In anderen Projekten:**

   ```bash
   npm install @msqdx/tokens @msqdx/react
   ```

### Option C: GitHub Packages (npm-kompatibel)

Wenn du über GitHub Packages publizieren willst:

1. In jeder `package.json` (tokens, react) ergänzen:

   ```json
   "publishConfig": {
     "registry": "https://npm.pkg.github.com/chbrdk"
   }
   ```

2. In der anderen App eine `.npmrc` anlegen (oder global):

   ```
   @chbrdk:registry=https://npm.pkg.github.com
   ```

3. Paketnamen für GitHub Packages müssen zum Org-Namen passen, z. B. `@chbrdk/tokens` und `@chbrdk/react`. Dann wie unter Option B bauen und in `packages/tokens` bzw. `packages/react` mit `npm publish` publizieren.

## Lokale Entwicklung

```bash
# Aus dem Repo-Root
npm install
npm run build    # baut @msqdx/tokens immer; @msqdx/react ggf. nach Behebung von TS-Fehlern
npm run storybook
```

Storybook startet für das React-Paket (z. B. Port 6006).

**Hinweis:** Das React-Paket kann derzeit noch TypeScript-Fehler (z. B. doppelte Exports wie `BrandColor`/`MsqdxCard` aus atoms vs. molecules) melden. Bis dahin kannst du es in anderen Projekten per `file:../msqdx-design-system/packages/react` nutzen; für einen sauberen `npm publish` die Fehler in `packages/react` beheben.

## Struktur

- `packages/tokens` – Design Tokens (Farben, Spacing, Typography, …)
- `packages/react` – React-Komponenten (Atoms, Molecules, AUDION-Komponenten), abhängig von `@msqdx/tokens`
