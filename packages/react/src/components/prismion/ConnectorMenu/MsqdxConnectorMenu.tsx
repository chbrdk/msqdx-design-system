"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, styled } from "@mui/material";
import { MessageSquare, FileText, Image, Video, Link as LinkIcon, X } from "lucide-react";
import type { PortSide } from "../../../types/prismion";
import {
  MSQDX_SPACING,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_BRAND_COLOR_CSS,
  MSQDX_BRAND_PRIMARY,
} from "@msqdx/tokens";

export interface MsqdxConnectorMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  port: PortSide;
  onClose: () => void;
  onCreatePrismion: (type: "prompt" | "file" | "image" | "video" | "link") => void;
  onAttachToExisting: (type: "file" | "image" | "video" | "link") => void;
  className?: string;
}

const CenterButton = styled(Box)(() => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.95)",
  border: `2px solid ${MSQDX_BRAND_COLOR_CSS}`,
  boxShadow: MSQDX_EFFECTS.shadows.lg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": { opacity: 0.9 },
}));

const ActionButton = styled(Box)(() => ({
  position: "absolute",
  width: 44,
  height: 44,
  marginLeft: -22,
  marginTop: -22,
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.95)",
  border: `2px solid ${MSQDX_NEUTRAL[200]}`,
  boxShadow: MSQDX_EFFECTS.shadows.lg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 250ms, opacity 250ms, box-shadow 250ms",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: MSQDX_EFFECTS.shadows.xl,
  },
}));

const actions = [
  { key: "prompt", label: "Prompt", Icon: MessageSquare, color: "#2563eb", fn: "create" as const, type: "prompt" as const },
  { key: "file", label: "Dokument", Icon: FileText, color: MSQDX_NEUTRAL[600], fn: "attach" as const, type: "file" as const },
  { key: "image", label: "Bild", Icon: Image, color: MSQDX_BRAND_COLOR_CSS, fn: "attach" as const, type: "image" as const },
  { key: "video", label: "Video", Icon: Video, color: MSQDX_BRAND_PRIMARY.purple, fn: "attach" as const, type: "video" as const },
  { key: "link", label: "Link", Icon: LinkIcon, color: MSQDX_BRAND_PRIMARY.orange, fn: "attach" as const, type: "link" as const },
];

export function MsqdxConnectorMenu({
  isOpen,
  position,
  port,
  onClose,
  onCreatePrismion,
  onAttachToExisting,
  className,
}: MsqdxConnectorMenuProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const blockMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown, true);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  if (!isOpen) return null;

  const radius = 70;
  const spanDeg = 160;
  let startDeg: number;
  switch (port) {
    case "top": startDeg = -260; break;
    case "right": startDeg = -80; break;
    case "bottom": startDeg = 10; break;
    case "left": startDeg = 100; break;
  }
  const step = actions.length > 1 ? spanDeg / (actions.length - 1) : 0;

  return (
    <Box
      className={className}
      sx={{
        position: "fixed",
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        zIndex: 50,
        userSelect: "none",
      }}
    >
      <Box ref={wrapperRef} sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
        <CenterButton
          onClick={onClose}
          onMouseDown={blockMouseDown}
          title="Schließen"
          sx={{ borderColor: MSQDX_BRAND_COLOR_CSS, boxShadow: "0 0 0 2px color-mix(in srgb, var(--color-theme-accent, #00ca55) 20%, transparent)" }}
        >
          <X size={20} color={MSQDX_BRAND_COLOR_CSS} />
        </CenterButton>

        <Box sx={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 9999, pointerEvents: "auto" }}>
          {actions.map((action, idx) => {
            const angleDeg = startDeg + idx * step;
            const angleRad = (angleDeg * Math.PI) / 180;
            const tx = Math.cos(angleRad) * radius;
            const ty = Math.sin(angleRad) * radius;
            const delay = `${idx * 0.08}s`;
            return (
              <ActionButton
                key={action.key}
                onClick={(e) => {
                  e.stopPropagation();
                  if (action.fn === "create") onCreatePrismion(action.type);
                  else onAttachToExisting(action.type);
                  onClose();
                }}
                onMouseDown={blockMouseDown}
                title={action.label}
                sx={{
                  transform: `translate(${tx}px, ${ty}px) scale(${entered ? 1 : 0.85})`,
                  opacity: entered ? 1 : 0,
                  transitionDuration: "250ms",
                  transitionDelay: delay,
                  color: action.color,
                }}
              >
                <action.Icon size={20} />
              </ActionButton>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
