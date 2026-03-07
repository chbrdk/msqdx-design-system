'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { Graph, InternalEvent } from '@maxgraph/core';
import '@maxgraph/core/css/common.css';
import { syncPrismionsAndConnectionsToGraph } from './syncToGraph';
import type { PrismionShape, ConnectionShape } from './types';

/** Serialize graph-relevant data so we only sync when something actually changed (avoids re-sync on every parent re-render). */
function getGraphDataSig(prismions: PrismionShape[], connections: ConnectionShape[]): string {
  const p = prismions
    .map((r) => `${r.id},${r.position.x},${r.position.y},${r.size.w},${r.size.h}`)
    .join('|');
  const c = connections
    .map((e) => `${e.id},${e.fromPrismionId},${e.toPrismionId}`)
    .join('|');
  return `${p}::${c}`;
}

export type PortSide = 'top' | 'right' | 'bottom' | 'left';

export interface MaxGraphBoardProps {
  prismions: PrismionShape[];
  connections: ConnectionShape[];
  selectedPrismionIds?: string[];
  onSelectPrismion?: (id: string | null) => void;
  onPrismionMove?: (id: string, position: { x: number; y: number }) => void;
  onPrismionResize?: (id: string, size: { w: number; h: number }) => void;
  onPrismionDelete?: (id: string) => void;
  onConnectorDelete?: (connectorId: string) => void;
  onDoubleClickCell?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function MaxGraphBoard({
  prismions,
  connections,
  selectedPrismionIds = [],
  onSelectPrismion,
  onPrismionMove,
  onPrismionResize,
  onPrismionDelete,
  onConnectorDelete,
  onDoubleClickCell,
  className,
  style = { width: '100%', height: '100%' },
}: MaxGraphBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);
  const initialFitDoneRef = useRef(false);
  const lastSyncSigRef = useRef<string>('');
  /** Skip the next sync when we just pushed a move/resize from the graph – the graph already has the right state, and React state may not have committed yet. */
  const skipNextSyncRef = useRef(false);

  const syncToGraph = useCallback(() => {
    const graph = graphRef.current;
    if (!graph) return;
    const sig = getGraphDataSig(prismions, connections);
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      lastSyncSigRef.current = sig;
      return;
    }
    if (lastSyncSigRef.current === sig) return;
    lastSyncSigRef.current = sig;
    syncPrismionsAndConnectionsToGraph(graph, prismions, connections);
    // Fit and center once after first sync so all cells are visible
    if (!initialFitDoneRef.current) {
      initialFitDoneRef.current = true;
      const fitPlugin = (graph as { getPlugin?(id: string): { fitCenter?(opts?: unknown): number } | undefined }).getPlugin?.('fit');
      if (fitPlugin?.fitCenter) {
        requestAnimationFrame(() => {
          fitPlugin.fitCenter?.({ minScale: 0.1, maxScale: 2 });
        });
      }
    }
  }, [prismions, connections]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    InternalEvent.disableContextMenu(container);
    const graph = new Graph(container);
    graphRef.current = graph;

    graph.setPanning(true);
    graph.setCellsMovable(true);
    graph.setCellsResizable(true);
    graph.setCellsSelectable(true);
    graph.setCellsDeletable(true);

    graph.addListener(InternalEvent.CELLS_MOVED, (_sender: unknown, evt: { getProperty: (k: string) => unknown }) => {
      const cells = evt.getProperty('cells') as Array<{ getId: () => string; getGeometry: () => { x: number; y: number; width: number; height: number } | null; isEdge: () => boolean }>;
      if (!cells || !onPrismionMove) return;
      skipNextSyncRef.current = true;
      for (const cell of cells) {
        if (cell.isEdge?.()) continue;
        const geo = cell.getGeometry?.();
        if (geo) {
          const id = cell.getId?.();
          if (id) onPrismionMove(id, { x: geo.x, y: geo.y });
        }
      }
    });

    graph.addListener(InternalEvent.CELLS_RESIZED, (_sender: unknown, evt: { getProperty: (k: string) => unknown }) => {
      const cells = evt.getProperty('cells') as Array<{ getId: () => string; getGeometry: () => { width: number; height: number } | null; isEdge: () => boolean }>;
      if (!cells || !onPrismionResize) return;
      skipNextSyncRef.current = true;
      for (const cell of cells) {
        if (cell.isEdge?.()) continue;
        const geo = cell.getGeometry?.();
        if (geo && geo.width != null && geo.height != null) {
          const id = cell.getId?.();
          if (id) onPrismionResize(id, { w: geo.width, h: geo.height });
        }
      }
    });

    graph.addListener(InternalEvent.CELLS_REMOVED, (_sender: unknown, evt: { getProperty: (k: string) => unknown }) => {
      const cells = evt.getProperty('cells') as Array<{ getId: () => string; isEdge: () => boolean }>;
      if (!cells) return;
      for (const cell of cells) {
        const id = cell.getId?.();
        if (!id) continue;
        if (cell.isEdge?.()) {
          onConnectorDelete?.(id);
        } else {
          onPrismionDelete?.(id);
        }
      }
    });

    graph.addListener(InternalEvent.CLICK, (_sender: unknown, evt: { getProperty: (k: string) => unknown }) => {
      const cell = evt.getProperty('cell') as { getId: () => string } | null;
      if (onSelectPrismion) {
        onSelectPrismion(cell ? cell.getId?.() ?? null : null);
      }
    });

    graph.addListener(InternalEvent.DOUBLE_CLICK, (_sender: unknown, evt: { getProperty: (k: string) => unknown }) => {
      const cell = evt.getProperty('cell') as { getId: () => string } | null;
      if (cell && onDoubleClickCell) {
        const id = cell.getId?.();
        if (id) onDoubleClickCell(id);
      }
    });

    syncPrismionsAndConnectionsToGraph(graph, prismions, connections);

    return () => {
      graph.destroy();
      graphRef.current = null;
    };
  }, []);

  useEffect(() => {
    syncToGraph();
  }, [syncToGraph]);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    if (selectedPrismionIds.length === 0) {
      graph.clearSelection();
      return;
    }
    const model = graph.getDataModel();
    const parent = graph.getDefaultParent();
    const toSelect: import('@maxgraph/core').Cell[] = [];
    for (const id of selectedPrismionIds) {
      const cell = model.getCell(id);
      if (cell && cell.getParent?.() === parent) toSelect.push(cell);
    }
    graph.setSelectionCells(toSelect);
  }, [selectedPrismionIds]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        minHeight: 300,
        position: 'relative',
        ...style,
      }}
    />
  );
}
