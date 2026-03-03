"use client";

import React, { useCallback, useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import type { PortSide } from "../../../types/prismion";
import {
  Plus,
  MessageSquare,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
} from "lucide-react";
import {
  MSQDX_EFFECTS,
  MSQDX_COLORS,
  MSQDX_BRAND_PRIMARY,
  MSQDX_NEUTRAL,
} from "@msqdx/tokens";

export interface MsqdxPrismionPortsProps {
  className?: string;
  onConnectorClick?: (port: PortSide, event: React.MouseEvent) => void;
  onConnectorDrag?: (port: PortSide, event: React.MouseEvent) => void;
  onCreatePrismion?: (
    port: PortSide,
    type: "prompt" | "file" | "image" | "video" | "link"
  ) => void;
  onAttachToExisting?: (
    port: PortSide,
    type: "file" | "image" | "video" | "link"
  ) => void;
}

const PORT_SIZE = 32;
const RADIUS = 60;

const PortButton = styled(Box, {
  shouldForwardProp: (p) => p !== "isActive" && p !== "side",
})<{ isActive?: boolean; side: PortSide }>(({ isActive }) => ({
  width: PORT_SIZE,
  height: PORT_SIZE,
  borderRadius: "50%",
  backgroundColor: MSQDX_COLORS.brand.green,
  border: `2px solid ${MSQDX_NEUTRAL[100]}`,
  cursor: "pointer",
  pointerEvents: "auto",
  transition: `all ${MSQDX_EFFECTS.duration.standard} ${MSQDX_EFFECTS.easing.easeOut}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: MSQDX_EFFECTS.shadows.sm,
  "&:hover": {
    opacity: 1,
  },
  ...(isActive && {
    boxShadow: `0 0 0 2px ${MSQDX_COLORS.brand.green}33`,
  }),
}));

const MenuButton = styled(Box)(() => ({
  position: "absolute",
  width: 36,
  height: 36,
  marginLeft: -18,
  marginTop: -18,
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.95)",
  border: `2px solid ${MSQDX_NEUTRAL[200]}`,
  boxShadow: MSQDX_EFFECTS.shadows.lg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  pointerEvents: "auto",
  transition: "all 220ms ease-out",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: MSQDX_EFFECTS.shadows.xl,
  },
}));

const iconColorMap: Record<string, string> = {
  prompt: "#2563eb",
  file: MSQDX_NEUTRAL[600],
  image: "#16a34a",
  video: MSQDX_BRAND_PRIMARY.purple,
  link: MSQDX_BRAND_PRIMARY.orange,
};

export function MsqdxPrismionPorts({
  className,
  onConnectorClick,
  onConnectorDrag,
  onCreatePrismion,
  onAttachToExisting,
}: MsqdxPrismionPortsProps) {
  const [activePort, setActivePort] = useState<PortSide | null>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!activePort) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("[data-port-container]")) setActivePort(null);
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, [activePort]);

  useEffect(() => {
    if (!activePort) {
      setEntered(false);
      return;
    }
    setEntered(false);
    const t = setTimeout(() => setEntered(true), 10);
    return () => clearTimeout(t);
  }, [activePort]);

  const handleClick = useCallback(
    (side: PortSide, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (activePort === side) setActivePort(null);
      else if (activePort && activePort !== side) {
        setActivePort(null);
        setTimeout(() => setActivePort(side), 150);
      } else setActivePort(side);
      onConnectorClick?.(side, e);
    },
    [activePort, onConnectorClick]
  );

  const handleMouseDown = useCallback(
    (side: PortSide, e: React.MouseEvent) => {
      e.stopPropagation();
      if (activePort !== side) onConnectorDrag?.(side, e);
    },
    [onConnectorDrag, activePort]
  );

  const getStartDeg = (side: PortSide): number => {
    switch (side) {
      case "top":
        return -170;
      case "right":
        return -80;
      case "bottom":
        return 10;
      case "left":
        return 100;
    }
  };

  const menuActions = [
    { key: "prompt", label: "Prompt", Icon: MessageSquare, colorKey: "prompt", kind: "prompt" as const },
    { key: "file", label: "Dokument", Icon: FileText, colorKey: "file", kind: "file" as const },
    { key: "image", label: "Bild", Icon: Image, colorKey: "image", kind: "image" as const },
    { key: "video", label: "Video", Icon: Video, colorKey: "video", kind: "video" as const },
    { key: "link", label: "Link", Icon: LinkIcon, colorKey: "link", kind: "link" as const },
  ];

  const renderPort = (side: PortSide, style: React.CSSProperties) => {
    const isActive = activePort === side;
    const spanDeg = 160;
    const count = menuActions.length;
    const step = count > 1 ? spanDeg / (count - 1) : 0;
    const startDeg = getStartDeg(side);

    return (
      <Box key={side} sx={{ position: "absolute", ...style }} data-port-container>
        <PortButton
          isActive={isActive}
          side={side}
          onClick={(e) => handleClick(side, e)}
          onMouseDown={(e) => handleMouseDown(side, e)}
          title={
            isActive
              ? "Schließen"
              : "Click: Create new prismion | Drag: Connect to existing"
          }
          sx={{
            opacity: 0,
            "&:hover": { opacity: 1 },
            ".group:hover &": { opacity: 1 },
          }}
        >
          <Plus size={16} color="#fff" style={{ opacity: 1 }} />
        </PortButton>

        {isActive && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {menuActions.map((action, idx) => {
              const angleDeg = startDeg + idx * step;
              const angleRad = (angleDeg * Math.PI) / 180;
              const tx = Math.cos(angleRad) * RADIUS;
              const ty = Math.sin(angleRad) * RADIUS;
              const delay = `${idx * 0.06}s`;
              const color = iconColorMap[action.colorKey] ?? MSQDX_NEUTRAL[600];

              return (
                <MenuButton
                  key={action.key}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (action.kind === "link") {
                      onAttachToExisting?.(side, "link");
                    } else {
                      onCreatePrismion?.(side, action.kind);
                    }
                    setActivePort(null);
                  }}
                  title={action.label}
                  role="button"
                  tabIndex={0}
                  sx={{
                    transform: `translate(${tx}px, ${ty}px) scale(${entered ? 1 : 0.85})`,
                    opacity: entered ? 1 : 0,
                    transitionDuration: "220ms",
                    transitionProperty: "transform, opacity",
                    transitionDelay: delay,
                    color,
                  }}
                >
                  <action.Icon size={16} />
                </MenuButton>
              );
            })}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      className={className}
      sx={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {renderPort("top", {
        top: -14,
        left: "50%",
        transform: "translateX(-50%)",
      })}
      {renderPort("right", {
        right: -14,
        top: "50%",
        transform: "translateY(-50%)",
      })}
      {renderPort("bottom", {
        bottom: -14,
        left: "50%",
        transform: "translateX(-50%)",
      })}
      {renderPort("left", {
        left: -14,
        top: "50%",
        transform: "translateY(-50%)",
      })}
    </Box>
  );
}
