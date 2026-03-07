/**
 * Minimal Prismion/Connection shapes for @msqdx/graph.
 * Structurally compatible with @msqdx/react Prismion/Connection so the host can pass them directly.
 */
export type PortSide = 'top' | 'right' | 'bottom' | 'left';

export interface PrismionShape {
  id: string;
  position: { x: number; y: number; zIndex?: number };
  size: { w: number; h: number; minW?: number; minH?: number };
  title: string;
  prompt?: string;
  kind?: string;
}

export interface ConnectionShape {
  id: string;
  fromPrismionId: string;
  toPrismionId: string;
  fromPort?: PortSide;
  toPort?: PortSide;
  direction?: 'forward' | 'backward';
  label?: string;
  strokeWidth?: number;
  waypoints?: { x: number; y: number }[];
}
