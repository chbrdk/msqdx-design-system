"use client";

import type { ReactNode } from "react";
import { MsqdxCornerTabCard } from "../CornerTabCard/MsqdxCornerTabCard";
import { MSQDX_CORNER_TAB_SECTION_BORDER_RADIUS_PX } from "./corner-tab-section.constants";

export type MsqdxCornerTabSectionPlacement = "top-left" | "top-right";

export type MsqdxCornerTabSectionProps = {
  children: ReactNode;
  /** Corner tab region (icon, or heading + actions via {@link MsqdxCornerTabSectionTab}). */
  tab: ReactNode;
  /** Accessible name for the corner tab. */
  tabAriaLabel: string;
  /** @default 'top-right' */
  placement?: MsqdxCornerTabSectionPlacement;
  /**
   * When true, tab width follows content (heading + toolbar) and section gets toolbar spacing.
   * @default false
   */
  tabToolbar?: boolean;
  className?: string;
};

function joinClasses(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Section shell with a cutout corner tab and card body (no slider).
 * Wraps {@link MsqdxCornerTabCard} with standardized BEM classes for app-level styling.
 */
export function MsqdxCornerTabSection({
  children,
  tab,
  tabAriaLabel,
  placement = "top-right",
  tabToolbar = false,
  className,
}: MsqdxCornerTabSectionProps) {
  const placementSide = placement === "top-right" ? "right" : "left";

  return (
    <MsqdxCornerTabCard
      className={joinClasses(
        "msqdx-corner-tab-section",
        `msqdx-corner-tab-section--${placementSide}`,
        tabToolbar && "msqdx-corner-tab-section--with-toolbar",
        className
      )}
      placement={placement}
      tab={tab}
      tabWidthAuto={tabToolbar}
      tabAriaLabel={tabAriaLabel}
      bodyBorderRadiusPx={MSQDX_CORNER_TAB_SECTION_BORDER_RADIUS_PX}
      cornerBoxBorderRadiusPx={MSQDX_CORNER_TAB_SECTION_BORDER_RADIUS_PX}
      containerBorderRadiusPx={MSQDX_CORNER_TAB_SECTION_BORDER_RADIUS_PX}
      bodySx={{ pr: 0.25 }}
    >
      {children}
    </MsqdxCornerTabCard>
  );
}
