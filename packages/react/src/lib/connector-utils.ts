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
 * Must match PrismionPorts: PORT_SIZE=32, port positioned with top/right/bottom/left: -14.
 * Port center from card edge = 14 - PORT_SIZE/2 = 14 - 16 = -2 (2px inside card).
 * We use these so connector lines meet the visible port circle center.
 */
const PORT_SIZE = 32;
const PORT_OFFSET_FROM_EDGE = 14; // PrismionPorts use right: -14 etc.
/** Port circle center offset from card edge (2px inside). */
export const PORT_CENTER_INSET = PORT_OFFSET_FROM_EDGE - PORT_SIZE / 2;

export function calculatePortPosition(
  prismion: Prismion,
  port: 'top' | 'right' | 'bottom' | 'left'
): { x: number; y: number } {
  const { x, y } = prismion.position;
  const { w, h } = prismion.size;
  let px: number;
  let py: number;
  switch (port) {
    case 'top':
      px = x + w / 2;
      py = y + PORT_CENTER_INSET;
      break;
    case 'right':
      px = x + w - PORT_CENTER_INSET;
      py = y + h / 2;
      break;
    case 'bottom':
      px = x + w / 2;
      py = y + h - PORT_CENTER_INSET;
      break;
    case 'left':
      px = x + PORT_CENTER_INSET;
      py = y + h / 2;
      break;
  }
  return { x: Math.round(px), y: Math.round(py) };
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

/** Minimum distance from port before first bend (orthogonal path). */
const MIN_SEGMENT = 12;

/**
 * Computes an orthogonal path (only horizontal/vertical segments) between two port positions.
 * Returns [fromPos, corner1, corner2?, toPos] with 2–4 points. Used when no waypoints are stored.
 */
export function computeOrthogonalPath(
  fromPos: Point,
  toPos: Point,
  fromPort: 'top' | 'right' | 'bottom' | 'left',
  _toPort: 'top' | 'right' | 'bottom' | 'left'
): Point[] {
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;
  const c1: Point = { x: fromPos.x, y: fromPos.y };
  const c2: Point = { x: toPos.x, y: toPos.y };

  switch (fromPort) {
    case 'right':
      c1.x = fromPos.x + Math.max(MIN_SEGMENT, Math.abs(dx) / 2);
      c1.y = fromPos.y;
      c2.x = c1.x;
      c2.y = toPos.y;
      break;
    case 'left':
      c1.x = fromPos.x - Math.max(MIN_SEGMENT, Math.abs(dx) / 2);
      c1.y = fromPos.y;
      c2.x = c1.x;
      c2.y = toPos.y;
      break;
    case 'top':
      c1.x = fromPos.x;
      c1.y = fromPos.y - Math.max(MIN_SEGMENT, Math.abs(dy) / 2);
      c2.x = toPos.x;
      c2.y = c1.y;
      break;
    case 'bottom':
      c1.x = fromPos.x;
      c1.y = fromPos.y + Math.max(MIN_SEGMENT, Math.abs(dy) / 2);
      c2.x = toPos.x;
      c2.y = c1.y;
      break;
  }

  return [fromPos, c1, c2, toPos];
}

export function findPathAvoidingObstacles(
  from: Point,
  to: Point,
  _obstacles: Obstacle[],
  _excludeIds: string[],
  fromPort: 'top' | 'right' | 'bottom' | 'left',
  toPort: 'top' | 'right' | 'bottom' | 'left'
): Point[] {
  return computeOrthogonalPath(from, to, fromPort, toPort);
}

/** Padding around path for SVG bounds so path and markers are fully visible. */
export const CONNECTOR_BOUNDS_PADDING = 16;

export function getConnectorBounds(
  path: Point[],
  padding: number = CONNECTOR_BOUNDS_PADDING
): { x: number; y: number; width: number; height: number } {
  if (path.length === 0) {
    return { x: 0, y: 0, width: padding * 2, height: padding * 2 };
  }
  let minX = path[0].x;
  let maxX = path[0].x;
  let minY = path[0].y;
  let maxY = path[0].y;
  for (let i = 1; i < path.length; i++) {
    minX = Math.min(minX, path[i].x);
    maxX = Math.max(maxX, path[i].x);
    minY = Math.min(minY, path[i].y);
    maxY = Math.max(maxY, path[i].y);
  }
  return {
    x: minX - padding,
    y: minY - padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
  };
}
