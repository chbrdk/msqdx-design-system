/**
 * Connector path utilities for Prismion board.
 * Used by MsqdxConnectorEdge to compute port positions and SVG paths.
 */
import type { Prismion, Connection } from '../types/prismion';

const PORTS: ('top' | 'right' | 'bottom' | 'left')[] = ['top', 'right', 'bottom', 'left'];

/**
 * Chooses the port pair (fromPort, toPort) that gives the shortest straight-line
 * distance between the two cards. When the user moves cards, the connector
 * automatically uses the best ports so the line stays minimal.
 */
export function findOptimalPorts(
  fromPrismion: Prismion,
  toPrismion: Prismion
): { fromPort: 'top' | 'right' | 'bottom' | 'left'; toPort: 'top' | 'right' | 'bottom' | 'left' } {
  let bestFrom: 'top' | 'right' | 'bottom' | 'left' = 'right';
  let bestTo: 'top' | 'right' | 'bottom' | 'left' = 'left';
  let bestDist = Infinity;

  for (const fromPort of PORTS) {
    for (const toPort of PORTS) {
      const fromPos = calculatePortPosition(fromPrismion, fromPort);
      const toPos = calculatePortPosition(toPrismion, toPort);
      const dist = Math.hypot(toPos.x - fromPos.x, toPos.y - fromPos.y);
      if (dist < bestDist) {
        bestDist = dist;
        bestFrom = fromPort;
        bestTo = toPort;
      }
    }
  }
  return { fromPort: bestFrom, toPort: bestTo };
}

/**
 * Match PrismionPorts: PORT_SIZE=32, port positioned with bottom/top/left/right: -14.
 * Port center from card edge: 14 - 16 = 2 (2px inside card edge).
 */
const PORT_INSET_TOP = 2;
const PORT_INSET_RIGHT = 2;
const PORT_INSET_BOTTOM = 2;
const PORT_INSET_LEFT = 2;

export function calculatePortPosition(
  prismion: Prismion,
  port: 'top' | 'right' | 'bottom' | 'left'
): { x: number; y: number } {
  const { x, y } = prismion.position;
  const { w, h } = prismion.size;
  switch (port) {
    case 'top':
      return { x: x + w / 2, y: y + PORT_INSET_TOP };
    case 'right':
      return { x: x + w - PORT_INSET_RIGHT, y: y + h / 2 };
    case 'bottom':
      return { x: x + w / 2, y: y + h - PORT_INSET_BOTTOM };
    case 'left':
      return { x: x + PORT_INSET_LEFT, y: y + h / 2 };
  }
}

export function generateConnectionPath(
  fromPos: { x: number; y: number },
  toPos: { x: number; y: number },
  fromPort: 'top' | 'right' | 'bottom' | 'left',
  toPort: 'top' | 'right' | 'bottom' | 'left'
): string {
  const controlOffset = 50;
  let cp1x = fromPos.x, cp1y = fromPos.y, cp2x = toPos.x, cp2y = toPos.y;
  switch (fromPort) {
    case 'top': cp1y -= controlOffset; break;
    case 'right': cp1x += controlOffset; break;
    case 'bottom': cp1y += controlOffset; break;
    case 'left': cp1x -= controlOffset; break;
  }
  switch (toPort) {
    case 'top': cp2y -= controlOffset; break;
    case 'right': cp2x += controlOffset; break;
    case 'bottom': cp2y += controlOffset; break;
    case 'left': cp2x -= controlOffset; break;
  }
  return `M ${fromPos.x} ${fromPos.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${toPos.x} ${toPos.y}`;
}

export function connectionExists(
  connections: Connection[],
  fromPrismionId: string,
  toPrismionId: string
): boolean {
  return connections.some(
    (conn) =>
      (conn.fromPrismionId === fromPrismionId && conn.toPrismionId === toPrismionId) ||
      (conn.fromPrismionId === toPrismionId && conn.toPrismionId === fromPrismionId)
  );
}

export interface Point {
  x: number;
  y: number;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

export function findPathAvoidingObstacles(
  from: Point,
  to: Point,
  _obstacles: Obstacle[],
  _excludeIds: string[],
  _fromPort: 'top' | 'right' | 'bottom' | 'left',
  _toPort: 'top' | 'right' | 'bottom' | 'left'
): Point[] {
  return [from, to];
}

/** Padding around path for SVG bounds so path and markers are fully visible. */
const CONNECTOR_BOUNDS_PADDING = 16;

export function getConnectorBounds(
  from: Point,
  to: Point,
  _path?: Point[]
): { x: number; y: number; width: number; height: number } {
  const p = CONNECTOR_BOUNDS_PADDING;
  const minX = Math.min(from.x, to.x) - p;
  const minY = Math.min(from.y, to.y) - p;
  const maxX = Math.max(from.x, to.x) + p;
  const maxY = Math.max(from.y, to.y) + p;
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
