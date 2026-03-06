"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronDown, ChevronUp, Plug } from "lucide-react";
import type { Prismion, Position, Size, PortSide } from "../../../types/prismion";
import { MsqdxPrismionPorts } from "../PrismionPorts";
import { MsqdxPrismionToolbar } from "../PrismionToolbar";
import { MsqdxPrismionResult, type PrismionResultItem } from "../PrismionResult";
import { MarkdownContent } from "../PrismionResult/MarkdownContent";
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
  /** When true, show CHECKION MCP option in the port menu. */
  showCheckionMcpOption?: boolean;
  /** Whether CHECKION MCP is enabled (for port menu option). */
  checkionMcpEnabled?: boolean;
  /** Called when user toggles CHECKION MCP in the port menu. */
  onCheckionMcpToggle?: () => void;
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
  onResize,
  results,
  collapsed = false,
  onToggleCollapse,
  className,
  resultOnly: resultOnlyProp = false,
  showCheckionMcpOption = false,
  checkionMcpEnabled = false,
  onCheckionMcpToggle,
}: MsqdxPrismionCardProps) {
  const resultOnly = resultOnlyProp || prismion.id.startsWith("result-");
  const isToolCard = prismion.kind === "tool";
  const rootRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !onResize) return;
    const minH = prismion.size.minH ?? 120;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w < 20 || h < 20) return;
      onResize({ w, h: Math.max(h, minH) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [onResize, prismion.size.minW, prismion.size.minH]);
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

  const resizeStartRef = useRef<{ x: number; y: number; rectW: number; rectH: number } | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0 || !onResize) return;
      e.preventDefault();
      e.stopPropagation();
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setIsResizing(true);
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        rectW: rect.width,
        rectH: rect.height,
      };
    },
    [onResize]
  );

  useEffect(() => {
    if (!isResizing || !onResize) return;
    const minW = prismion.size.minW ?? 200;
    const minH = prismion.size.minH ?? 120;
    const onMove = (e: MouseEvent) => {
      const s = resizeStartRef.current;
      if (!s) return;
      const newW = Math.max(minW, Math.round(s.rectW + (e.clientX - s.x)));
      const newH = Math.max(minH, Math.round(s.rectH + (e.clientY - s.y)));
      onResize({ w: newW, h: newH });
    };
    const onUp = () => {
      setIsResizing(false);
      resizeStartRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isResizing, onResize, prismion.size.minW, prismion.size.minH]);

  return (
    <Box
      ref={rootRef}
      className={`group ${className ?? ""}`.trim()}
      data-resizing={isResizing || undefined}
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: prismion.size.w,
        height: isToolCard ? prismion.size.h : undefined,
        minHeight: isToolCard ? undefined : (collapsed ? 60 : 120),
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
        "& .resize-handle": {
          opacity: 0,
          transition: "opacity 0.2s ease",
        },
        "&:hover .resize-handle, &[data-resizing] .resize-handle": {
          opacity: 1,
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(e.shiftKey);
      }}
    >
      {onResize && !isToolCard && (
        <Box
          className="resize-handle"
          onMouseDown={handleResizeStart}
          aria-label="Größe ändern"
          title="Ziehen zum Vergrößern oder Verkleinern"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 20,
            height: 20,
            cursor: "nwse-resize",
            zIndex: 11,
            pointerEvents: "auto",
            borderRight: `2px solid ${MSQDX_BRAND_COLOR_CSS}`,
            borderBottom: `2px solid ${MSQDX_BRAND_COLOR_CSS}`,
            borderBottomRightRadius: 6,
            boxSizing: "border-box",
            "&:hover": {
              borderColor: MSQDX_NEUTRAL[400],
              backgroundColor: "color-mix(in srgb, var(--color-theme-accent, #00ca55) 12%, transparent)",
            },
          }}
        />
      )}
      <MsqdxCard
        variant="flat"
        sx={{
          height: "100%",
          minHeight: isToolCard ? undefined : (collapsed ? 60 : 120),
          display: "flex",
          flexDirection: "column",
          borderRadius: isToolCard ? "50%" : "32px",
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
            showCheckionMcpOption={showCheckionMcpOption}
            checkionMcpEnabled={checkionMcpEnabled}
            onCheckionMcpToggle={onCheckionMcpToggle}
          />
        </Box>

        {isToolCard ? (
          <Box sx={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }} onClick={(e) => e.stopPropagation()}>
            <Plug size={28} color={MSQDX_BRAND_COLOR_CSS} strokeWidth={2} style={{ flexShrink: 0 }} />
          </Box>
        ) : (
        <Box sx={{ position: "relative", height: "100%", padding: "12px", display: "flex", flexDirection: "column" }}>
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
          {resultOnly ? (
            /* Result-only: only show the first result text, no title/prompt/tabs */
            <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }} onClick={(e) => e.stopPropagation()}>
              {hasResults && results![0].type === "text" ? (
                <MarkdownContent content={results![0].content} />
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
                <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }} onClick={(e) => e.stopPropagation()}>
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
        )}
      </MsqdxCard>
    </Box>
  );
}
