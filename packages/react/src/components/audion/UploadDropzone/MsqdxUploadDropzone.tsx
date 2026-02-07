"use client";

import { useCallback, useRef, useState } from "react";
import { Box } from "@mui/material";
import { MSQDX_SPACING, MSQDX_EFFECTS, MSQDX_LAYOUT } from "@msqdx/tokens";
import type { BrandColor, CardVariant } from "../../atoms/Card/MsqdxCard";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import { MsqdxButton } from "../../atoms/Button/MsqdxButton";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";

export type UploadDropzoneStatus = {
  label: string;
  progress: number;
  variant: "idle" | "processing" | "success" | "error";
};

export interface MsqdxUploadDropzoneProps {
  onFileSelect: (file: File) => Promise<void>;
  status?: UploadDropzoneStatus;
  /** Card surface: flat, glass, elevated. @default 'flat' */
  variant?: CardVariant;
  /** Brand color for border/hover. */
  brandColor?: BrandColor;
  /** Hover lift + shadow. @default true */
  hoverable?: boolean;
  /** Border radius from MSQDX_SPACING.borderRadius. @default 'button' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
}

export function MsqdxUploadDropzone({
  onFileSelect,
  status,
  variant = "flat",
  brandColor,
  hoverable = true,
  borderRadius = "button",
}: MsqdxUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    async (files?: FileList | null) => {
      if (!files?.length) return;
      await onFileSelect(files[0]);
    },
    [onFileSelect]
  );

  const transition = MSQDX_EFFECTS.transitions.standard;

  return (
    <MsqdxCard
      variant={variant}
      brandColor={brandColor}
      hoverable={hoverable}
      borderRadius={borderRadius}
      clickable
      sx={{
        borderStyle: "dashed",
        overflow: "hidden",
        bgcolor: isDragging ? "action.hover" : undefined,
        transition: `background-color ${transition}, border-color ${transition}, box-shadow ${transition}, transform ${transition}`,
        "& > div:last-of-type": {
          padding: `${MSQDX_SPACING.scale.xl}px`,
        },
      }}
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        await handleFiles(e.dataTransfer?.files);
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.docx,.pptx,.mp3"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: MSQDX_LAYOUT.direction.column,
          alignItems: MSQDX_LAYOUT.alignment.align.center,
          justifyContent: MSQDX_LAYOUT.alignment.justify.center,
          gap: `${MSQDX_SPACING.gap.md}px`,
          textAlign: MSQDX_LAYOUT.alignment.text.center,
        }}
      >
        <MsqdxIcon name="cloud_upload" customSize={56} />
        <MsqdxTypography variant="h6">Drop your research</MsqdxTypography>
        <MsqdxTypography variant="body2" color="text.secondary">
          PDF, DOCX, PPTX, MP3
        </MsqdxTypography>
        <MsqdxButton brandColor="green">Select file</MsqdxButton>
        {status && status.variant !== "idle" && (
          <MsqdxTypography variant="body2">{status.label}</MsqdxTypography>
        )}
      </Box>
    </MsqdxCard>
  );
}
