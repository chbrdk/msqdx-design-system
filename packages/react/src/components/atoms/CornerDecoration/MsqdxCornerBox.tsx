"use client";

import { Box, type BoxProps } from "@mui/material";
import { MSQDX_LAYOUT, MSQDX_SPACING, MSQDX_TYPOGRAPHY } from "@msqdx/tokens";
import type { ReactNode } from "react";
import { MsqdxDivider } from "../Divider/MsqdxDivider";
import { MsqdxLogo, type MsqdxLogoProps } from "../Logo/MsqdxLogo";
import { MsqdxLogoMark } from "../LogoMark/MsqdxLogoMark";

export type CornerStyle = "rounded" | "square" | "cutdown-a" | "cutdown-b";

/** Pro Ecke zwei Cutout-Varianten: z.B. unten rechts = an unterer Kante + rechter Seite (a) oder rechter Kante + unterer Seite (b). */
export type CutdownVariant = "a" | "b";

/** Padding: Token-Key aus MSQDX_SPACING.padding oder Zahl (px). */
export type PaddingValue = keyof typeof MSQDX_SPACING.padding | number;

/** Alignment: Token-Key aus MSQDX_LAYOUT.alignment.align (align-items). */
export type AlignValue = keyof typeof MSQDX_LAYOUT.alignment.align;

/** Alignment: Token-Key aus MSQDX_LAYOUT.alignment.justify (justify-content). */
export type JustifyValue = keyof typeof MSQDX_LAYOUT.alignment.justify;

function resolvePadding(v: PaddingValue | undefined): number | undefined {
  if (v === undefined) return undefined;
  if (typeof v === "number") return v;
  return MSQDX_SPACING.padding[v] ?? undefined;
}

export interface MsqdxCornerBoxProps
  extends Omit<BoxProps, "borderRadius" | "padding" | "paddingX" | "paddingY" | "alignItems" | "justifyContent"> {
  /**
   * Top-left: rounded, square, oder cutdown-a / cutdown-b (zwei Anheft-Varianten).
   * @default 'rounded'
   */
  topLeft?: CornerStyle;
  topRight?: CornerStyle;
  bottomLeft?: CornerStyle;
  bottomRight?: CornerStyle;
  /**
   * Border radius in px; gilt für rounded und für den Cutout-Kreis (Fallback pro Ecke).
   * @default MSQDX_SPACING.borderRadius.md (20)
   */
  borderRadius?: number;
  /**
   * Radius pro Ecke (px); überschreibt borderRadius für die jeweilige Ecke.
   */
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  /**
   * Innenabstand (alle Seiten). Token: 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl', oder Zahl in px.
   */
  padding?: PaddingValue;
  /**
   * Innenabstand horizontal (links + rechts).
   */
  paddingX?: PaddingValue;
  /**
   * Innenabstand vertikal (oben + unten).
   */
  paddingY?: PaddingValue;
  /**
   * Logo anzeigen (nutzt MsqdxLogo). Bei true werden Standard-Optionen verwendet.
   */
  logo?: boolean | Partial<MsqdxLogoProps>;
  /**
   * Optionaler App-Name rechts neben dem Logo (Typo-Tokens); zwischen Logo und App-Name wird ein vertikaler Divider gerendert.
   */
  appName?: string;
  /**
   * Ausrichtung Haupt-Inhalt (justify-content). Token aus MSQDX_LAYOUT.alignment.justify.
   */
  justifyContent?: JustifyValue;
  /**
   * Ausrichtung Haupt-Inhalt (align-items). Token aus MSQDX_LAYOUT.alignment.align.
   */
  alignItems?: AlignValue;
  /**
   * Ausrichtung Header-Zeile (Logo/App-Name): justify-content. Token aus MSQDX_LAYOUT.alignment.justify.
   */
  headerJustify?: JustifyValue;
  /**
   * Ausrichtung Header-Zeile (Logo/App-Name): align-items. Token aus MSQDX_LAYOUT.alignment.align.
   */
  headerAlign?: AlignValue;
  children?: ReactNode;
}

function getRadius(style: CornerStyle, borderRadius: number): number {
  return style === "rounded" ? borderRadius : 0;
}

function isCutdown(style: CornerStyle): style is "cutdown-a" | "cutdown-b" {
  return style === "cutdown-a" || style === "cutdown-b";
}

function getCutdownVariant(style: "cutdown-a" | "cutdown-b"): CutdownVariant {
  return style === "cutdown-a" ? "a" : "b";
}

type CornerKey = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface CornerPatchDef {
  position: (size: number) => { top?: number; right?: number; bottom?: number; left?: number };
  maskCircle: string;
}

/**
 * 8 Optionen: 4 Ecken × 2 Cutout-Varianten.
 * (a) Patch an erster Kante/Seite, (b) Patch an zweiter Kante/Seite.
 * maskCircle = Stelle im Patch, an der die Box-Ecke liegt (dort der runde Cutout).
 */
const CUTDOWN_DEFS: Record<CornerKey, { a: CornerPatchDef; b: CornerPatchDef }> = {
  topLeft: {
    a: { position: (s) => ({ top: 0, left: -s }), maskCircle: "0% 100%" },
    b: { position: (s) => ({ top: -s, left: 0 }), maskCircle: "100% 0%" },
  },
  topRight: {
    a: { position: (s) => ({ top: 0, right: -s }), maskCircle: "100% 100%" },
    b: { position: (s) => ({ top: -s, right: 0 }), maskCircle: "0% 0%" },
  },
  bottomLeft: {
    a: { position: (s) => ({ bottom: 0, left: -s }), maskCircle: "0% 0%" },
    b: { position: (s) => ({ bottom: -s, left: 0 }), maskCircle: "100% 100%" },
  },
  bottomRight: {
    a: { position: (s) => ({ bottom: 0, right: -s }), maskCircle: "100% 0%" },
    b: { position: (s) => ({ bottom: -s, right: 0 }), maskCircle: "0% 100%" },
  },
};

interface CutdownPatchProps {
  corner: CornerKey;
  variant: CutdownVariant;
  R: number;
}

/** Ein Patch pro Ecke: Position + Kreismaske, background von Box geerbt. Radius R wie bei rounded. */
function CutdownPatch({ corner, variant, R }: CutdownPatchProps) {
  const size = R;
  const def = CUTDOWN_DEFS[corner][variant];
  const mask = `radial-gradient(circle at ${def.maskCircle}, transparent 0, transparent ${size}px, white ${size}px)`;

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        width: size,
        height: size,
        ...def.position(size),
        background: "inherit",
        pointerEvents: "none",
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskPosition: "0 0",
        maskPosition: "0 0",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}

/**
 * Box mit pro-Ecke-Steuerung: rounded, square oder zwei Cutout-Varianten (cutdown-a / cutdown-b).
 * Pro Ecke zwei Anheft-Möglichkeiten (z.B. unten rechts: an unterer + rechter Kante vs. rechter + unterer Kante).
 */
export const MsqdxCornerBox = ({
  topLeft = "rounded",
  topRight = "rounded",
  bottomLeft = "rounded",
  bottomRight = "rounded",
  borderRadius = MSQDX_SPACING.borderRadius.md,
  topLeftRadius,
  topRightRadius,
  bottomLeftRadius,
  bottomRightRadius,
  padding,
  paddingX,
  paddingY,
  logo,
  appName,
  justifyContent,
  alignItems,
  headerJustify,
  headerAlign,
  sx,
  children,
  ...props
}: MsqdxCornerBoxProps) => {
  const r = {
    topLeft: topLeftRadius ?? borderRadius,
    topRight: topRightRadius ?? borderRadius,
    bottomLeft: bottomLeftRadius ?? borderRadius,
    bottomRight: bottomRightRadius ?? borderRadius,
  };

  const corners: { key: CornerKey; style: CornerStyle }[] = [
    { key: "topLeft", style: topLeft },
    { key: "topRight", style: topRight },
    { key: "bottomLeft", style: bottomLeft },
    { key: "bottomRight", style: bottomRight },
  ];
  const cutdownPatches = corners.filter((c) => isCutdown(c.style)) as { key: CornerKey; style: "cutdown-a" | "cutdown-b" }[];

  const p = resolvePadding(padding);
  const px = resolvePadding(paddingX);
  const py = resolvePadding(paddingY);

  const showLogo = logo === true || (typeof logo === "object" && logo != null);
  const logoProps = typeof logo === "object" && logo != null ? logo : {};
  const hasHeader = showLogo || appName != null;

  const hasAlignment = justifyContent != null || alignItems != null;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "visible",
        border: "none",
        borderWidth: 0,
        borderTopLeftRadius: getRadius(topLeft, r.topLeft),
        borderTopRightRadius: getRadius(topRight, r.topRight),
        borderBottomLeftRadius: getRadius(bottomLeft, r.bottomLeft),
        borderBottomRightRadius: getRadius(bottomRight, r.bottomRight),
        ...sx,
        ...(hasAlignment && {
          display: "flex",
          flexDirection: "column",
          ...(justifyContent != null && { justifyContent: MSQDX_LAYOUT.alignment.justify[justifyContent] }),
          ...(alignItems != null && { alignItems: MSQDX_LAYOUT.alignment.align[alignItems] }),
        }),
        ...(p !== undefined && { padding: `${p}px` }),
        ...(px !== undefined && { paddingLeft: `${px}px`, paddingRight: `${px}px` }),
        ...(py !== undefined && { paddingTop: `${py}px`, paddingBottom: `${py}px` }),
      }}
      {...props}
    >
      {hasHeader && (
        <Box
          sx={{
            display: "flex",
            alignItems: headerAlign != null ? MSQDX_LAYOUT.alignment.align[headerAlign] : "center",
            justifyContent: headerJustify != null ? MSQDX_LAYOUT.alignment.justify[headerJustify] : undefined,
            alignSelf: "stretch",
            minHeight: 28,
            gap: 0,
            marginBottom: children != null ? 1 : 0,
          }}
        >
          {showLogo && (
            <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <MsqdxLogoMark width={32} height={32} color={logoProps.color ?? "black"} />
              </Box>
              <Box sx={{ display: { xs: "none", md: "block" }, marginTop: "6px" }}>
                <MsqdxLogo size="small" {...logoProps} />
              </Box>
            </Box>
          )}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 0 }}>
            {showLogo && appName != null && (
              <MsqdxDivider orientation="vertical" spacing="sm" />
            )}
            {appName != null && (
              <Box
                component="span"
                sx={{
                  flexShrink: 0,
                  width: "fit-content",
                  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary,
                  fontSize: "1.3rem",
                  fontWeight: 200,
                  textTransform: "uppercase",
                }}
              >
                {appName}
              </Box>
            )}
          </Box>
        </Box>
      )}
      {children}
      {cutdownPatches.map(({ key, style }) => (
        <CutdownPatch
          key={`${key}-${style}`}
          corner={key}
          variant={getCutdownVariant(style)}
          R={r[key]}
        />
      ))}
    </Box>
  );
};
