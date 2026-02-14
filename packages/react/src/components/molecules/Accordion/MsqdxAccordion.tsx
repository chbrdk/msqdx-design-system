"use client";

import React, { useCallback, createContext, useContext, useMemo, useState, useRef, useEffect } from "react";
import { Box, Collapse, alpha, styled, useTheme } from "@mui/material";
import {
  MSQDX_COLORS,
  MSQDX_EFFECTS,
  MSQDX_NEUTRAL,
  MSQDX_SPACING,
  MSQDX_THEME,
  MSQDX_TYPOGRAPHY,
} from "@msqdx/tokens";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MsqdxLabel } from "../../atoms/Label/MsqdxLabel";
import type { LabelSize } from "../../atoms/Label/MsqdxLabel";

export type AccordionOrientation = "vertical" | "horizontal";

export type AccordionSize = "small" | "medium" | "large";

/** Border radius: keys from MSQDX_SPACING.borderRadius (design tokens). */
export type AccordionBorderRadius = keyof typeof MSQDX_SPACING.borderRadius;

/** Brand color for accordion and expand-icon border. */
export type AccordionBrandColor = "purple" | "yellow" | "pink" | "orange" | "green" | "black";

function getAccordionBorderColor(brandColor?: AccordionBrandColor): string {
  if (!brandColor) return MSQDX_NEUTRAL[200];
  if (brandColor === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[brandColor];
}

function getExpandIconBorderColor(brandColor?: AccordionBrandColor): string {
  if (!brandColor) return MSQDX_NEUTRAL[300];
  if (brandColor === "black") return MSQDX_COLORS.brand.black;
  return MSQDX_COLORS.brand[brandColor];
}

type AccordionContextValue = {
  expandedRef: React.MutableRefObject<Set<string>>;
  subscribe: (id: string, callback: () => void) => () => void;
  /** Subscribe to any expand/collapse (for horizontal layout; only horizontal items use this). */
  subscribeToAny: (callback: () => void) => () => void;
  onToggle: (id: string) => void;
  orientation: AccordionOrientation;
  size: AccordionSize;
  borderRadius: AccordionBorderRadius;
  borderColor: string;
  expandIconBorderColor: string;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useExpanded(id: string): boolean {
  const ctx = useContext(AccordionContext);
  const [expanded, setExpanded] = useState(() => ctx?.expandedRef.current.has(id) ?? false);
  useEffect(() => {
    if (!ctx) return;
    return ctx.subscribe(id, () => {
      setExpanded(ctx.expandedRef.current.has(id));
    });
  }, [id, ctx]);
  return expanded;
}

/** For horizontal layout only: re-render when any item expands/collapses. Vertical items skip subscribe to avoid re-renders. */
function useHorizontalLayout(orientation: AccordionOrientation): { hasExpanded: boolean; horizontalEqualDistribution: boolean } {
  const ctx = useContext(AccordionContext);
  const [state, setState] = useState(() => ({
    hasExpanded: (ctx?.expandedRef.current.size ?? 0) > 0,
    horizontalEqualDistribution: (ctx?.expandedRef.current.size ?? 0) === 0,
  }));
  useEffect(() => {
    if (!ctx || orientation !== "horizontal") return;
    return ctx.subscribeToAny(() => {
      const size = ctx.expandedRef.current.size;
      setState({ hasExpanded: size > 0, horizontalEqualDistribution: size === 0 });
    });
  }, [ctx, orientation]);
  return state;
}

const transitionExpand = MSQDX_EFFECTS.transitions.slow;
const transitionChevron = MSQDX_EFFECTS.transitions.standard;

const sizeToPadding = {
  small: { vertical: MSQDX_SPACING.scale.xs, horizontal: MSQDX_SPACING.scale.sm },
  medium: { vertical: MSQDX_SPACING.scale.sm, horizontal: MSQDX_SPACING.scale.md },
  large: { vertical: MSQDX_SPACING.scale.md, horizontal: MSQDX_SPACING.scale.lg },
} as const;

const sizeToLabelSize: Record<AccordionSize, LabelSize> = {
  small: "small",
  medium: "medium",
  large: "large",
};

function getBorderRadiusCss(key: AccordionBorderRadius): string {
  const value = MSQDX_SPACING.borderRadius[key];
  return typeof value === "number" ? `${value}px` : String(value);
}

const SummaryButton = styled("button", {
  shouldForwardProp: (p) => p !== "accordionSize",
})<{ accordionSize: AccordionSize }>(({ accordionSize }) => {
    const pad = sizeToPadding[accordionSize];
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      gap: MSQDX_SPACING.scale.xs,
      padding: `${pad.vertical}px ${pad.horizontal}px`,
      border: "none",
      borderBottom: `1px solid var(--accordion-separator, ${MSQDX_NEUTRAL[200]})`,
      background: "transparent",
      cursor: "pointer",
      textAlign: "left",
      color: "inherit",
      transition: `background-color ${transitionChevron}, border-color ${transitionChevron}`,
      "&:hover": {
        backgroundColor: `var(--accordion-hover-bg, ${MSQDX_NEUTRAL[100]})`,
      },
      "&:focus-visible": {
        outline: "2px solid currentColor",
        outlineOffset: 2,
      },
    };
  }
);

const SummaryButtonHorizontal = styled(SummaryButton)({
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  flex: "0 0 48px",
  width: 48,
  minWidth: 48,
  borderBottom: "none",
  borderRight: `1px solid var(--accordion-separator, ${MSQDX_NEUTRAL[200]})`,
});

/** Outline-style wrapper for the expand icon – round, border via sx from context. */
const ExpandIconButton = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 28,
  height: 28,
  padding: 0,
  border: "1px solid",
  borderRadius: MSQDX_SPACING.borderRadius.circle,
  background: "transparent",
  color: "inherit",
  transition: `background-color ${transitionChevron}, border-color ${transitionChevron}`,
  "& .msqdx-material-symbol": {
    transition: `transform ${transitionChevron}`,
  },
});

const DetailsVertical = styled(Box)({
  borderBottom: `1px solid var(--accordion-separator, ${MSQDX_NEUTRAL[200]})`,
  overflow: "hidden",
});

const DetailsInnerVertical = styled(Box)({
  fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
  lineHeight: MSQDX_TYPOGRAPHY.lineHeight.relaxed,
  color: "inherit",
});

const PanelHorizontal = styled(Box)<{ expanded: boolean; transition: string }>(
  ({ expanded, transition }) => ({
    overflow: "hidden",
    flex: expanded ? "1 1 0" : "0 0 0",
    minWidth: expanded ? 200 : 0,
    width: expanded ? undefined : 0,
    transition: `flex ${transition}, min-width ${transition}, opacity ${transition}`,
    opacity: expanded ? 1 : 0,
  })
);

const DetailsInnerHorizontal = styled(Box)({
  fontSize: MSQDX_TYPOGRAPHY.fontSize.sm,
  lineHeight: MSQDX_TYPOGRAPHY.lineHeight.relaxed,
  color: "inherit",
  whiteSpace: "normal",
  width: "100%",
  minWidth: 200,
});

export interface MsqdxAccordionItemProps {
  /** Unique id for this item */
  id: string;
  /** Header / summary content */
  summary: React.ReactNode;
  /** Panel content (details) */
  children: React.ReactNode;
  /** Optional ref for the item wrapper (e.g. for scroll-into-view) */
  wrapperRef?: (el: HTMLDivElement | null) => void;
  /** When used with highlightColor: show highlighted state (e.g. synced from another view) */
  highlighted?: boolean;
  /** Accent color for highlighted and hover state; enables wrapper styling when set */
  highlightColor?: string;
}

const itemWrapperSx = (highlightColor: string, highlighted: boolean) => ({
  transition: "background-color 0.15s, border-color 0.15s",
  backgroundColor: highlighted ? `${highlightColor}18` : "transparent",
  borderRadius: "8px",
  border: `1px solid ${highlighted ? highlightColor : "transparent"}`,
  "&:hover": {
    backgroundColor: `${highlightColor}18`,
    borderColor: highlightColor,
  },
});

export const MsqdxAccordionItem = ({
  id,
  summary,
  children,
  wrapperRef,
  highlighted = false,
  highlightColor,
}: MsqdxAccordionItemProps) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    console.warn("MsqdxAccordionItem must be used inside MsqdxAccordion");
    return null;
  }
  const { onToggle, orientation, size: accordionSize, expandIconBorderColor } = ctx;
  const expanded = useExpanded(id);
  const horizontalLayout = useHorizontalLayout(orientation);
  const hasExpanded = orientation === "horizontal" ? horizontalLayout.hasExpanded : false;
  const horizontalEqualDistribution = orientation === "horizontal" ? horizontalLayout.horizontalEqualDistribution : true;
  const isVertical = orientation === "vertical";
  const handleToggle = useCallback(() => onToggle(id), [id, onToggle]);

  const chevronRotate = useMemo(() => {
    if (isVertical) return expanded ? 180 : 0;
    return expanded ? 180 : -90; // horizontal: collapsed = right, expanded = down
  }, [isVertical, expanded]);

  const labelSize = sizeToLabelSize[accordionSize];
  const detailsPadding = sizeToPadding[accordionSize].horizontal;

  const summaryLabel =
    typeof summary === "string" ? (
      <MsqdxLabel size={labelSize}>{summary}</MsqdxLabel>
    ) : (
      summary
    );

  const summaryContent = (
    <>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          ...(isVertical ? {} : { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }),
        }}
      >
        {summaryLabel}
      </span>
      <ExpandIconButton
        sx={{
          borderColor: expandIconBorderColor,
          "& .msqdx-material-symbol": { transform: `rotate(${chevronRotate}deg)` },
          ".summary-button:hover &": {
            backgroundColor: alpha(expandIconBorderColor, 0.08),
            borderColor: expandIconBorderColor,
          },
        }}
      >
        <MsqdxIcon name="ExpandMore" size="sm" decorative />
      </ExpandIconButton>
    </>
  );

  const useWrapper = Boolean(wrapperRef ?? highlightColor);
  const wrapperSx = highlightColor ? itemWrapperSx(highlightColor, highlighted) : undefined;

  const innerVertical = (
    <Box component="div" role="presentation">
      <SummaryButton
        type="button"
        className="summary-button"
        accordionSize={accordionSize}
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
        id={`${id}-summary`}
      >
        {summaryContent}
      </SummaryButton>
      <Collapse
        in={expanded}
        timeout={{
          enter: parseInt(MSQDX_EFFECTS.duration.slow, 10) || 420,
          exit: parseInt(MSQDX_EFFECTS.duration.fast, 10) || 220,
        }}
        easing={{
          enter: MSQDX_EFFECTS.easing.easeInOut,
          exit: MSQDX_EFFECTS.easing.easeIn,
        }}
      >
        <DetailsVertical>
          <DetailsInnerVertical
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-summary`}
            sx={{ padding: `${detailsPadding}px` }}
          >
            {children}
          </DetailsInnerVertical>
        </DetailsVertical>
      </Collapse>
    </Box>
  );

  if (isVertical) {
    if (useWrapper) {
      return (
        <Box ref={wrapperRef} sx={wrapperSx} id={`${id}-wrapper`}>
          {innerVertical}
        </Box>
      );
    }
    return innerVertical;
  }

  const horizontalItemSx = horizontalEqualDistribution
    ? { flex: "1 1 0%", minWidth: 0, width: "auto" }
    : expanded
      ? { flex: "1 1 0%", minWidth: 0, width: "auto" }
      : { flex: "0 0 32px", minWidth: 32, width: 32 };

  const innerHorizontal = (
    <Box
      component="div"
      role="presentation"
      sx={{
        display: "flex",
        minHeight: 0,
        transition: `flex ${transitionExpand}, min-width ${transitionExpand}, width ${transitionExpand}`,
        ...horizontalItemSx,
      }}
    >
      <SummaryButtonHorizontal
        type="button"
        className="summary-button"
        accordionSize={accordionSize}
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
        id={`${id}-summary`}
      >
        {summaryContent}
      </SummaryButtonHorizontal>
      <PanelHorizontal expanded={expanded} transition={transitionExpand}>
        <DetailsInnerHorizontal
          id={`${id}-panel`}
          role="region"
          aria-labelledby={`${id}-summary`}
          sx={{ padding: `${detailsPadding}px` }}
        >
          {children}
        </DetailsInnerHorizontal>
      </PanelHorizontal>
    </Box>
  );

  if (useWrapper) {
    return (
      <Box ref={wrapperRef} sx={wrapperSx} id={`${id}-wrapper`}>
        {innerHorizontal}
      </Box>
    );
  }
  return innerHorizontal;
};

function normalizeExpanded(
  value: string | string[] | undefined,
  allowMultiple: boolean
): string[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function nextExpanded(
  current: string[],
  id: string,
  allowMultiple: boolean
): string[] {
  const has = current.includes(id);
  if (allowMultiple) {
    return has ? current.filter((x) => x !== id) : [...current, id];
  }
  return has ? [] : [id];
}

export interface MsqdxAccordionProps {
  /** Vertical (stacked) or horizontal (side-by-side) layout. @default 'vertical' */
  orientation?: AccordionOrientation;
  /** Size (padding + label size). @default 'medium' */
  size?: AccordionSize;
  /** Border radius from MSQDX_SPACING.borderRadius (e.g. none, xxs, xs, sm, md, lg, button, full). @default 'button' */
  borderRadius?: AccordionBorderRadius;
  /** Brand color for accordion border and expand-icon border. */
  brandColor?: AccordionBrandColor;
  /** Controlled: which item id(s) are expanded */
  expanded?: string | string[];
  /** Uncontrolled: initial expanded id(s) */
  defaultExpanded?: string | string[];
  /** Allow multiple panels open at once. @default false */
  allowMultiple?: boolean;
  /** Called when expansion changes (controlled or for logging) */
  onChange?: (expanded: string[]) => void;
  /** Accordion items (use MsqdxAccordionItem or pass items array) */
  children: React.ReactNode;
  /** Optional class name */
  className?: string;
  /** Optional sx */
  sx?: Record<string, unknown>;
}

export const MsqdxAccordion = ({
  orientation = "vertical",
  size = "medium",
  borderRadius: borderRadiusProp = "button",
  brandColor,
  expanded: expandedProp,
  defaultExpanded,
  allowMultiple = false,
  onChange,
  children,
  className,
  sx,
}: MsqdxAccordionProps) => {
  const borderColor = getAccordionBorderColor(brandColor);
  const expandIconBorderColor = getExpandIconBorderColor(brandColor);
  const separatorColor = brandColor
    ? alpha(borderColor, 0.35)
    : MSQDX_NEUTRAL[200];
  const hoverBg = brandColor
    ? alpha(borderColor, 0.08)
    : MSQDX_NEUTRAL[100];
  const [internalExpanded, setInternalExpanded] = useState<string[]>(() =>
    normalizeExpanded(defaultExpanded, allowMultiple)
  );

  const isControlled = expandedProp !== undefined;
  const expandedList = isControlled
    ? normalizeExpanded(expandedProp, allowMultiple)
    : internalExpanded;

  const effectiveExpanded = isControlled ? expandedList : internalExpanded;
  const expandedRef = useRef<Set<string>>(new Set(effectiveExpanded));
  const expandedListRef = useRef<string[]>(effectiveExpanded);
  const listenersRef = useRef<Map<string, Set<() => void>>>(new Map());
  const anyListenersRef = useRef<Set<() => void>>(new Set());

  expandedRef.current = new Set(effectiveExpanded);
  expandedListRef.current = effectiveExpanded;

  const subscribe = useCallback((id: string, callback: () => void) => {
    if (!listenersRef.current.has(id)) listenersRef.current.set(id, new Set());
    listenersRef.current.get(id)!.add(callback);
    return () => {
      listenersRef.current.get(id)?.delete(callback);
    };
  }, []);

  const subscribeToAny = useCallback((callback: () => void) => {
    anyListenersRef.current.add(callback);
    return () => {
      anyListenersRef.current.delete(callback);
    };
  }, []);

  const handleToggleStable = useCallback(
    (id: string) => {
      const next = nextExpanded(expandedListRef.current, id, allowMultiple);
      expandedRef.current = new Set(next);
      if (!isControlled) setInternalExpanded(next);
      onChange?.(next);
      listenersRef.current.get(id)?.forEach((cb) => cb());
      anyListenersRef.current.forEach((cb) => cb());
    },
    [allowMultiple, isControlled, onChange]
  );

  const contextValue = useMemo<AccordionContextValue>(
    () => ({
      expandedRef,
      subscribe,
      subscribeToAny,
      onToggle: handleToggleStable,
      orientation,
      size,
      borderRadius: borderRadiusProp,
      borderColor,
      expandIconBorderColor,
    }),
    [handleToggleStable, orientation, size, borderRadiusProp, borderColor, expandIconBorderColor]
  );

  const radiusValue = getBorderRadiusCss(borderRadiusProp);
  const theme = useTheme();
  const tokenBg =
    theme.palette.mode === "dark"
      ? MSQDX_THEME.dark.surface.primary
      : MSQDX_THEME.light.background.primary; // #ffffff in light mode

  return (
    <AccordionContext.Provider value={contextValue}>
      <Box
        className={className}
        sx={{
          display: "flex",
          flexDirection: orientation === "vertical" ? "column" : "row",
          width: orientation === "horizontal" ? "100%" : undefined,
          border: `1px solid ${borderColor}`,
          borderRadius: radiusValue,
          overflow: "hidden",
          backgroundColor: tokenBg,
          "--accordion-separator": separatorColor,
          "--accordion-hover-bg": hoverBg,
          ...(sx as object),
        }}
        role="region"
        aria-label="Accordion"
      >
        {children}
      </Box>
    </AccordionContext.Provider>
  );
};
