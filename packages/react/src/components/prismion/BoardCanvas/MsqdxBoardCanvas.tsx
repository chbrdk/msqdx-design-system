"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Sparkles } from "lucide-react";
import type { Board, Prismion, Connection, BoardParticipant, Connector } from "../../../types/prismion";
import { getCanvasSettings, CANVAS_ZOOM, wouldOverlap } from "../../../lib/board-utils";
import { calculatePortPosition } from "../../../lib/connector-utils";
import { MsqdxPrismionCard } from "../PrismionCard";
import type { PrismionResultItem } from "../PrismionResult";
import { MsqdxConnectorEdge } from "../ConnectorEdge";
import { MsqdxBoardToolbar } from "../BoardToolbar";
import { MsqdxUserToolbar } from "../UserToolbar";
import { MSQDX_SPACING, MSQDX_NEUTRAL, MSQDX_TYPOGRAPHY, MSQDX_BRAND_COLOR_CSS, MSQDX_BRAND_PRIMARY } from "@msqdx/tokens";

function connectionToConnector(c: Connection): Connector & { direction?: "forward" | "backward" } {
  return {
    id: c.id,
    boardId: c.boardId,
    from: {
      prismionId: c.fromPrismionId,
      port: (c.fromPort as "top" | "right" | "bottom" | "left") || "right",
    },
    to: {
      prismionId: c.toPrismionId,
      port: (c.toPort as "top" | "right" | "bottom" | "left") || "left",
    },
    waypoints: c.waypoints ?? undefined,
    createdBy: "user",
    createdAt: c.createdAt ?? new Date().toISOString(),
    direction: c.direction,
  };
}

function prismionsToRecord(prismions: Prismion[]): Record<string, Prismion> {
  const out: Record<string, Prismion> = {};
  prismions.forEach((p) => (out[p.id] = p));
  return out;
}

export interface MsqdxBoardCanvasProps {
  board: Board;
  prismions: Prismion[];
  connections: Connection[];
  participants?: BoardParticipant[];
  zoom: number;
  pan: { x: number; y: number };
  onZoomChange: (zoom: number) => void;
  onPanChange: (pan: { x: number; y: number }) => void;
  selectedPrismionId?: string | null;
  onSelectPrismion?: (id: string | null) => void;
  onDoubleClickCanvas?: (canvasPoint: { x: number; y: number }) => void;
  onPrismionMove?: (id: string, position: { x: number; y: number }) => void;
  onPrismionPromptSubmit?: (id: string, prompt: string) => void;
  onPrismionConnectorCreate?: (fromId: string, port: "top" | "right" | "bottom" | "left", type: "prompt" | "file" | "image" | "video" | "link") => void;
  onPrismionLockToggle?: (id: string) => void;
  onPrismionDelete?: (id: string) => void;
  onPrismionResize?: (id: string, size: { w: number; h: number }) => void;
  onConnectorDirectionChange?: (connectorId: string, direction: "forward" | "backward") => void;
  onConnectorDelete?: (connectorId: string) => void;
  /** Called when user drags from a port and drops on another card's port. Creates a new connection. */
  onConnectorDrop?: (fromPrismionId: string, fromPort: "top" | "right" | "bottom" | "left", toPrismionId: string, toPort: "top" | "right" | "bottom" | "left") => void;
  /** Called when user drags a connector waypoint handle. Waypoints are in board coordinates (excluding start/end). */
  onConnectorWaypointsChange?: (connectorId: string, waypoints: { x: number; y: number }[]) => void;
  /** When true, drag on empty canvas draws a selection rectangle; on release, cards and connections in the rect are reported. */
  marqueeSelectMode?: boolean;
  /** Called when marquee mode should be turned off (e.g. after a marquee selection is done). */
  onMarqueeSelectModeChange?: (active: boolean) => void;
  /** Called when user finishes drawing a marquee with the list of card ids and connection ids inside the rectangle. */
  onMarqueeSelect?: (cardIds: string[], connectionIds: string[]) => void;
  /** Multi-select: when provided, cards (and connectors between them) with these ids are shown as selected. */
  selectedPrismionIds?: string[];
  showToolbars?: boolean;
  /** When false, hides the user toolbar (avatar, Presenter, Follow me). @default true when showToolbars is true */
  showUserToolbar?: boolean;
  /** Optional results per prismion id (e.g. AI response items for result cards). */
  prismionResults?: Record<string, PrismionResultItem[]>;
  /** Optional extra content in the board toolbar (e.g. CHECKION MCP toggle). */
  boardToolbarExtra?: React.ReactNode;
  /** When true, show CHECKION MCP option in each card's port menu. */
  showCheckionMcpOption?: boolean;
  /** Whether CHECKION MCP is enabled (for port menu). */
  checkionMcpEnabled?: boolean;
  /** Called when user toggles CHECKION MCP from a card's port menu. */
  onCheckionMcpToggle?: () => void;
  className?: string;
}

export function MsqdxBoardCanvas({
  board,
  prismions,
  connections,
  participants = [],
  zoom,
  pan,
  onZoomChange,
  onPanChange,
  selectedPrismionId = null,
  onSelectPrismion,
  onDoubleClickCanvas,
  onPrismionMove,
  onPrismionPromptSubmit,
  onPrismionConnectorCreate,
  onPrismionLockToggle,
  onPrismionDelete,
  onPrismionResize,
  onConnectorDirectionChange,
  onConnectorDelete,
  onConnectorDrop,
  onConnectorWaypointsChange,
  marqueeSelectMode = false,
  onMarqueeSelectModeChange,
  onMarqueeSelect,
  selectedPrismionIds,
  showToolbars = true,
  showUserToolbar = true,
  prismionResults,
  boardToolbarExtra,
  showCheckionMcpOption = false,
  checkionMcpEnabled = false,
  onCheckionMcpToggle,
  className,
}: MsqdxBoardCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = React.useState(false);
  const [lastPanPoint, setLastPanPoint] = React.useState({ x: 0, y: 0 });
  const [marqueeStart, setMarqueeStart] = useState<{ x: number; y: number } | null>(null);
  const [marqueeEnd, setMarqueeEnd] = useState<{ x: number; y: number } | null>(null);
  const marqueeEndRef = useRef<{ x: number; y: number } | null>(null);
  const [draggingPrismionId, setDraggingPrismionId] = useState<string | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [dragStartClient, setDragStartClient] = useState<{ x: number; y: number } | null>(null);
  const [pendingConnectorDrag, setPendingConnectorDrag] = useState<{
    fromId: string;
    fromPort: "top" | "right" | "bottom" | "left";
    clientX: number;
    clientY: number;
  } | null>(null);
  const [connectorDragFrom, setConnectorDragFrom] = useState<{
    fromId: string;
    fromPort: "top" | "right" | "bottom" | "left";
  } | null>(null);
  const [connectorDragEnd, setConnectorDragEnd] = useState<{ x: number; y: number } | null>(null);
  const DRAG_THRESHOLD_PX = 5;

  const canvasSettings = getCanvasSettings(board);
  const connectors = connections.map(connectionToConnector);
  const prismionsMap = prismionsToRecord(prismions);
  const gridSize = canvasSettings.patternSize * zoom;
  const gridOffsetX = pan.x % gridSize;
  const gridOffsetY = pan.y % gridSize;

  const effectiveSelectedIds = selectedPrismionIds ?? (selectedPrismionId ? [selectedPrismionId] : []);

  const clientToCanvas = useCallback(
    (clientX: number, clientY: number) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: (clientX - rect.left - pan.x) / zoom,
        y: (clientY - rect.top - pan.y) / zoom,
      };
    },
    [pan, zoom]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0 && e.button !== 1) return;
      const isOnCard = (e.target as HTMLElement).closest?.("[data-prismion-id]");
      if (marqueeSelectMode && e.button === 0 && !isOnCard) {
        const pt = clientToCanvas(e.clientX, e.clientY);
        setMarqueeStart(pt);
        setMarqueeEnd(pt);
        e.preventDefault();
        return;
      }
      if (e.button === 1 || e.button === 0) {
        setIsPanning(true);
        setLastPanPoint({ x: e.clientX, y: e.clientY });
        e.preventDefault();
      }
    },
    [marqueeSelectMode, clientToCanvas]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (marqueeStart !== null) {
        const pt = clientToCanvas(e.clientX, e.clientY);
        marqueeEndRef.current = pt;
        setMarqueeEnd(pt);
        return;
      }
      if (isPanning) {
        onPanChange({
          x: pan.x + (e.clientX - lastPanPoint.x),
          y: pan.y + (e.clientY - lastPanPoint.y),
        });
        setLastPanPoint({ x: e.clientX, y: e.clientY });
      }
    },
    [marqueeStart, isPanning, lastPanPoint, pan, onPanChange, clientToCanvas]
  );

  const handleMouseUp = useCallback(() => {
    const end = marqueeEndRef.current ?? marqueeEnd;
    if (marqueeStart !== null && end !== null && onMarqueeSelect) {
      const rx = Math.min(marqueeStart.x, end.x);
      const ry = Math.min(marqueeStart.y, end.y);
      const rw = Math.abs(end.x - marqueeStart.x);
      const rh = Math.abs(end.y - marqueeStart.y);
      const cardIds: string[] = [];
      for (const p of prismions) {
        const px = p.position.x;
        const py = p.position.y;
        const w = p.size?.w ?? 300;
        const h = p.size?.h ?? 200;
        const overlaps =
          !(px + w < rx || px > rx + rw || py + h < ry || py > ry + rh);
        if (overlaps) cardIds.push(p.id);
      }
      const cardSet = new Set(cardIds);
      const connectionIds = connections
        .filter(
          (c) =>
            c.fromPrismionId &&
            c.toPrismionId &&
            cardSet.has(c.fromPrismionId) &&
            cardSet.has(c.toPrismionId)
        )
        .map((c) => c.id);
      onMarqueeSelect(cardIds, connectionIds);
      onMarqueeSelectModeChange?.(false);
    }
    marqueeEndRef.current = null;
    setMarqueeStart(null);
    setMarqueeEnd(null);
    setIsPanning(false);
  }, [marqueeStart, marqueeEnd, onMarqueeSelect, onMarqueeSelectModeChange, prismions, connections]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(
        CANVAS_ZOOM.min,
        Math.min(CANVAS_ZOOM.max, zoom * zoomFactor)
      );
      const zoomDelta = newZoom - zoom;
      const panDeltaX = (e.clientX - rect.left - centerX - pan.x) * (zoomDelta / zoom);
      const panDeltaY = (e.clientY - rect.top - centerY - pan.y) * (zoomDelta / zoom);
      onZoomChange(newZoom);
      onPanChange({ x: pan.x - panDeltaX, y: pan.y - panDeltaY });
    },
    [zoom, pan, onZoomChange, onPanChange]
  );

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== canvasRef.current) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      onDoubleClickCanvas?.({ x, y });
    },
    [pan, zoom, onDoubleClickCanvas]
  );

  const handleCardMouseDown = useCallback(
    (e: React.MouseEvent, prismion: Prismion) => {
      if (e.button !== 0 || e.metaKey || !onPrismionMove) return;
      const target = e.target as HTMLElement;
      if (target.closest?.("input, button, [role='button'], a, [data-no-drag]")) {
        e.stopPropagation();
        return;
      }
      e.stopPropagation();
      setDraggingPrismionId(prismion.id);
      setDragStartPosition({ ...prismion.position });
      setDragStartClient({ x: e.clientX, y: e.clientY });
    },
    [onPrismionMove]
  );

  const handleConnectorDragStart = useCallback(
    (fromId: string, fromPort: "top" | "right" | "bottom" | "left", e: React.MouseEvent) => {
      const fromPrismion = prismionsMap[fromId];
      if (!fromPrismion || !onConnectorDrop) return;
      e.preventDefault();
      e.stopPropagation();
      setPendingConnectorDrag({ fromId, fromPort, clientX: e.clientX, clientY: e.clientY });
    },
    [prismionsMap, onConnectorDrop]
  );

  useEffect(() => {
    const active = pendingConnectorDrag || connectorDragFrom;
    if (!active || !onConnectorDrop) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    const clientToCanvas = (clientX: number, clientY: number) => {
      if (!rect) return { x: 0, y: 0 };
      return {
        x: (clientX - rect.left - pan.x) / zoom,
        y: (clientY - rect.top - pan.y) / zoom,
      };
    };
    const onMove = (e: MouseEvent) => {
      if (pendingConnectorDrag) {
        const dx = e.clientX - pendingConnectorDrag.clientX;
        const dy = e.clientY - pendingConnectorDrag.clientY;
        if (Math.sqrt(dx * dx + dy * dy) >= DRAG_THRESHOLD_PX && prismionsMap[pendingConnectorDrag.fromId]) {
          const startPos = calculatePortPosition(prismionsMap[pendingConnectorDrag.fromId], pendingConnectorDrag.fromPort);
          setConnectorDragFrom({ fromId: pendingConnectorDrag.fromId, fromPort: pendingConnectorDrag.fromPort });
          setConnectorDragEnd(clientToCanvas(e.clientX, e.clientY));
          setPendingConnectorDrag(null);
        }
      } else if (connectorDragFrom) {
        setConnectorDragEnd(clientToCanvas(e.clientX, e.clientY));
      }
    };
    const onUp = (e: MouseEvent) => {
      if (connectorDragFrom) {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        const portEl = el?.closest?.("[data-port-side]") as HTMLElement | null;
        const cardEl = portEl?.closest?.("[data-prismion-id]") as HTMLElement | null;
        const toPort = portEl?.getAttribute("data-port-side") as "top" | "right" | "bottom" | "left" | null;
        const toId = cardEl?.getAttribute("data-prismion-id") ?? null;
        if (toId && toPort && toId !== connectorDragFrom.fromId) {
          onConnectorDrop(connectorDragFrom.fromId, connectorDragFrom.fromPort, toId, toPort);
        }
      }
      setPendingConnectorDrag(null);
      setConnectorDragFrom(null);
      setConnectorDragEnd(null);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [pendingConnectorDrag, connectorDragFrom, onConnectorDrop, pan, zoom, prismionsMap]);

  useEffect(() => {
    if (!draggingPrismionId || !dragStartPosition || !dragStartClient || !onPrismionMove) return;
    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX - dragStartClient.x) / zoom;
      const dy = (e.clientY - dragStartClient.y) / zoom;
      const newPos = {
        x: dragStartPosition.x + dx,
        y: dragStartPosition.y + dy,
      };
      const moving = prismionsMap[draggingPrismionId];
      if (
        moving &&
        wouldOverlap(draggingPrismionId, newPos, moving.size, prismions)
      )
        return;
      onPrismionMove(draggingPrismionId, newPos);
    };
    const onUp = () => {
      setDraggingPrismionId(null);
      setDragStartPosition(null);
      setDragStartClient(null);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [draggingPrismionId, dragStartPosition, dragStartClient, zoom, onPrismionMove, prismionsMap, prismions]);

  return (
    <Box
      className={className}
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: canvasSettings.backgroundColor,
        cursor: marqueeStart !== null ? "crosshair" : isPanning ? "grabbing" : marqueeSelectMode ? "crosshair" : "grab",
        userSelect: "none",
      }}
    >
      {canvasSettings.background === "grid" && (
        <Box
          component="svg"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`,
          }}
        >
          <defs>
            <pattern
              id="msqdx-board-grid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke={canvasSettings.patternColor}
                strokeWidth={1}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#msqdx-board-grid)" />
        </Box>
      )}

      {canvasSettings.background === "dots" && (
        <Box
          component="svg"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`,
          }}
        >
          <defs>
            <pattern
              id="msqdx-board-dots"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r={1}
                fill={canvasSettings.patternColor}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#msqdx-board-dots)" />
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        {(marqueeStart !== null && marqueeEnd !== null) && (() => {
          const rx = Math.min(marqueeStart.x, marqueeEnd.x);
          const ry = Math.min(marqueeStart.y, marqueeEnd.y);
          const rw = Math.max(Math.abs(marqueeEnd.x - marqueeStart.x), 2);
          const rh = Math.max(Math.abs(marqueeEnd.y - marqueeStart.y), 2);
          return (
            <Box
              sx={{
                position: "absolute",
                left: rx,
                top: ry,
                width: rw,
                height: rh,
                border: `2px dashed ${MSQDX_BRAND_COLOR_CSS}`,
                borderRadius: 1,
                backgroundColor: "color-mix(in srgb, var(--color-theme-accent, #00ca55) 12%, transparent)",
                pointerEvents: "none",
                zIndex: 25,
              }}
            />
          );
        })()}
        {connectorDragFrom && connectorDragEnd && prismionsMap[connectorDragFrom.fromId] && (() => {
          const start = calculatePortPosition(prismionsMap[connectorDragFrom.fromId], connectorDragFrom.fromPort);
          const end = connectorDragEnd;
          const minX = Math.min(start.x, end.x) - 4;
          const minY = Math.min(start.y, end.y) - 4;
          const w = Math.max(Math.abs(end.x - start.x) + 8, 2);
          const h = Math.max(Math.abs(end.y - start.y) + 8, 2);
          return (
            <Box sx={{ position: "absolute", left: minX, top: minY, width: w, height: h, pointerEvents: "none", zIndex: 25 }}>
              <Box
                component="svg"
                width="100%"
                height="100%"
                viewBox={`0 0 ${w} ${h}`}
                preserveAspectRatio="none"
                sx={{ overflow: "visible" }}
              >
                <line
                  x1={start.x - minX}
                  y1={start.y - minY}
                  x2={end.x - minX}
                  y2={end.y - minY}
                  stroke={MSQDX_BRAND_COLOR_CSS}
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </Box>
            </Box>
          );
        })()}

        {prismions.length === 0 && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "32px",
                padding: "32px",
                maxWidth: 448,
                textAlign: "center",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                border: `2px dashed ${MSQDX_BRAND_COLOR_CSS}`,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: `linear-gradient(to right, ${MSQDX_BRAND_PRIMARY.purple}, #9333ea)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Sparkles size={32} color="#fff" />
              </Box>
              <Box component="h3" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, fontWeight: 600, fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono, color: MSQDX_NEUTRAL[900], margin: "0 0 8px" }}>
                Bereit für deine Ideen!
              </Box>
              <Box component="p" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono, color: MSQDX_NEUTRAL[600], margin: "0 0 16px" }}>
                Doppelklick auf das Canvas, um dein erstes Prismion zu erstellen.
              </Box>
              <Box component="p" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"], fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono, color: MSQDX_NEUTRAL[500] }}>
                Tipp: Prismions verschieben, bearbeiten und verbinden.
              </Box>
            </Box>
          </Box>
        )}

        {prismions.map((prismion) => (
          <Box
            key={prismion.id}
            data-prismion-id={prismion.id}
            onMouseDown={(e) => handleCardMouseDown(e, prismion)}
            sx={{
              position: "absolute",
              left: prismion.position.x,
              top: prismion.position.y,
              width: prismion.size.w,
              minHeight: prismion.size.h,
              zIndex: draggingPrismionId === prismion.id ? 20 : (prismion.position.zIndex ?? 10),
              cursor: draggingPrismionId === prismion.id ? "grabbing" : "grab",
            }}
          >
            <MsqdxPrismionCard
              prismion={prismion}
              selected={effectiveSelectedIds.includes(prismion.id)}
              onSelect={() => onSelectPrismion?.(prismion.id)}
              onMove={(pos) => onPrismionMove?.(prismion.id, pos)}
              onResize={
                onPrismionResize
                  ? (size) => {
                      const minW = prismion.size.minW ?? 200;
                      const minH = prismion.size.minH ?? 120;
                      const logicalW = Math.round(size.w / zoom);
                      const logicalH = Math.round(size.h / zoom);
                      if (logicalW < 10 || logicalH < 10) return;
                      onPrismionResize(prismion.id, {
                        w: Math.max(minW, logicalW),
                        h: Math.max(minH, logicalH),
                      });
                    }
                  : undefined
              }
              onPromptSubmit={(prompt) => onPrismionPromptSubmit?.(prismion.id, prompt)}
              onConnectorDrag={onConnectorDrop ? (port, e) => handleConnectorDragStart(prismion.id, port, e) : undefined}
              onConnectorCreatePrismion={(port, type) => onPrismionConnectorCreate?.(prismion.id, port, type)}
              onLockToggle={() => onPrismionLockToggle?.(prismion.id)}
              onDelete={() => onPrismionDelete?.(prismion.id)}
              results={prismionResults?.[prismion.id]}
              showCheckionMcpOption={showCheckionMcpOption}
              checkionMcpEnabled={checkionMcpEnabled}
              onCheckionMcpToggle={onCheckionMcpToggle}
            />
          </Box>
        ))}

        {connectors.length > 0 && (
          <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            {connectors.map((connector) => (
              <MsqdxConnectorEdge
                key={connector.id}
                connector={connector}
                prismions={prismionsMap}
                selectedPrismionIds={effectiveSelectedIds}
                onDirectionChange={onConnectorDirectionChange}
                onDelete={onConnectorDelete}
                onWaypointsChange={onConnectorWaypointsChange}
                clientToBoard={clientToCanvas}
              />
            ))}
          </Box>
        )}

        {participants.filter((p) => p.isActive && p.cursorX != null && p.cursorY != null).length > 0 && (
          <>
            {participants
              .filter((p) => p.isActive && p.cursorX != null && p.cursorY != null)
              .map((p) => (
                <Box
                  key={p.id}
                  sx={{
                    position: "absolute",
                    left: p.cursorX!,
                    top: p.cursorY!,
                    transform: "translate(-2px, -2px)",
                    pointerEvents: "none",
                    zIndex: 50,
                  }}
                >
                  <Box component="svg" width={20} height={20} viewBox="0 0 20 20">
                    <path
                      d="M0 0L0 16L5 11L9 15L13 10L20 20L0 0Z"
                      fill={p.userColor ?? MSQDX_NEUTRAL[500]}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: 8,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"],
                      fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
                      color: "#fff",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      backgroundColor: p.userColor ?? MSQDX_NEUTRAL[500],
                    }}
                  >
                    {p.userName}
                  </Box>
                </Box>
              ))}
          </>
        )}
      </Box>

      {showToolbars && (
        <>
          <Box sx={{ position: "absolute", bottom: 16, right: 16, pointerEvents: "auto" }}>
            <MsqdxBoardToolbar
              zoom={zoom}
              onZoomChange={onZoomChange}
              pan={pan}
              onPanChange={onPanChange}
              marqueeSelectActive={marqueeSelectMode}
              onMarqueeSelectClick={
                onMarqueeSelect
                  ? () => onMarqueeSelectModeChange?.(!marqueeSelectMode)
                  : undefined
              }
              extra={boardToolbarExtra}
            />
          </Box>
          {showUserToolbar && (
            <Box sx={{ position: "absolute", top: 16, right: 16, pointerEvents: "auto" }}>
              <MsqdxUserToolbar
                displayName="User"
                onChangeName={() => {}}
                onChangeAvatar={() => {}}
                onToggleFollow={() => {}}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
