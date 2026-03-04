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
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import {
  MSQDX_SPACING,
  MSQDX_NEUTRAL,
  MSQDX_TYPOGRAPHY,
  MSQDX_BRAND_COLOR_CSS,
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
  /** When true, only the first result text is shown (no prompt, no tabs, minimal layout). Also enabled when prismion.id starts with "result-". */
  resultOnly?: boolean;
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
  resultOnly: resultOnlyProp = false,
}: MsqdxPrismionCardProps) {
  const resultOnly = resultOnlyProp || prismion.id.startsWith("result-");
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
        left: 0,
        top: 0,
        width: prismion.size.w,
        minHeight: collapsed ? 60 : 120,
        zIndex: Math.max(prismion.position.zIndex ?? 1, 1),
        display: "inline-block",
        "& .ports-wrapper": {
          opacity: 0,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        },
        "&:hover .ports-wrapper": {
          opacity: 1,
          /* Keep pointer-events: none on wrapper so input/buttons in card stay clickable; port buttons have pointer-events: auto and still receive clicks */
        },
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
          border: selected ? `2px solid ${MSQDX_BRAND_COLOR_CSS}` : `1px solid ${MSQDX_NEUTRAL[200]}`,
          opacity: prismion.state === "archived" ? 0.7 : prismion.state === "locked" ? 0.9 : 1,
          transition: "box-shadow 0.2s, border 0.2s",
          overflow: "visible",
          "&:hover": { boxShadow: MSQDX_EFFECTS.shadows.xl },
        }}
      >
        <Box className="ports-wrapper" sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <MsqdxPrismionPorts
            onConnectorClick={onConnectorClick}
            onConnectorDrag={onConnectorDrag}
            onCreatePrismion={(port, type) => onConnectorCreatePrismion?.(port, type)}
            onAttachToExisting={() => {}}
          />
        </Box>

        <Box sx={{ position: "relative", height: "100%", padding: "12px", display: "flex", flexDirection: "column" }}>
          {!resultOnly && (
            <Box
              sx={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                zIndex: 10,
                pointerEvents: "auto",
              }}
            >
              <MsqdxPrismionToolbar
                locked={prismion.state === "locked"}
                onLockToggle={onLockToggle}
                onDelete={onDelete}
                onBranch={() => {}}
                onMerge={onOpenMerge}
                onArchive={() => {}}
              />
            </Box>
          )}
          {resultOnly ? (
            /* Result-only: only show the first result text, no title/prompt/tabs */
            <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }} onClick={(e) => e.stopPropagation()}>
              {hasResults && results![0].type === "text" ? (
                <Box
                  sx={{
                    fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"],
                    fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
                    color: MSQDX_NEUTRAL[800],
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {results![0].content}
                </Box>
              ) : hasResults && results![0].type === "richtext" ? (
                <Box
                  sx={{
                    fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"],
                    fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
                    "& p": { margin: 0 },
                    "& a": { color: MSQDX_NEUTRAL[700], textDecoration: "underline" },
                  }}
                  dangerouslySetInnerHTML={{ __html: results![0].content }}
                />
              ) : null}
            </Box>
          ) : (
            <>
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 1 }}>
                <Box sx={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 1 }}>
                  {isEditing ? (
                    <MsqdxInput
                      value={editTitle}
                      onChange={(e) => setEditTitle((e.target as HTMLInputElement).value)}
                      onBlur={handleTitleBlur}
                      sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, fontWeight: 600, fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono }}
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
                        fontSize: MSQDX_TYPOGRAPHY.fontSize.xs,
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
                        sx={{ "& input": { fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"] } }}
                      />
                      <MsqdxButton size="small" variant="contained" onClick={handlePromptSubmit} sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"] }}>
                        Submit
                      </MsqdxButton>
                    </Box>
                  ) : (
                    <Box sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"], fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono, color: MSQDX_NEUTRAL[700], whiteSpace: "pre-wrap" }}>
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
            </>
          )}
        </Box>
      </MsqdxCard>
    </Box>
  );
}
