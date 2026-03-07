/**
 * Sync prismions and connections from React state into a maxGraph Graph.
 * Full replace: clear default parent children, then add vertices and edges from props.
 */
import { ConnectionConstraint, Point, type Graph } from '@maxgraph/core';
import type { PrismionShape, ConnectionShape, PortSide } from './types';

const PORT_RELATIVE: Record<PortSide, { x: number; y: number }> = {
  top: { x: 0.5, y: 0 },
  right: { x: 1, y: 0.5 },
  bottom: { x: 0.5, y: 1 },
  left: { x: 0, y: 0.5 },
};

function makeConnectionConstraint(port: PortSide): ConnectionConstraint {
  const rel = PORT_RELATIVE[port];
  return new ConnectionConstraint(new Point(rel.x, rel.y), true);
}

export function syncPrismionsAndConnectionsToGraph(
  graph: Graph,
  prismions: PrismionShape[],
  connections: ConnectionShape[]
): void {
  const parent = graph.getDefaultParent();
  const model = graph.getDataModel();

  model.beginUpdate();
  try {
    const children = graph.getChildCells(parent);
    if (children.length > 0) {
      graph.removeCells(children);
    }

    const vertexMap = new Map<string, ReturnType<Graph['insertVertex']>>();

    for (const p of prismions) {
      const label =
        p.title ||
        (p.prompt ? String(p.prompt).slice(0, 40) + (p.prompt.length > 40 ? '…' : '') : p.id);
      const isTool = p.kind === 'tool';
      const style: Record<string, unknown> = {
        fillColor: '#f5f5f5',
        strokeColor: '#666',
        rounded: true,
      };
      if (isTool) {
        style.shape = 'ellipse';
        style.fillColor = '#e3f2fd';
      }

      const v = graph.insertVertex({
        id: p.id,
        parent,
        position: [p.position.x, p.position.y],
        size: [p.size.w, p.size.h],
        value: label,
        style,
      });
      vertexMap.set(p.id, v);
    }

    for (const c of connections) {
      const sourceCell = vertexMap.get(c.fromPrismionId);
      const targetCell = vertexMap.get(c.toPrismionId);
      if (!sourceCell || !targetCell) continue;

      const fromPort = (c.fromPort ?? 'right') as PortSide;
      const toPort = (c.toPort ?? 'left') as PortSide;

      const edge = graph.insertEdge({
        id: c.id,
        parent,
        source: sourceCell,
        target: targetCell,
        value: c.label ?? '',
        style: {
          edgeStyle: 'orthogonalEdgeStyle',
          rounded: true,
          strokeWidth: c.strokeWidth ?? 2,
          endArrow: (c.direction ?? 'forward') === 'forward' ? 'classic' : 'none',
          startArrow: c.direction === 'backward' ? 'classic' : 'none',
        },
      });
      if (edge) {
        graph.setConnectionConstraint(edge, sourceCell, true, makeConnectionConstraint(fromPort));
        graph.setConnectionConstraint(edge, targetCell, false, makeConnectionConstraint(toPort));
      }
    }
  } finally {
    model.endUpdate();
  }
}
