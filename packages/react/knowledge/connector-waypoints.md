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

## Port-Position aus DOM

Damit die Connector-Linie exakt am sichtbaren Card-Rand anliegt (kein Verschieben bei Zoom/Resize), werden die Port-Endpunkte optional aus dem **DOM** ermittelt:

- **BoardCanvas** implementiert `getPortPositionFromDOM(prismionId, port)`: sucht das Element mit `[data-prismion-id="…"]`, liest `getBoundingClientRect()`, berechnet die Port-Mitte je nach Seite (oben = `x: width/2, y: 0`; rechts = `x: width, y: height/2`; unten = `x: width/2, y: height`; links = `x: 0, y: height/2`), rechnet mit `clientToCanvas` in Board-Koordinaten um und rundet.
- **MsqdxConnectorEdge** erhält optional `getPortPositionFromDOM`. Wenn gesetzt, werden `fromPos` und `toPos` zuerst aus dem DOM geholt; falls `null` (Element nicht gefunden), Fallback auf `calculatePortPosition(prismion, port)` (State-basiert).
- Die temporäre Drag-Linie (neue Connection vom Port) nutzt ebenfalls `getPortPositionFromDOM` für den Startpunkt, damit sie am Port ausgerichtet bleibt.

## Zoom / Darstellung

- **SVG:** Connector-SVG hat `preserveAspectRatio="none"`, damit die ViewBox exakt auf das Element abgebildet wird (kein „meet“-Zentrieren). Bei Zoom gerundete Viewport-Größen können sonst zu sichtbarer Verschiebung der Linie führen (Pfeil „fehlplatziert“).
- **Strichstärke:** `vectorEffect="non-scaling-stroke"` an allen Connector-Pfaden, damit die Linienstärke beim Zoomen konstant bleibt.

## Relevante Dateien

- `lib/connector-utils.ts`: `computeOrthogonalPath`, `getConnectorBounds`, `CONNECTOR_BOUNDS_PADDING`
- `components/prismion/ConnectorEdge/MsqdxConnectorEdge.tsx`: Pfad aus waypoints oder compute; Handles + Drag; `onWaypointsChange`, `clientToBoard`
- `components/prismion/BoardCanvas/MsqdxBoardCanvas.tsx`: `connectionToConnector` mit waypoints; `getPortPositionFromDOM`, `onConnectorWaypointsChange`, `clientToCanvas` an Edge

## Persistenz (z. B. PLEXON)

- Beim Speichern/Laden des Board-States werden `waypoints` pro Connection mit persistiert.
- Neue Connections werden ohne waypoints angelegt; die erste Darstellung nutzt `computeOrthogonalPath`.
