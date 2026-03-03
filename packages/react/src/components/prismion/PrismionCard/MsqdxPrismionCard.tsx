"use client";

import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Prismion, Position, Size, PortSide } from "../../../types/prismion";
import { MsqdxPrismionPorts } from "../PrismionPorts";
import { MsqdxPrismionToolbar } from "../PrismionToolbar";
import { MsqdxPrismionResult, type PrismionResultItem } from "../PrismionResult";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxInput } from "../../atoms/Input/MsqdxInput";
import { MsqdxBadge } from "../../atoms/Badge/MsqdxBadge";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import {
  MSQDX_SPACING,
  MSQDX_NEUTRAL,
  MSQDX_TYPOGRAPHY,
  MSQDX_COLORS,
  MSQDX_EFFECTS,
} from "@msqdx/tokens";

export interface MsqdxPrismionCardProps {
  prismion: Prismion;
  selected?: boolean;
  onSelect?: (multiSelect?: boolean) => void;
  onMove?: (position: Position) => void;
  onResize?: (size: Size) => void;
  onStartConnector?: (port: PortSide) => void;
  onOpenMerge?: () => void;
  onPromptSubmit?: (prompt: string) => void;
  onConnectorClick?: (port: PortSide) => void;
  onConnectorCreatePrismion?: (port: PortSide, type: "prompt" | "file" | "image" | "video" | "link") => void;
  onConnectorDrag?: (port: PortSide, event: React.MouseEvent) => void;
  onConnectorDrop?: (fromConnectorId: string, targetPort: PortSide) => void;
  isConnectorDragTarget?: boolean;
  className?: string;
  onLockToggle?: () => void;
  onDelete?: () => void;
  results?: PrismionResultItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mediaSize?: "sm" | "md" | "lg";
}

export function MsqdxPrismionCard({
  prismion,
  selected = false,
  onSelect,
  onPromptSubmit,
  onConnectorClick,
  onConnectorCreatePrismion,
  onConnectorDrag,
  onOpenMerge,
  onLockToggle,
  onDelete,
  results,
  collapsed = false,
  onToggleCollapse,
  className,
}: MsqdxPrismionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(prismion.title);
  const [promptInput, setPromptInput] = useState("");

  const isInitialState = !prismion.prompt || prismion.prompt.trim() === "";
  const hasResults = results && results.length > 0;

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handlePromptSubmit = () => {
    const value = promptInput.trim();
    if (value) {
      onPromptSubmit?.(value);
      setPromptInput("");
    }
  };

  return (
    <Box
      className={`group ${className ?? ""}`.trim()}
      sx={{
        position: "absolute",
        left: prismion.position.x,
        top: prismion.position.y,
        width: prismion.size.w,
        minHeight: collapsed ? 60 : 120,
        zIndex: Math.max(prismion.position.zIndex ?? 1, 1),
        display: "inline-block",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(e.shiftKey);
      }}
    >
      <MsqdxCard
        variant="flat"
        sx={{
          height: "100%",
          minHeight: collapsed ? 60 : 120,
          borderRadius: "32px",
          backgroundColor: "#fff",
          boxShadow: MSQDX_EFFECTS.shadows.lg,
          border: selected ? `2px solid ${MSQDX_COLORS.brand.green}` : `1px solid ${MSQDX_NEUTRAL[200]}`,
          opacity: prismion.state === "archived" ? 0.7 : prismion.state === "locked" ? 0.9 : 1,
          transition: "box-shadow 0.2s, border 0.2s",
          overflow: "visible",
          "&:hover": { boxShadow: MSQDX_EFFECTS.shadows.xl },
        }}
      >
        <MsqdxPrismionPorts
          onConnectorClick={onConnectorClick}
          onConnectorDrag={onConnectorDrag}
          onCreatePrismion={(port, type) => onConnectorCreatePrismion?.(port, type)}
          onAttachToExisting={() => {}}
        />

        <Box sx={{ position: "relative", height: "100%", padding: "12px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 1 }}>
            <Box sx={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 1 }}>
              {isEditing ? (
                <MsqdxInput
                  value={editTitle}
                  onChange={(e) => setEditTitle((e.target as HTMLInputElement).value)}
                  onBlur={handleTitleBlur}
                  sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, fontWeight: 600, fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <Box
                  component="h3"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  sx={{
                    fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
                    fontWeight: 600,
                    fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
                    color: MSQDX_NEUTRAL[900],
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {prismion.title}
                </Box>
              )}
            </Box>
            {!collapsed && (
              <MsqdxBadge
                color={prismion.state === "active" ? "primary" : "secondary"}
                label={prismion.state}
                size="small"
              />
            )}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse?.();
              }}
              aria-label={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </IconButton>
          </Box>

          {!collapsed && (
            <Box sx={{ flex: 1, minHeight: 0 }} onClick={(e) => e.stopPropagation()}>
              {isInitialState ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MsqdxInput
                    value={promptInput}
                    onChange={(e) => setPromptInput((e.target as HTMLInputElement).value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePromptSubmit()}
                    placeholder="Enter your prompt..."
                    fullWidth
                  />
                  <MsqdxButton size="small" variant="contained" onClick={handlePromptSubmit}>
                    Submit
                  </MsqdxButton>
                </Box>
              ) : (
                <Box sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono, color: MSQDX_NEUTRAL[700], whiteSpace: "pre-wrap" }}>
                  {prismion.prompt}
                </Box>
              )}

              {hasResults && (
                <Box sx={{ marginTop: 2 }}>
                  <MsqdxPrismionResult items={results} defaultTab="text" />
                </Box>
              )}
            </Box>
          )}

          <Box sx={{ marginTop: "auto", paddingTop: 1 }}>
            <MsqdxPrismionToolbar
              locked={prismion.state === "locked"}
              onLockToggle={onLockToggle}
              onDelete={onDelete}
              onBranch={() => {}}
              onMerge={onOpenMerge}
              onArchive={() => {}}
            />
          </Box>
        </Box>
      </MsqdxCard>
    </Box>
  );
}
