"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxIconButton } from "../../atoms/Button/MsqdxIconButton";
import { GitBranch, ArrowRight, Lock, Unlock, Archive, Trash2, MoreHorizontal, X, Palette } from "lucide-react";
import {
  MSQDX_SPACING,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_BRAND_COLOR_CSS,
  MSQDX_STATUS,
} from "@msqdx/tokens";

/** Toolbar trigger styled like board ports: round, brand background, light border */
const TOOLBAR_TRIGGER_STYLE = {
  overflow: "visible" as const,
  backgroundColor: MSQDX_BRAND_COLOR_CSS,
  color: "#fff",
  border: `2px solid ${MSQDX_NEUTRAL[100]}`,
  boxShadow: MSQDX_EFFECTS.shadows.sm,
  borderRadius: "50%",
};

export interface MsqdxPrismionToolbarProps {
  className?: string;
  onBranch?: () => void;
  onMerge?: () => void;
  onLockToggle?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  /** When set, adds a "Farbe" (color) action that calls this on click (e.g. to open a color picker). */
  onColorClick?: () => void;
  locked?: boolean;
  variant?: "bar" | "radial";
}

export function MsqdxPrismionToolbar({
  className,
  onBranch,
  onMerge,
  onLockToggle,
  onArchive,
  onDelete,
  onColorClick,
  locked = false,
  variant = "radial",
}: MsqdxPrismionToolbarProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const blockMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

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
    ...(onColorClick ? [{ key: "color" as const, label: "Farbe", Icon: Palette, onClick: onColorClick }] : []),
    { key: "delete", label: "Delete", Icon: Trash2, onClick: onDelete, isDanger: true },
  ];

  return (
    <Box className={className} sx={{ position: "relative", userSelect: "none", overflow: "visible" }}>
      <Box
        ref={wrapperRef}
        sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}
        data-open={open ? "true" : "false"}
      >
        <MsqdxIconButton
          size="xs"
          onClick={toggle}
          onMouseDown={blockMouseDown}
          title={open ? "Toolbar ausblenden" : "Toolbar anzeigen"}
          aria-label={open ? "Toolbar ausblenden" : "Toolbar anzeigen"}
          sx={{
            ...TOOLBAR_TRIGGER_STYLE,
            "&:hover": {
              backgroundColor: MSQDX_BRAND_COLOR_CSS,
              color: "#fff",
            },
            ...(open ? { boxShadow: `0 0 0 2px ${MSQDX_BRAND_COLOR_CSS}` } : {}),
          }}
        >
          {open ? <X size={14} /> : <MoreHorizontal size={14} />}
        </MsqdxIconButton>

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
              gap: "4px",
              backgroundColor: "#fff",
              border: `1px solid ${MSQDX_NEUTRAL[200]}`,
              borderRadius: "9999px",
              padding: "6px 10px",
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
                    padding: "0 6px",
                    borderRadius: "9999px",
                    color: a.isDanger ? MSQDX_STATUS.error.base : undefined,
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
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
              overflow: "visible",
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
              return (
                <MsqdxIconButton
                  key={a.key}
                  size="xs"
                  data-prismion-radial-button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    a.onClick?.();
                  }}
                  onMouseDown={blockMouseDown}
                  title={a.label}
                  sx={{
                    position: "absolute",
                    left: tx,
                    top: ty,
                    transform: "translate(-50%, -50%)",
                    color: a.isDanger ? MSQDX_STATUS.error.base : undefined,
                  }}
                >
                  <a.Icon size={12} />
                </MsqdxIconButton>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
