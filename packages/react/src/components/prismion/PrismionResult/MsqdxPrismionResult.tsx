"use client";

import React from "react";
import { Box, styled } from "@mui/material";
import { MsqdxTabs } from "../../molecules/Tabs/MsqdxTabs";
import { MarkdownContent } from "./MarkdownContent";
import { MSQDX_SPACING, MSQDX_TYPOGRAPHY, MSQDX_NEUTRAL, MSQDX_EFFECTS } from "@msqdx/tokens";

export type PrismionResultItem =
  | { type: "text"; content: string }
  | { type: "richtext"; content: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "video"; url: string; poster?: string }
  | { type: "link"; url: string; label?: string };

export interface MsqdxPrismionResultProps {
  items: PrismionResultItem[];
  defaultTab?: string;
  className?: string;
}

function labelFor(item: PrismionResultItem, idx: number): string {
  switch (item.type) {
    case "text":
      return `Text ${idx + 1}`;
    case "richtext":
      return `Rich Text ${idx + 1}`;
    case "image":
      return "Image";
    case "video":
      return "Video";
    case "link":
      return "Link";
  }
}

const RichContentBox = styled(Box)(() => ({
  fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"],
  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
  "& p": { margin: 0 },
  "& a": { color: MSQDX_NEUTRAL[700], textDecoration: "underline" },
})) as React.ComponentType<any>;

export function MsqdxPrismionResult({ items, defaultTab, className }: MsqdxPrismionResultProps) {
  const tabs = items.map((item, idx) => ({ value: `${item.type}-${idx}`, item }));
  const first = tabs[0]?.value ?? "none";
  const initial = defaultTab && tabs.some((t) => t.value === defaultTab) ? defaultTab : first;
  const [activeTab, setActiveTab] = React.useState(initial);

  return (
    <Box className={className} sx={{ width: "100%" }}>
      <MsqdxTabs
        value={activeTab}
        onChange={(v) => setActiveTab(String(v))}
        tabs={tabs.map((t, idx) => ({ value: t.value, label: labelFor(t.item, idx) }))}
        compact
      />
      <Box sx={{ mt: 0 }}>
        {tabs.map((t) => (
          <Box
            key={t.value}
            role="tabpanel"
            hidden={activeTab !== t.value}
            sx={{ display: activeTab === t.value ? "block" : "none" }}
          >
            {t.item.type === "text" && (
              <MarkdownContent content={t.item.content} />
            )}
            {t.item.type === "richtext" && (
              <RichContentBox dangerouslySetInnerHTML={{ __html: t.item.content }} />
            )}
            {t.item.type === "image" && (
              <Box
                component="img"
                src={t.item.url}
                alt={t.item.alt ?? ""}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  border: `1px solid ${MSQDX_NEUTRAL[200]}`,
                  overflow: "hidden",
                }}
              />
            )}
            {t.item.type === "video" && (
              <Box
                component="video"
                src={t.item.url}
                poster={t.item.poster}
                controls
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                  border: `1px solid ${MSQDX_NEUTRAL[200]}`,
                  overflow: "hidden",
                }}
              />
            )}
            {t.item.type === "link" && (
              <Box
                component="a"
                href={t.item.url}
                target="_blank"
                rel="noreferrer"
                sx={{
                  color: MSQDX_NEUTRAL[700],
                  textDecoration: "underline",
                  fontSize: MSQDX_TYPOGRAPHY.fontSize["2xs"],
                  fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
                }}
              >
                {t.item.label ?? t.item.url}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
