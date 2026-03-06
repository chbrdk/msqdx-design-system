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

## Port-Position

Die Connector-Endpunkte werden ausschließlich **state-basiert** mit `calculatePortPosition(prismion, port)` aus `lib/connector-utils.ts` berechnet (aus `prismion.position` und `prismion.size`). Keine DOM-Abfrage; dadurch bleibt die Berechnung stabil und konsistent mit dem gerenderten Layout, solange ResizeObserver und Move die State-Größe/-Position aktuell halten.

## Zoom / Darstellung

- **SVG:** Connector-SVG hat `preserveAspectRatio="none"`, damit die ViewBox exakt auf das Element abgebildet wird (kein „meet“-Zentrieren). Bei Zoom gerundete Viewport-Größen können sonst zu sichtbarer Verschiebung der Linie führen (Pfeil „fehlplatziert“).
- **Strichstärke:** `vectorEffect="non-scaling-stroke"` an allen Connector-Pfaden, damit die Linienstärke beim Zoomen konstant bleibt.

## Relevante Dateien

- `lib/connector-utils.ts`: `computeOrthogonalPath`, `getConnectorBounds`, `CONNECTOR_BOUNDS_PADDING`
- `components/prismion/ConnectorEdge/MsqdxConnectorEdge.tsx`: Pfad aus waypoints oder compute; Handles + Drag; `onWaypointsChange`, `clientToBoard`
- `components/prismion/BoardCanvas/MsqdxBoardCanvas.tsx`: `connectionToConnector` mit waypoints; `onConnectorWaypointsChange`, `clientToCanvas` an Edge

## Persistenz (z. B. PLEXON)

- Beim Speichern/Laden des Board-States werden `waypoints` pro Connection mit persistiert.
- Neue Connections werden ohne waypoints angelegt; die erste Darstellung nutzt `computeOrthogonalPath`.
