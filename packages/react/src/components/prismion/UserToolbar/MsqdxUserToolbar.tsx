"use client";

import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Settings, X } from "lucide-react";
import { MsqdxAvatar } from "../../atoms/Avatar/MsqdxAvatar";
import { MsqdxInput } from "../../atoms/Input/MsqdxInput";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxSwitchField } from "../../molecules/Switch/MsqdxSwitchField";
import { MsqdxDialog } from "../../molecules/Dialog/MsqdxDialog";
import {
  MSQDX_SPACING,
  MSQDX_NEUTRAL,
  MSQDX_TYPOGRAPHY,
} from "@msqdx/tokens";

export interface MsqdxUserToolbarProps {
  displayName: string;
  avatarUrl?: string;
  onChangeName: (name: string) => void;
  onChangeAvatar: (url: string) => void;
  onToggleFollow?: (enabled: boolean) => void;
  presenterMode?: boolean;
  onPresenterModeChange?: (enabled: boolean) => void;
  variant?: "default" | "compact";
  className?: string;
}

export function MsqdxUserToolbar({
  displayName,
  avatarUrl,
  onChangeName,
  onChangeAvatar,
  onToggleFollow,
  presenterMode = false,
  onPresenterModeChange,
  variant = "default",
  className,
}: MsqdxUserToolbarProps) {
  const [localFollow, setLocalFollow] = useState(false);
  const [open, setOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState(displayName);
  const [avatarDraft, setAvatarDraft] = useState(avatarUrl ?? "");

  return (
    <Box
      className={className}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 2,
        border: `1px solid ${MSQDX_NEUTRAL[200]}`,
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: `${MSQDX_SPACING.padding.xs}px ${MSQDX_SPACING.padding.sm}px`,
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        pointerEvents: "auto",
      }}
    >
      <MsqdxAvatar
        size="sm"
        variant="circle"
        fallback={(displayName?.[0] ?? "U").toUpperCase()}
        src={avatarUrl}
      />
      <IconButton
        size="small"
        aria-label="Open settings"
        onClick={() => {
          setNameDraft(displayName);
          setAvatarDraft(avatarUrl ?? "");
          setOpen(true);
        }}
        sx={{ padding: 0.5 }}
      >
        <Settings size={16} color={MSQDX_NEUTRAL[600]} />
      </IconButton>
      {variant === "default" && (
        <>
          <Box
            sx={{
              width: 1,
              height: 24,
              backgroundColor: MSQDX_NEUTRAL[200],
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box component="span" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, color: MSQDX_NEUTRAL[600] }}>
              Presenter
            </Box>
            <MsqdxSwitchField
              checked={presenterMode}
              onChange={(_, checked) => onPresenterModeChange?.(checked)}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box component="span" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, color: MSQDX_NEUTRAL[600] }}>
              Follow me
            </Box>
            <MsqdxSwitchField
              checked={localFollow}
              onChange={(_, checked) => {
                setLocalFollow(checked);
                onToggleFollow?.(checked);
              }}
            />
          </Box>
        </>
      )}

      <MsqdxDialog
        open={open}
        onClose={() => setOpen(false)}
        title="User Settings"
        actions={
          <>
            <MsqdxButton size="small" variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </MsqdxButton>
            <MsqdxButton
              size="small"
              variant="contained"
              onClick={() => {
                onChangeName(nameDraft.trim());
                onChangeAvatar(avatarDraft.trim());
                setOpen(false);
              }}
            >
              Save
            </MsqdxButton>
          </>
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Box component="label" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, color: MSQDX_NEUTRAL[600] }}>
              Display name
            </Box>
            <MsqdxInput
              value={nameDraft}
              onChange={(e) => setNameDraft((e.target as HTMLInputElement).value)}
              placeholder="Your name"
              fullWidth
              sx={{ mt: 0.5 }}
            />
          </Box>
          <Box>
            <Box component="label" sx={{ fontSize: MSQDX_TYPOGRAPHY.fontSize.xs, color: MSQDX_NEUTRAL[600] }}>
              Avatar URL
            </Box>
            <MsqdxInput
              value={avatarDraft}
              onChange={(e) => setAvatarDraft((e.target as HTMLInputElement).value)}
              placeholder="https://..."
              fullWidth
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>
      </MsqdxDialog>
    </Box>
  );
}
