# Push to GitHub

Das Repository wurde erstellt unter: https://github.com/chbrdk/msqdx-design-system

## Push durchführen

Falls der automatische Push fehlgeschlagen ist, führe manuell aus:

```bash
cd /Users/m4-dev/Development/msqdx-design-system
git push -u origin main
```

Falls Authentifizierung erforderlich ist:

1. **Mit GitHub CLI (empfohlen):**
   ```bash
   gh auth login
   git push -u origin main
   ```

2. **Mit SSH:**
   ```bash
   git remote set-url origin git@github.com:chbrdk/msqdx-design-system.git
   git push -u origin main
   ```

3. **Mit Personal Access Token:**
   - Erstelle ein Token auf GitHub: Settings > Developer settings > Personal access tokens
   - Verwende das Token als Passwort beim Push

## Repository Status

- ✅ Git Repository initialisiert
- ✅ Initial Commit erstellt (44 Dateien, 3392 Zeilen)
- ✅ GitHub Repository erstellt: https://github.com/chbrdk/msqdx-design-system
- ⏳ Push zu GitHub (manuell erforderlich)

## Nächste Schritte

Nach erfolgreichem Push:

1. Package veröffentlichen (optional):
   ```bash
   cd packages/design-system
   npm publish
   ```

2. In Projekten verwenden:
   ```bash
   npm install git+https://github.com/chbrdk/msqdx-design-system.git
   ```

