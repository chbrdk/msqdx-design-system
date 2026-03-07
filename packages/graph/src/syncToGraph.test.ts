import { describe, it, expect, beforeEach } from 'vitest';
import { Graph } from '@maxgraph/core';
import '@maxgraph/core/css/common.css';
import { syncPrismionsAndConnectionsToGraph } from './syncToGraph';
import type { PrismionShape, ConnectionShape } from './types';

describe('syncPrismionsAndConnectionsToGraph', () => {
  let container: HTMLDivElement;
  let graph: Graph;

  beforeEach(() => {
    container = document.createElement('div');
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);
    graph = new Graph(container);
  });

  it('adds vertices for each prismion', () => {
    const prismions: PrismionShape[] = [
      {
        id: 'p1',
        position: { x: 10, y: 20 },
        size: { w: 100, h: 50 },
        title: 'Card 1',
      },
      {
        id: 'p2',
        position: { x: 200, y: 100 },
        size: { w: 120, h: 60 },
        title: 'Card 2',
      },
    ];
    syncPrismionsAndConnectionsToGraph(graph, prismions, []);
    const parent = graph.getDefaultParent();
    const vertices = graph.getChildVertices(parent);
    expect(vertices).toHaveLength(2);
    expect(vertices.map((c) => c.getId())).toEqual(['p1', 'p2']);
  });

  it('adds edges for each connection when both endpoints exist', () => {
    const prismions: PrismionShape[] = [
      { id: 'a', position: { x: 0, y: 0 }, size: { w: 80, h: 40 }, title: 'A' },
      { id: 'b', position: { x: 150, y: 0 }, size: { w: 80, h: 40 }, title: 'B' },
    ];
    const connections: ConnectionShape[] = [
      { id: 'e1', fromPrismionId: 'a', toPrismionId: 'b', fromPort: 'right', toPort: 'left' },
    ];
    syncPrismionsAndConnectionsToGraph(graph, prismions, connections);
    const parent = graph.getDefaultParent();
    const edges = graph.getChildEdges(parent);
    expect(edges).toHaveLength(1);
    expect(edges[0]!.getId()).toBe('e1');
  });

  it('replaces content on second sync (full replace)', () => {
    syncPrismionsAndConnectionsToGraph(graph, [
      { id: 'old', position: { x: 0, y: 0 }, size: { w: 50, h: 50 }, title: 'Old' },
    ], []);
    const parent = graph.getDefaultParent();
    expect(graph.getChildVertices(parent)).toHaveLength(1);

    syncPrismionsAndConnectionsToGraph(graph, [
      { id: 'new', position: { x: 10, y: 10 }, size: { w: 60, h: 60 }, title: 'New' },
    ], []);
    const vertices = graph.getChildVertices(parent);
    expect(vertices).toHaveLength(1);
    expect(vertices[0]!.getId()).toBe('new');
  });
});
