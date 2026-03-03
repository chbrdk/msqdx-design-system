# Prismion/Board → MSQDX Migration

Migration der Board-/Prismion-Komponenten aus PRISMORA-v2 ins MSQDX Design System.

## Quellen & Ziel

- **Quelle:** PRISMORA-v2 (`src/components/board/`, `src/types/prismora.ts`)
- **Ziel:** MSQDX-DS `packages/react` (Komponenten unter `components/prismion/`, Typen unter `types/prismion.ts`)

## Komponenten-Mapping (PRISMORA → MSQDX)

| PRISMORA (Board)      | MSQDX (Prismion)        | Status   |
|-----------------------|--------------------------|----------|
| PrismionPorts         | MsqdxPrismionPorts       | migriert |
| PrismionResult        | MsqdxPrismionResult      | migriert |
| PrismionToolbar       | MsqdxPrismionToolbar     | migriert |
| ConnectorEdge         | MsqdxConnectorEdge       | migriert |
| PresenceList          | MsqdxPresenceList        | migriert |
| PresenceLayer         | MsqdxPresenceLayer       | migriert |
| UserToolbar           | MsqdxUserToolbar         | migriert |
| PrismionCard          | MsqdxPrismionCard        | migriert |
| BoardHeader           | MsqdxBoardHeader         | migriert |
| BoardOnboarding       | MsqdxBoardOnboarding     | migriert |
| BoardToolbar          | MsqdxBoardToolbar        | migriert |
| BoardCanvas           | MsqdxBoardCanvas         | migriert |
| BoardCanvasFunctional | MsqdxBoardCanvasFunctional | migriert |
| BoardGrid             | MsqdxBoardGrid           | migriert |
| CommandPalette        | MsqdxCommandPalette      | migriert |
| ConnectorMenu         | MsqdxConnectorMenu       | migriert |
| ContextMenu           | MsqdxContextMenu         | migriert |
| InspectorPanel        | MsqdxInspectorPanel      | migriert |
| MergeDrawer           | MsqdxMergeDrawer         | migriert |
| SimpleBoardCanvas     | MsqdxSimpleBoardCanvas   | migriert |

## UI-Bausteine (PRISMORA → MSQDX)

Board-Komponenten nutzen keine PRISMORA-UI mehr, sondern ausschließlich MSQDX:

| PRISMORA UI   | MSQDX Ersatz              |
|---------------|----------------------------|
| Button        | MsqdxButton                |
| Input         | MsqdxInput                 |
| Textarea      | MsqdxTextareaField         |
| Badge         | MsqdxBadge                 |
| Avatar        | MsqdxAvatar                |
| Tabs          | MsqdxTabs                  |
| Switch        | MsqdxSwitchField            |
| Card          | MsqdxCard / MsqdxMoleculeCard |
| Modal         | MsqdxDialog                |
| UserBadge     | MsqdxUserBadge (neues Atom) |
| Stack         | Box + MSQDX_SPACING (flex/gap) |

## Token-Ersetzungen

- **Farben:** `--primary`, `hsl(var(--...))` → `MSQDX_COLORS.brand.green`, `MSQDX_BRAND_PRIMARY`, `MSQDX_NEUTRAL`, `MSQDX_STATUS`
- **Abstände:** Tailwind-Klassen → `MSQDX_SPACING` (scale, padding, gap, borderRadius)
- **Typografie:** → `MSQDX_TYPOGRAPHY` (fontSize, fontWeight, fontFamily)
- **Effekte:** Schatten, Transitions → `MSQDX_EFFECTS`

## Icons

- In Prismion-Komponenten wird **lucide-react** verwendet (Dependency in `@msqdx/react`), um die ursprünglichen PRISMORA-Icons beizubehalten.
- Optionale spätere Umstellung auf `MsqdxIcon` + `MSQDX_ICON_NAMES` möglich.

## Typen

- Alle Prismion-Domain-Typen liegen in `packages/react/src/types/prismion.ts` (z. B. `Prismion`, `Position`, `Size`, `PortSide`, `Presence`, `Connector`, `Board`, `BoardParticipant`).
- Re-Export über `@msqdx/react`.

## Abhängigkeiten zwischen Prismion-Komponenten

- **MsqdxPrismionPorts** – keine internen Prismion-Abhängigkeiten
- **MsqdxPrismionResult** – MsqdxTabs
- **MsqdxPrismionToolbar** – MsqdxButton, lucide-react
- **MsqdxConnectorEdge** – `lib/connector-utils`, MsqdxSwitchField
- **MsqdxPresenceList** – MsqdxUserBadge
- **MsqdxPresenceLayer** – MsqdxPresenceList
- **MsqdxUserToolbar** – MsqdxAvatar, MsqdxInput, MsqdxButton, MsqdxSwitchField, MsqdxDialog

## Entscheidungen

1. **UserBadge:** Neues Atom `MsqdxUserBadge` (Avatar + Ring/Status/Tooltip), Styling mit `MSQDX_AVATAR`, `MSQDX_SPACING`, `MSQDX_STATUS`.
2. **Switch:** Neues Molecule `MsqdxSwitchField` (MUI Switch + Tokens), da im MSQDX bisher kein Switch existierte.
3. **Store:** Keine Übernahme von `useBoardStore` (Zustand); Board-State von außen per Props (z. B. `presenterUserId`, `onJumpToCursor`, `onPresenterModeChange`).
4. **Connector-Utils:** `packages/react/src/lib/connector-utils.ts` enthält Port-Position, Bounds und Pfad-Logik für MsqdxConnectorEdge.

## Nächste Schritte

- Alle Board-/Prismion-Komponenten sind migriert.
- **MsqdxSimpleBoardCanvas:** Eigenes Pan/Zoom-State, Doppelklick & Plus-Button erzeugen Prismion (onPrismionCreated), ConnectorEdges, BoardToolbar.
- **MsqdxBoardCanvas:** Kontrollierter Modus (zoom, pan, onZoomChange, onPanChange), Grid/Dots-Hintergrund, Empty-State, Prismion-Karten, ConnectorEdges, optionale Teilnehmer-Cursors, BoardToolbar, UserToolbar.
- **MsqdxBoardCanvasFunctional:** Wrapper um MsqdxBoardCanvas mit internem Zoom/Pan-State (initialZoom, initialPan).
