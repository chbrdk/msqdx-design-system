"use client";

import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { MSQDX_LAYOUT } from "@msqdx/tokens";
import type { ReactNode } from "react";

const LAYOUT_ASPECT_RATIO = MSQDX_LAYOUT.aspectRatio ?? {};
const LAYOUT_OBJECT_FIT = (MSQDX_LAYOUT as { objectFit?: Record<string, string> }).objectFit ?? {
  cover: "cover",
  contain: "contain",
  fill: "fill",
  none: "none",
};

export type AspectRatioKey = "square" | "video" | "photo" | "portrait" | "wide" | "ultrawide";
export type ObjectFitKey = "cover" | "contain" | "fill" | "none";

export interface MsqdxAspectRatioProps extends Omit<BoxProps, "component"> {
  /** Aspect ratio from layout tokens (e.g. square, video, photo). */
  ratio: AspectRatioKey;
  /** Object fit for img/video children. @default 'cover' */
  objectFit?: ObjectFitKey;
  children: ReactNode;
}

/**
 * MsqdxAspectRatio
 *
 * Wrapper that enforces an aspect ratio (from tokens). Use for card media,
 * thumbnails, or any fixed-ratio content. Children (e.g. img) are clipped to the box;
 * use objectFit to control how they fill the area.
 */
export const MsqdxAspectRatio = ({
  ratio,
  objectFit = "cover",
  children,
  sx,
  ...props
}: MsqdxAspectRatioProps) => {
  const ratioCss = LAYOUT_ASPECT_RATIO[ratio] ?? "16 / 9";
  const fit = LAYOUT_OBJECT_FIT[objectFit] ?? "cover";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        aspectRatio: ratioCss,
        display: "block",
        "& > img, & > video": {
          width: "100%",
          height: "100%",
          objectFit: fit,
          display: "block",
          verticalAlign: "middle",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
