"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Box, styled } from "@mui/material";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { GitBranch, ArrowRight, Lock, Unlock, Archive, Trash2, MoreHorizontal, X } from "lucide-react";
import {
  MSQDX_SPACING,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_COLORS,
  MSQDX_STATUS,
} from "@msqdx/tokens";

export interface MsqdxPrismionToolbarProps {
  className?: string;
  onBranch?: () => void;
  onMerge?: () => void;
  onLockToggle?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  locked?: boolean;
  variant?: "bar" | "radial";
}

const RadialButton = styled(Box)(() => ({
  position: "absolute",
  width: 36,
  height: 36,
  marginLeft: -18,
  marginTop: -18,
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,0.95)",
  border: `1px solid ${MSQDX_NEUTRAL[200]}`,
  boxShadow: MSQDX_EFFECTS.shadows.md,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  pointerEvents: "auto",
  transition: "all 220ms ease-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export function MsqdxPrismionToolbar({
  className,
  onBranch,
  onMerge,
  onLockToggle,
  onArchive,
  onDelete,
  locked = false,
  variant = "radial",
}: MsqdxPrismionToolbarProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const blockMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);
  const [entered, setEntered] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  const actions = [
    { key: "branch", label: "Branch", Icon: GitBranch, onClick: onBranch },
    { key: "merge", label: "Merge", Icon: ArrowRight, onClick: onMerge },
    {
      key: "lock",
      label: locked ? "Unlock" : "Lock",
      Icon: locked ? Unlock : Lock,
      onClick: onLockToggle,
    },
    { key: "archive", label: "Archive", Icon: Archive, onClick: onArchive },
    { key: "delete", label: "Delete", Icon: Trash2, onClick: onDelete, isDanger: true },
  ];

  return (
    <Box className={className} sx={{ position: "relative", userSelect: "none" }}>
      <Box
        ref={wrapperRef}
        sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}
        data-open={open ? "true" : "false"}
      >
        <MsqdxButton
          size="small"
          variant="text"
          onClick={toggle}
          onMouseDown={blockMouseDown}
          title={open ? "Toolbar ausblenden" : "Toolbar anzeigen"}
          sx={{
            minWidth: 32,
            width: 32,
            height: 32,
            borderRadius: "50%",
            padding: 0,
            boxShadow: MSQDX_EFFECTS.shadows.sm,
            backgroundColor: "#fff",
            border: `1px solid ${MSQDX_NEUTRAL[200]}`,
            ...(open && { boxShadow: `0 0 0 2px ${MSQDX_COLORS.brand.green}` }),
          }}
        >
          {open ? <X size={18} /> : <MoreHorizontal size={18} />}
        </MsqdxButton>

        {variant === "bar" && open && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "100%",
              transform: "translateX(-50%)",
              marginTop: MSQDX_SPACING.gap.xs,
              pointerEvents: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(255,255,255,0.95)",
                border: `1px solid ${MSQDX_NEUTRAL[200]}`,
                borderRadius: 9999,
                padding: `${MSQDX_SPACING.padding.xxs}px ${MSQDX_SPACING.padding.xs}px`,
                boxShadow: MSQDX_EFFECTS.shadows.lg,
              }}
            >
              {actions.map((a) => (
                <MsqdxButton
                  key={a.key}
                  size="small"
                  variant="text"
                  onClick={a.onClick}
                  onMouseDown={blockMouseDown}
                  title={a.label}
                  sx={{
                    minWidth: 32,
                    height: 32,
                    padding: 1,
                    color: a.isDanger ? MSQDX_STATUS.error.base : undefined,
                  }}
                >
                  <a.Icon size={16} style={{ marginRight: 4 }} />
                  {a.label}
                </MsqdxButton>
              ))}
            </Box>
          </Box>
        )}

        {variant === "radial" && open && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              pointerEvents: "auto",
            }}
          >
            {actions.map((a, idx) => {
              const count = actions.length;
              const spanDeg = 160;
              const startDeg = -120;
              const step = count > 1 ? spanDeg / (count - 1) : 0;
              const angleDeg = startDeg + idx * step;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 64;
              const tx = Math.cos(angleRad) * radius;
              const ty = Math.sin(angleRad) * radius;
              const delay = `${idx * 0.06}s`;
              return (
                <RadialButton
                  key={a.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    a.onClick?.();
                  }}
                  onMouseDown={blockMouseDown}
                  title={a.label}
                  sx={{
                    transform: `translate(${tx}px, ${ty}px) scale(${entered ? 1 : 0.85})`,
                    opacity: entered ? 1 : 0,
                    transitionDuration: "220ms",
                    transitionProperty: "transform, opacity",
                    transitionDelay: delay,
                    color: a.isDanger ? MSQDX_STATUS.error.base : undefined,
                  }}
                >
                  <a.Icon size={18} />
                </RadialButton>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
