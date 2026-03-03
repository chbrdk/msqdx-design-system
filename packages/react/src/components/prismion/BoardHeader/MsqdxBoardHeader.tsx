"use client";

import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Sparkles, Check, X, Share2, Settings } from "lucide-react";
import type { Board, BoardParticipant } from "../../../types/prismion";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxInput } from "../../atoms/Input/MsqdxInput";
import { MsqdxAvatar } from "../../atoms/Avatar/MsqdxAvatar";
import { MsqdxBadge } from "../../atoms/Badge/MsqdxBadge";
import { MsqdxDialog } from "../../molecules/Dialog/MsqdxDialog";
import {
  MSQDX_SPACING,
  MSQDX_NEUTRAL,
  MSQDX_TYPOGRAPHY,
  MSQDX_COLORS,
  MSQDX_BRAND_PRIMARY,
} from "@msqdx/tokens";

export interface MsqdxBoardHeaderProps {
  board: Board;
  participants: BoardParticipant[];
  /** Full share URL (e.g. from generateBoardUrl(board.shareId)). If not provided, share modal shows a placeholder. */
  boardShareUrl?: string;
  onTitleChange?: (title: string) => void;
}

export function MsqdxBoardHeader({
  board,
  participants,
  boardShareUrl,
  onTitleChange,
}: MsqdxBoardHeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTitleSave = () => {
    onTitleChange?.(title);
    setIsEditingTitle(false);
  };

  const handleCopyLink = async () => {
    if (!boardShareUrl) return;
    try {
      await navigator.clipboard.writeText(boardShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const activeParticipants = participants.filter((p) => p.isActive);
  const displayUrl = boardShareUrl ?? "https://example.com/board/...";

  return (
    <>
      <Box
        component="header"
        sx={{
          backgroundColor: "#fff",
          borderBottom: `1px solid ${MSQDX_NEUTRAL[200]}`,
          padding: `${MSQDX_SPACING.padding.md}px ${MSQDX_SPACING.padding.xl}px`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: 32,
                height: 32,
                borderRadius: MSQDX_SPACING.borderRadius.sm,
                background: `linear-gradient(to right, ${MSQDX_BRAND_PRIMARY.purple}, #9333ea)`,
              }}
            >
              <Sparkles size={16} color="#fff" />
            </Box>
            <Box component="span" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, fontWeight: 500, color: MSQDX_NEUTRAL[500] }}>
              PRISMORA
            </Box>
            <Box sx={{ width: 1, height: 24, backgroundColor: MSQDX_NEUTRAL[300] }} />
            {isEditingTitle ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MsqdxInput
                  value={title}
                  onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTitleSave();
                    if (e.key === "Escape") {
                      setTitle(board.title);
                      setIsEditingTitle(false);
                    }
                  }}
                  sx={{ minWidth: 200, fontSize: "1.125rem", fontWeight: 600 }}
                  autoFocus
                />
                <IconButton size="small" onClick={handleTitleSave} aria-label="Save title">
                  <Check size={18} color={MSQDX_COLORS.brand.green} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    setTitle(board.title);
                    setIsEditingTitle(false);
                  }}
                  aria-label="Cancel"
                >
                  <X size={18} />
                </IconButton>
              </Box>
            ) : (
              <Box
                component="button"
                onClick={() => setIsEditingTitle(true)}
                sx={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: MSQDX_NEUTRAL[900],
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  "&:hover": { color: MSQDX_COLORS.brand.green },
                }}
              >
                {board.title}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {activeParticipants.length > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", "& > *": { marginLeft: -8 }, "& > *:first-of-type": { marginLeft: 0 } }}>
                  {activeParticipants.slice(0, 5).map((p) => (
                    <MsqdxAvatar
                      key={p.id}
                      size="sm"
                      fallback={p.userName.charAt(0).toUpperCase()}
                      sx={{
                        border: `2px solid #fff`,
                        backgroundColor: p.userColor ?? MSQDX_NEUTRAL[500],
                      }}
                    />
                  ))}
                </Box>
                <MsqdxBadge color="secondary" label={`${activeParticipants.length} online`} size="small" />
              </Box>
            )}
            <MsqdxButton variant="outlined" size="small" onClick={() => setIsShareModalOpen(true)}>
              <Share2 size={16} style={{ marginRight: 8 }} />
              Teilen
            </MsqdxButton>
            <MsqdxButton variant="outlined" size="small" aria-label="Board settings">
              <Settings size={18} />
            </MsqdxButton>
          </Box>
        </Box>
      </Box>

      <MsqdxDialog
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Board teilen"
        actions={
          <MsqdxButton variant="outlined" onClick={() => setIsShareModalOpen(false)}>
            Schließen
          </MsqdxButton>
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Box component="p" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, color: MSQDX_NEUTRAL[600], marginBottom: 1 }}>
              Teile diesen Link, damit andere deinem Board beitreten können:
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <MsqdxInput value={displayUrl} readOnly fullWidth sx={{ fontFamily: "monospace", fontSize: MSQDX_TYPOGRAPHY.fontSize.sm }} />
              <MsqdxButton variant="outlined" onClick={handleCopyLink} disabled={!boardShareUrl}>
                {copied ? (
                  <>
                    <Check size={16} style={{ marginRight: 8 }} />
                    Kopiert!
                  </>
                ) : (
                  "Kopieren"
                )}
              </MsqdxButton>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: `${MSQDX_COLORS.brand.green}14`,
              borderRadius: MSQDX_SPACING.borderRadius.sm,
              padding: MSQDX_SPACING.padding.md,
            }}
          >
            <Box component="p" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, fontWeight: 500, color: MSQDX_NEUTRAL[900], marginBottom: 0.5 }}>
              Öffentlicher Zugang
            </Box>
            <Box component="p" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.sm, color: MSQDX_NEUTRAL[700] }}>
              Jeder mit diesem Link kann dem Board beitreten und mitarbeiten. Du kannst die Berechtigung in den Board-Einstellungen ändern.
            </Box>
          </Box>
        </Box>
      </MsqdxDialog>
    </>
  );
}
