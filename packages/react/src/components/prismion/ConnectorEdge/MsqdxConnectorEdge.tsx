"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Box } from "@mui/material";
import type { Connector, Prismion } from "../../../types/prismion";
import { MsqdxSwitchField } from "../../molecules/Switch/MsqdxSwitchField";
import {
  calculatePortPosition,
  getConnectorBounds,
  findPathAvoidingObstacles,
  type Point,
  type Obstacle,
} from "../../../lib/connector-utils";
import { MSQDX_COLORS, MSQDX_NEUTRAL, MSQDX_SPACING, MSQDX_EFFECTS } from "@msqdx/tokens";

export interface MsqdxConnectorEdgeProps {
  connector: Connector;
  prismions: Record<string, Prismion>;
  selectedPrismionIds?: string[];
  onDirectionChange?: (connectorId: string, newDirection: "forward" | "backward") => void;
  onNewConnection?: (
    fromConnectorId: string,
    toConnectorId: string,
    optimalPort?: "top" | "right" | "bottom" | "left"
  ) => void;
}

function buildRoundedPathData(
  points: Point[],
  bounds: { x: number; y: number },
  cornerRadius = 12
): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x - bounds.x} ${points[0].y - bounds.y} L ${points[1].x - bounds.x} ${points[1].y - bounds.y}`;
  }
  let d = `M ${points[0].x - bounds.x} ${points[0].y - bounds.y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const v1x = p1.x - p0.x;
    const v1y = p1.y - p0.y;
    const v2x = p2.x - p1.x;
    const v2y = p2.y - p1.y;
    const epsilon = 0.0001;
    const isV1Horizontal = Math.abs(v1y) < epsilon && Math.abs(v1x) > epsilon;
    const isV1Vertical = Math.abs(v1x) < epsilon && Math.abs(v1y) > epsilon;
    const isV2Horizontal = Math.abs(v2y) < epsilon && Math.abs(v2x) > epsilon;
    const isV2Vertical = Math.abs(v2x) < epsilon && Math.abs(v2y) > epsilon;
    if (
      !(
        (isV1Horizontal && isV2Vertical) ||
        (isV1Vertical && isV2Horizontal)
      )
    ) {
      d += ` L ${p1.x - bounds.x} ${p1.y - bounds.y}`;
      continue;
    }
    const len1 = Math.abs(isV1Horizontal ? v1x : v1y);
    const len2 = Math.abs(isV2Horizontal ? v2x : v2y);
    const r = Math.min(cornerRadius, Math.max(0, Math.min(len1, len2) / 2));
    let p1a: Point = { x: p1.x, y: p1.y };
    let p1b: Point = { x: p1.x, y: p1.y };
    if (isV1Horizontal) {
      p1a.x = p1.x - Math.sign(v1x) * r;
    } else {
      p1a.y = p1.y - Math.sign(v1y) * r;
    }
    if (isV2Horizontal) {
      p1b.x = p1.x + Math.sign(v2x) * r;
    } else {
      p1b.y = p1.y + Math.sign(v2y) * r;
    }
    d += ` L ${p1a.x - bounds.x} ${p1a.y - bounds.y}`;
    d += ` Q ${p1.x - bounds.x} ${p1.y - bounds.y}, ${p1b.x - bounds.x} ${p1b.y - bounds.y}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x - bounds.x} ${last.y - bounds.y}`;
  return d;
}

export function MsqdxConnectorEdge({
  connector,
  prismions,
  selectedPrismionIds = [],
  onDirectionChange,
  onNewConnection,
}: MsqdxConnectorEdgeProps) {
  const [, setForceUpdate] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isOverlayHovered, setIsOverlayHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrentPos, setDragCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const fromPrismion = prismions[connector.from.prismionId];
  const toPrismion = prismions[connector.to.prismionId];

  const handlePointerDown = useCallback((e: React.PointerEvent<SVGPathElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setDragCurrentPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGPathElement>) => {
    if (!isDragging) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) setDragCurrentPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [isDragging]);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<SVGPathElement>) => {
      if (!isDragging) return;
      try {
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      } catch {}
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target && onNewConnection) {
        const connectorEl = (target as HTMLElement).closest("[data-connector-id]") as HTMLElement | null;
        const prismionEl = (target as HTMLElement).closest("[data-prismion-id]") as HTMLElement | null;
        if (connectorEl) {
          const toId = connectorEl.getAttribute("data-connector-id") || "";
          if (toId && toId !== connector.id) onNewConnection(connector.id, toId);
        } else if (prismionEl) {
          const toPrismionId = prismionEl.getAttribute("data-prismion-id") || "";
          if (toPrismionId) {
            const rect = prismionEl.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width;
            const relY = (e.clientY - rect.top) / rect.height;
            let optimalPort: "top" | "right" | "bottom" | "left";
            if (relY < 0.3) optimalPort = "top";
            else if (relY > 0.7) optimalPort = "bottom";
            else if (relX < 0.3) optimalPort = "left";
            else optimalPort = "right";
            onNewConnection(connector.id, toPrismionId, optimalPort);
          }
        }
      }
      setIsDragging(false);
      setDragStartPos(null);
      setDragCurrentPos(null);
    },
    [isDragging, onNewConnection, connector.id]
  );

  if (!fromPrismion || !toPrismion) return null;

  const isSelected =
    selectedPrismionIds.includes(fromPrismion.id) ||
    selectedPrismionIds.includes(toPrismion.id);
  const strokeColor = isSelected ? MSQDX_COLORS.brand.green : MSQDX_NEUTRAL[400];
  const lineStyle = {
    stroke: strokeColor,
    strokeWidth: 2,
    strokeDasharray: isSelected ? "none" : "5,5",
  };

  const fromPos = calculatePortPosition(fromPrismion, connector.from.port);
  const toPos = calculatePortPosition(toPrismion, connector.to.port);
  const obstacles: Obstacle[] = Object.values(prismions)
    .filter((p) => p.id !== fromPrismion.id && p.id !== toPrismion.id)
    .map((p) => ({
      x: p.position.x,
      y: p.position.y,
      width: p.size.w,
      height: p.size.h,
      id: p.id,
    }));
  const path = findPathAvoidingObstacles(
    fromPos,
    toPos,
    obstacles,
    [fromPrismion.id, toPrismion.id],
    connector.from.port,
    connector.to.port
  );
  const bounds = getConnectorBounds(fromPos, toPos, path);

  const getMidpoint = (): Point => {
    if (path.length === 2)
      return { x: (fromPos.x + toPos.x) / 2, y: (fromPos.y + toPos.y) / 2 };
    if (path.length === 4)
      return {
        x: (path[1].x + path[2].x) / 2,
        y: (path[1].y + path[2].y) / 2,
      };
    if (path.length === 6)
      return {
        x: (path[2].x + path[3].x) / 2,
        y: (path[2].y + path[3].y) / 2,
      };
    let maxDist = 0;
    let best = { x: 0, y: 0 };
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i];
      const b = path[i + 1];
      const d = Math.hypot(b.x - a.x, b.y - a.y);
      if (d > maxDist) {
        maxDist = d;
        best = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      }
    }
    return best;
  };
  const midpoint = getMidpoint();

  const currentDirection: "forward" | "backward" =
    (connector as unknown as { direction?: "forward" | "backward" }).direction ?? "forward";

  const handleDirectionChange = (checked: boolean) => {
    if (onDirectionChange) {
      onDirectionChange(connector.id, checked ? "forward" : "backward");
    }
  };

  const shouldShowOverlay = isHovered || showOverlay || isOverlayHovered;
  const pathData = buildRoundedPathData(path, bounds, 12);

  useEffect(() => {
    setForceUpdate((n) => n + 1);
  }, [
    connector.from.prismionId,
    connector.to.prismionId,
    prismions[connector.from.prismionId]?.position.x,
    prismions[connector.from.prismionId]?.position.y,
    prismions[connector.to.prismionId]?.position.x,
    prismions[connector.to.prismionId]?.position.y,
  ]);

  return (
    <>
      <svg
        ref={svgRef}
        data-connector-id={connector.id}
        style={{
          position: "absolute",
          left: bounds.x,
          top: bounds.y,
          width: bounds.width,
          height: bounds.height,
          pointerEvents: "none",
          zIndex: 0,
        }}
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowOverlay(false);
        }}
        onMouseDown={() => setShowOverlay(true)}
        onMouseUp={() => setShowOverlay(false)}
      >
        <defs>
          <marker
            id={`arrowhead-f-${connector.id}`}
            markerWidth="8"
            markerHeight="6"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={lineStyle.stroke} />
          </marker>
          <marker
            id={`arrowhead-b-${connector.id}`}
            markerWidth="8"
            markerHeight="6"
            refX="2"
            refY="3"
            orient="auto"
          >
            <polygon points="8 0, 0 3, 8 6" fill={lineStyle.stroke} />
          </marker>
        </defs>
        <path
          d={pathData}
          stroke={lineStyle.stroke}
          strokeWidth={lineStyle.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={lineStyle.strokeDasharray}
          markerEnd={currentDirection === "forward" ? `url(#arrowhead-f-${connector.id})` : undefined}
          markerStart={currentDirection === "backward" ? `url(#arrowhead-b-${connector.id})` : undefined}
          style={{
            pointerEvents: "stroke",
            cursor: isDragging ? "grabbing" : "grab",
            opacity: isDragging ? 0.7 : 1,
            touchAction: "none",
          }}
          data-connector-id={connector.id}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
        {isDragging && dragStartPos && dragCurrentPos && (
          <path
            d={`M ${dragStartPos.x} ${dragStartPos.y} L ${dragCurrentPos.x} ${dragCurrentPos.y}`}
            stroke={MSQDX_COLORS.brand.green}
            strokeWidth={2}
            strokeDasharray="5,5"
            fill="none"
            style={{ pointerEvents: "none" }}
          />
        )}
      </svg>

      {shouldShowOverlay && (
        <Box
          onMouseEnter={() => setIsOverlayHovered(true)}
          onMouseLeave={() => setIsOverlayHovered(false)}
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "absolute",
            left: midpoint.x - 40,
            top: midpoint.y - 20,
            zIndex: 20,
            pointerEvents: "all",
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: MSQDX_SPACING.borderRadius.sm,
            padding: MSQDX_SPACING.padding.sm,
            boxShadow: MSQDX_EFFECTS.shadows.lg,
            border: `1px solid ${MSQDX_NEUTRAL[200]}`,
            minWidth: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box component="span" sx={{ fontSize: 14, color: MSQDX_NEUTRAL[600], fontWeight: 500 }}>
            Richtung
          </Box>
          <MsqdxSwitchField
            checked={currentDirection === "forward"}
            onChange={(_e, checked) => handleDirectionChange(checked)}
          />
        </Box>
      )}
    </>
  );
}
