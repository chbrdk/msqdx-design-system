# Connector: Orthogonales Routing und Wegpunkte (Miro-Style)

## Übersicht

Connector-Linien zwischen Prismion-Cards nutzen **orthogonale Pfade** (nur horizontale und vertikale Segmente, 90°-Ecken) und optional **editierbare Wegpunkte**.

## Datenmodell

- **Connection** (und **Connector**): Optionales Feld `waypoints?: { x: number; y: number }[]` in Board-Koordinaten.
- **Semantik:** Pfad = Start-Port → waypoints[0] → … → End-Port. Wenn `waypoints` fehlt oder leer ist, wird der Pfad automatisch orthogonal berechnet.

## Orthogonales Routing

- **`computeOrthogonalPath(fromPos, toPos, fromPort, toPort)`** (in `lib/connector-utils.ts`) liefert `[fromPos, corner1, corner2, toPos]` mit 2–4 Punkten.
- Erster Abschnitt verlässt den Port in dessen Richtung (z. B. bei Port „right“ zuerst horizontal nach rechts), dann vertikal/horizontal bis zum Ziel-Port.
- **`getConnectorBounds(path, padding)`** berechnet die Bounding-Box über alle Pfadpunkte inkl. Padding (für SVG-Viewport).

## Wegpunkt-Handles

- **Anzeige:** Nur wenn der Connector „selektiert“ ist (eine der verbundenen Cards ist in `selectedPrismionIds`) und `onWaypointsChange` sowie `clientToBoard` übergeben werden.
- **Handles:** Kleine Kreise an jedem inneren Pfadpunkt (path[1] … path[path.length-2]); Position in Board-Koordinaten.
- **Drag:** Beim Ziehen eines Handles bleibt der Pfad orthogonal (constrainWaypoint: Punkt wird auf die nächstliegende gültige Linie gesnappt). Beim Pointer-Up wird `onWaypointsChange(connectorId, waypoints)` mit den neuen Wegpunkten (ohne Start/Ende) aufgerufen.

## Port-Position (draw.io / mxGraph)

Die Connector-Endpunkte werden nach dem **draw.io/mxGraph**-Vorbild berechnet: Port-Positionen sind **relative Koordinaten** (0–1) auf den Card-Bounds, die absolute Position ist `bounds.x + bounds.width * relX`, `bounds.y + bounds.height * relY`. Keine Pixel-Offsets, keine DOM-Abfrage; Bounds aus dem State sind die einzige Quelle (wie bei mxGeometry + mxConnectionConstraint).

- **`getConnectionPoint(bounds, port)`** in `lib/connector-utils.ts`: Liefert den absoluten Punkt für einen Port aus Bounds; Port-Mapping: top=(0.5,0), right=(1,0.5), bottom=(0.5,1), left=(0,0.5).
- **`calculatePortPosition(prismion, port)`**: Ruft `getConnectionPoint` mit `{ x, y, w, h }` aus `prismion.position` und `prismion.size` auf.
- Referenzen: [mxConnectionConstraint](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxConnectionConstraint-js.html), [mxGraphView.getFixedTerminalPoint](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraphView-js.html).

**Bounds = einzige Quelle:** Die Card-Wrapper-Box im BoardCanvas hat feste `width` und `height` aus `prismion.size`, damit die gerenderte Box exakt den Modell-Bounds entspricht.

**Debug:** In der Browser-Konsole `window.__CONNECTOR_DEBUG__ = true` setzen – dann loggt jede Connector-Edge nur bei **Änderung** von Position/Size/Port/fromPos/toPos (kein Log bei jedem Re-Render). Re-Renders alle paar Sekunden ohne Nutzeraktion kommen ggf. von der Parent-App (z. B. Session-/Heartbeat-Polling).

## Zoom / Darstellung

- **SVG:** Connector-SVG hat `preserveAspectRatio="none"`, damit die ViewBox exakt auf das Element abgebildet wird (kein „meet“-Zentrieren). Bei Zoom gerundete Viewport-Größen können sonst zu sichtbarer Verschiebung der Linie führen (Pfeil „fehlplatziert“).
- **Strichstärke:** `vectorEffect="non-scaling-stroke"` an allen Connector-Pfaden, damit die Linienstärke beim Zoomen konstant bleibt.

## Relevante Dateien

- `lib/connector-utils.ts`: `getConnectionPoint`, `calculatePortPosition`, `computeOrthogonalPath`, `getConnectorBounds`, `CONNECTOR_BOUNDS_PADDING`
- `components/prismion/ConnectorEdge/MsqdxConnectorEdge.tsx`: Pfad aus waypoints oder compute; Handles + Drag; `onWaypointsChange`, `clientToBoard`
- `components/prismion/BoardCanvas/MsqdxBoardCanvas.tsx`: `connectionToConnector` mit waypoints; `onConnectorWaypointsChange`, `clientToCanvas` an Edge

## Persistenz (z. B. PLEXON)

- Beim Speichern/Laden des Board-States werden `waypoints` pro Connection mit persistiert.
- Neue Connections werden ohne waypoints angelegt; die erste Darstellung nutzt `computeOrthogonalPath`.
