"use client";

import React from "react";
import { Box } from "@mui/material";
import { MSQDX_ICONS } from "@msqdx/tokens";

/** Converts legacy names (Add, AddOutlined, CheckCircle) to Material Symbols id (add, check_circle). */
function toMaterialSymbolId(name: string): string {
  const base = name.replace(/Outlined$/i, "");
  const withUnderscores = base.replace(/([A-Z])/g, "_$1").replace(/^_/, "");
  return withUnderscores.toLowerCase();
}

export type IconName = string;

export interface MsqdxIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Icon name – Material-style; "Outlined" stripped, PascalCase → symbol id (e.g. Add → add). */
  name: string;
  /** Token size. @default 'md' */
  size?: keyof typeof MSQDX_ICONS.sizes;
  /** Custom size in px (overrides size). */
  customSize?: number;
  /** Weight (100–700). @default 'thin' */
  weight?: keyof typeof MSQDX_ICONS.weight;
  /** Decorative = aria-hidden when no aria-label/title. */
  decorative?: boolean;
  /** MUI-style sx (optional); when set, icon is wrapped in a Box for styling. */
  sx?: Record<string, unknown> | ((theme: unknown) => Record<string, unknown>);
}

/**
 * MsqdxIcon – Material Symbols (Outlined) via Google Fonts variable font.
 * Weights from MSQDX_ICONS.weight (thin=100 … bold=500).
 * Requires Material Symbols Outlined font (e.g. in Storybook preview-head.html or app index.html).
 */
export const MsqdxIcon = ({
  name,
  size = "md",
  customSize,
  weight = MSQDX_ICONS.defaultWeight,
  decorative,
  style,
  sx,
  ...props
}: MsqdxIconProps) => {
  const isDecorative = decorative ?? (props["aria-label"] == null && props.title == null);
  const iconId = toMaterialSymbolId(name);
  const pixelSize = customSize ?? MSQDX_ICONS.sizes[size];
  const fontWeight = MSQDX_ICONS.weight[weight];

  const icon = (
    <span
      className="msqdx-material-symbol material-symbols-outlined"
      aria-hidden={isDecorative ? true : undefined}
      style={{
        fontFamily: "'Material Symbols Outlined', sans-serif",
        fontSize: pixelSize,
        fontVariationSettings: `'wght' ${fontWeight}, 'FILL' 0, 'GRAD' 0, 'opsz' ${Math.min(48, Math.max(20, pixelSize))}`,
        color: 'currentColor',
        ...style,
      }}
      {...props}
    >
      {iconId}
    </span>
  );

  if (sx != null) {
    return <Box component="span" sx={sx as any}>{icon}</Box>;
  }
  return icon;
};
