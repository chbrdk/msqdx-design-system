/**
 * Connector path utilities for Prismion board.
 * Used by MsqdxConnectorEdge to compute port positions and SVG paths.
 */
import type { Prismion, Connection } from '../types/prismion';

export function findOptimalPorts(
  fromPrismion: Prismion,
  toPrismion: Prismion
): { fromPort: 'top' | 'right' | 'bottom' | 'left'; toPort: 'top' | 'right' | 'bottom' | 'left' } {
  const fromCenter = {
    x: fromPrismion.position.x + fromPrismion.size.w / 2,
    y: fromPrismion.position.y + fromPrismion.size.h / 2,
  };
  const toCenter = {
    x: toPrismion.position.x + toPrismion.size.w / 2,
    y: toPrismion.position.y + toPrismion.size.h / 2,
  };
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  let fromPort: 'top' | 'right' | 'bottom' | 'left';
  let toPort: 'top' | 'right' | 'bottom' | 'left';

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      fromPort = 'right';
      toPort = 'left';
    } else {
      fromPort = 'left';
      toPort = 'right';
    }
  } else {
    if (dy > 0) {
      fromPort = 'bottom';
      toPort = 'top';
    } else {
      fromPort = 'top';
      toPort = 'bottom';
    }
  }
  return { fromPort, toPort };
}

/** Offset so the connector line meets the visible port circle (PrismionPorts: 32px button, -14px outside edge). */
const PORT_CENTER_INSET = 2;

export function calculatePortPosition(
  prismion: Prismion,
  port: 'top' | 'right' | 'bottom' | 'left'
): { x: number; y: number } {
  const { x, y } = prismion.position;
  const { w, h } = prismion.size;
  switch (port) {
    case 'top':
      return { x: x + w / 2, y: y + PORT_CENTER_INSET };
    case 'right':
      return { x: x + w - PORT_CENTER_INSET, y: y + h / 2 };
    case 'bottom':
      return { x: x + w / 2, y: y + h - PORT_CENTER_INSET };
    case 'left':
      return { x: x + PORT_CENTER_INSET, y: y + h / 2 };
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

export function getConnectorBounds(
  from: Point,
  to: Point,
  _path?: Point[]
): { x: number; y: number; width: number; height: number } {
  const minX = Math.min(from.x, to.x) - 10;
  const minY = Math.min(from.y, to.y) - 10;
  const maxX = Math.max(from.x, to.x) + 10;
  const maxY = Math.max(from.y, to.y) + 10;
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
