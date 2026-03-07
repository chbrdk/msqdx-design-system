# maxGraph Board (Variant 1 – Full Canvas)

## Overview

The **maxGraph-based board** is implemented as Variant 1 of the diagramming plan: maxGraph is the only canvas for the board. Vertices = Cards, Edges = Connections. No separate React rendering of cards/connectors; zoom, pan, ports, and edge routing are handled by maxGraph.

## Package

- **`@msqdx/graph`** (`packages/graph`): Depends on `@maxgraph/core`. Exports:
  - `MaxGraphBoard` – React component that mounts a maxGraph `Graph` in a div, syncs `prismions`/`connections` from props, and reports move/resize/delete/select via callbacks.
  - `syncPrismionsAndConnectionsToGraph` – adapter that does a full replace of the default parent’s children from the given prismions and connections.
  - Types: `PrismionShape`, `ConnectionShape`, `PortSide`, `MaxGraphBoardProps`.

## Re-export from @msqdx/react

For a single design-system entry point, `@msqdx/react` re-exports:

- `MaxGraphBoard`, `MaxGraphBoardProps`, `MaxGraphPortSide`, `PrismionShape`, `ConnectionShape`

So apps (e.g. PLEXON) can use `import { MaxGraphBoard, type PrismionShape, type ConnectionShape } from '@msqdx/react'`. Prismion/Connection from the react package are structurally compatible with PrismionShape/ConnectionShape; a cast may be needed for strict typing.

## Sync and events

- **React → maxGraph:** On mount and when `prismions` or `connections` change, the adapter clears the default parent and re-inserts vertices and edges. Vertices use `id`, `position`, `size`, `title`/`prompt`, `kind` (tool cards as ellipse). Edges use orthogonal style, rounded, with port constraints (top/right/bottom/left).
- **maxGraph → React:** Listeners on `CELLS_MOVED`, `CELLS_RESIZED`, `CELLS_REMOVED`, `CLICK`, `DOUBLE_CLICK` call `onPrismionMove`, `onPrismionResize`, `onPrismionDelete`, `onConnectorDelete`, `onSelectPrismion`, `onDoubleClickCell`.

## PLEXON integration

- Board page uses `MaxGraphBoard` instead of `MsqdxBoardCanvasFunctional`.
- A **selection panel** (right-hand side) shows when a single card is selected: prompt input + submit for prompt cards, and results list. Delete/Backspace is handled in the board page (window keydown); state update triggers sync and removed cells disappear from the graph.
- **DS_BASE:** For Next.js build, set `DS_BASE` so that `@msqdx/react` and `@msqdx/tokens` resolve to the design system (e.g. `DS_BASE="../MSQDX-DS/msqdx-design-system"` when building from PLEXON).
- PLEXON needs `@maxgraph/core` in dependencies so that the graph package’s CSS import (`@maxgraph/core/css/common.css`) resolves.

## Legacy components

The previous canvas and card components (`MsqdxBoardCanvas`, `MsqdxBoardCanvasFunctional`, `MsqdxPrismionCard`, etc.) remain in the repo for Storybook and other apps; only the PLEXON board page was switched to the maxGraph board.
