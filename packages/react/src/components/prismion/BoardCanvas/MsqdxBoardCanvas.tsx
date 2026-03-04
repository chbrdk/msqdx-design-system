"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Sparkles } from "lucide-react";
import type { Board, Prismion, Connection, BoardParticipant, Connector } from "../../../types/prismion";
import { getCanvasSettings, CANVAS_ZOOM, wouldOverlap } from "../../../lib/board-utils";
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
  showToolbars?: boolean;
  /** When false, hides the user toolbar (avatar, Presenter, Follow me). @default true when showToolbars is true */
  showUserToolbar?: boolean;
  /** Optional results per prismion id (e.g. AI response items for result cards). */
  prismionResults?: Record<string, PrismionResultItem[]>;
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
  showToolbars = true,
  showUserToolbar = true,
  prismionResults,
  className,
}: MsqdxBoardCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = React.useState(false);
  const [lastPanPoint, setLastPanPoint] = React.useState({ x: 0, y: 0 });
  const [draggingPrismionId, setDraggingPrismionId] = useState<string | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [dragStartClient, setDragStartClient] = useState<{ x: number; y: number } | null>(null);

  const canvasSettings = getCanvasSettings(board);
  const connectors = connections.map(connectionToConnector);
  const prismionsMap = prismionsToRecord(prismions);
  const gridSize = canvasSettings.patternSize * zoom;
  const gridOffsetX = pan.x % gridSize;
  const gridOffsetY = pan.y % gridSize;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 0) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        onPanChange({
          x: pan.x + (e.clientX - lastPanPoint.x),
          y: pan.y + (e.clientY - lastPanPoint.y),
        });
        setLastPanPoint({ x: e.clientX, y: e.clientY });
      }
    },
    [isPanning, lastPanPoint, pan, onPanChange]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
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
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: canvasSettings.backgroundColor,
        cursor: isPanning ? "grabbing" : "grab",
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
        {connectors.length > 0 && (
          <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 15 }}>
            {connectors.map((connector) => (
              <MsqdxConnectorEdge
                key={connector.id}
                connector={connector}
                prismions={prismionsMap}
                selectedPrismionIds={selectedPrismionId ? [selectedPrismionId] : []}
                onDirectionChange={onConnectorDirectionChange}
                onDelete={onConnectorDelete}
              />
            ))}
          </Box>
        )}

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
              zIndex: draggingPrismionId === prismion.id ? 20 : (prismion.position.zIndex ?? 10),
              cursor: draggingPrismionId === prismion.id ? "grabbing" : "grab",
            }}
          >
            <MsqdxPrismionCard
              prismion={prismion}
              selected={selectedPrismionId === prismion.id}
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
              onConnectorCreatePrismion={(port, type) => onPrismionConnectorCreate?.(prismion.id, port, type)}
              onLockToggle={() => onPrismionLockToggle?.(prismion.id)}
              onDelete={() => onPrismionDelete?.(prismion.id)}
              results={prismionResults?.[prismion.id]}
            />
          </Box>
        ))}

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
