# Connector: Kürzester Weg und optimale Ports

## Verhalten

Die Linien zwischen Prismion-Cards wählen automatisch das **Port-Paar mit dem kürzesten Abstand**:

- **`findOptimalPorts(fromPrismion, toPrismion)`** (in `lib/connector-utils.ts`) testet alle 4×4 Kombinationen (top/right/bottom/left pro Karte) und wählt das Paar, bei dem die euklidische Distanz zwischen den Port-Zentren minimal ist.
- **MsqdxConnectorEdge** verwendet für die **Darstellung** immer diese optimalen Ports (`effectiveFromPort`, `effectiveToPort`), nicht die gespeicherten `connector.from.port` / `connector.to.port`. Beim Verschieben der Cards wechseln die Ports dadurch automatisch, sodass die Linie immer den kürzesten Weg nimmt.

## Relevante Dateien

- `packages/react/src/lib/connector-utils.ts`: `findOptimalPorts`, `calculatePortPosition`
- `packages/react/src/components/prismion/ConnectorEdge/MsqdxConnectorEdge.tsx`: Aufruf von `findOptimalPorts` und Nutzung für Pfad und Bounds

## Erweiterung

`findPathAvoidingObstacles` kann später um Hindernis-Umfahrung erweitert werden; aktuell liefert es eine Gerade zwischen den optimalen Port-Positionen.
