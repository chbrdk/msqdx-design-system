"use client";

import React, { useState, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { Plus } from "lucide-react";
import type { Board, Prismion, Connection, BoardParticipant, Connector } from "../../../types/prismion";
import { MsqdxPrismionCard } from "../PrismionCard";
import { MsqdxConnectorEdge } from "../ConnectorEdge";
import { MsqdxBoardToolbar } from "../BoardToolbar";
import { getCanvasSettings } from "../../../lib/board-utils";
import { CANVAS_ZOOM } from "../../../lib/board-utils";
import { MSQDX_NEUTRAL, MSQDX_SPACING, MSQDX_COLORS } from "@msqdx/tokens";

function connectionToConnector(c: Connection): Connector {
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
  };
}

function prismionsToRecord(prismions: Prismion[]): Record<string, Prismion> {
  const out: Record<string, Prismion> = {};
  prismions.forEach((p) => (out[p.id] = p));
  return out;
}

export interface MsqdxSimpleBoardCanvasProps {
  board: Board;
  prismions: Prismion[];
  connections: Connection[];
  participants?: BoardParticipant[];
  onPrismionCreated?: (prismion: Prismion) => void;
  className?: string;
}

export function MsqdxSimpleBoardCanvas({
  board,
  prismions,
  connections,
  onPrismionCreated,
  className,
}: MsqdxSimpleBoardCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedPrismionId, setSelectedPrismionId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  const canvasSettings = getCanvasSettings(board);
  const connectors = connections.map(connectionToConnector);
  const prismionsMap = prismionsToRecord(prismions);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      setSelectedPrismionId(null);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        setPan((prev) => ({
          x: prev.x + (e.clientX - lastPanPoint.x),
          y: prev.y + (e.clientY - lastPanPoint.y),
        }));
        setLastPanPoint({ x: e.clientX, y: e.clientY });
      }
    },
    [isPanning, lastPanPoint]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(CANVAS_ZOOM.min, Math.min(CANVAS_ZOOM.max, prev * delta)));
  }, []);

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== canvasRef.current) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      const newPrismion: Prismion = {
        id: `prismion-${Date.now()}`,
        boardId: board.id,
        title: "New Prismion",
        prompt: "",
        colorToken: MSQDX_COLORS.brand.green,
        tags: [],
        position: { x, y, zIndex: 10 },
        size: { w: 300, h: 200, minW: 200, minH: 100 },
        ports: {
          top: { id: "top", side: "top", capacity: "multi" },
          right: { id: "right", side: "right", capacity: "multi" },
          bottom: { id: "bottom", side: "bottom", capacity: "multi" },
          left: { id: "left", side: "left", capacity: "multi" },
        },
        state: "active",
        createdBy: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        revision: 1,
      };
      onPrismionCreated?.(newPrismion);
    },
    [board.id, pan, zoom, onPrismionCreated]
  );

  const handleAddClick = useCallback(() => {
    const newPrismion: Prismion = {
      id: `prismion-${Date.now()}`,
      boardId: board.id,
      title: "New Prismion",
      prompt: "",
      colorToken: MSQDX_COLORS.brand.green,
      tags: [],
      position: { x: 100, y: 100, zIndex: 10 },
      size: { w: 300, h: 200, minW: 200, minH: 100 },
      ports: {
        top: { id: "top", side: "top", capacity: "multi" },
        right: { id: "right", side: "right", capacity: "multi" },
        bottom: { id: "bottom", side: "bottom", capacity: "multi" },
        left: { id: "left", side: "left", capacity: "multi" },
      },
      state: "active",
      createdBy: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      revision: 1,
    };
    onPrismionCreated?.(newPrismion);
  }, [board.id, onPrismionCreated]);

  return (
    <Box
      className={className}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: canvasSettings.backgroundColor ?? MSQDX_NEUTRAL[100],
      }}
    >
      <Box
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        sx={{
          position: "absolute",
          inset: 0,
          cursor: isPanning ? "grabbing" : "grab",
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            backgroundImage: `radial-gradient(circle, ${canvasSettings.patternColor} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            pointerEvents: "none",
          }}
        />

        {connectors.length > 0 && (
          <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            {connectors.map((connector) => (
              <MsqdxConnectorEdge
                key={connector.id}
                connector={connector}
                prismions={prismionsMap}
                selectedPrismionIds={selectedPrismionId ? [selectedPrismionId] : []}
              />
            ))}
          </Box>
        )}

        {prismions.map((prismion) => (
          <Box
            key={prismion.id}
            data-prismion-id={prismion.id}
            sx={{
              position: "absolute",
              left: prismion.position.x,
              top: prismion.position.y,
              zIndex: prismion.position.zIndex ?? 10,
            }}
          >
            <MsqdxPrismionCard
              prismion={prismion}
              selected={selectedPrismionId === prismion.id}
              onSelect={(multiSelect) => {
                if (!multiSelect) setSelectedPrismionId(prismion.id);
              }}
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ position: "absolute", bottom: 16, right: 16, zIndex: 10 }}>
        <Box
          component="button"
          onClick={handleAddClick}
          aria-label="Add Prismion"
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: MSQDX_COLORS.brand.green,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            "&:hover": { opacity: 0.9 },
          }}
        >
          <Plus size={24} />
        </Box>
      </Box>

      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
        <MsqdxBoardToolbar
          zoom={zoom}
          onZoomChange={setZoom}
          pan={pan}
          onPanChange={setPan}
        />
      </Box>
    </Box>
  );
}
