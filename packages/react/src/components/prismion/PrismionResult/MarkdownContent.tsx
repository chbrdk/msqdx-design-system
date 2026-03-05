"use client";

import React from "react";
import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { MSQDX_TYPOGRAPHY, MSQDX_NEUTRAL } from "@msqdx/tokens";

const fontSizeKey = "2xs" in MSQDX_TYPOGRAPHY.fontSize ? "2xs" : "xs";
const fontSize = MSQDX_TYPOGRAPHY.fontSize[fontSizeKey as keyof typeof MSQDX_TYPOGRAPHY.fontSize] ?? "12px";

const codeSx = {
  fontSize: "0.92em",
  fontFamily: "inherit",
  backgroundColor: MSQDX_NEUTRAL[100],
  padding: "0.12em 0.35em",
  borderRadius: 4,
  border: `1px solid ${MSQDX_NEUTRAL[200]}`,
};

const preSx = {
  margin: "0.5em 0",
  padding: "0.5em 0.75em",
  backgroundColor: MSQDX_NEUTRAL[100],
  borderRadius: 6,
  border: `1px solid ${MSQDX_NEUTRAL[200]}`,
  overflow: "auto" as const,
};

export interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <Box
      className={className}
      sx={{
        fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
        color: MSQDX_NEUTRAL[800],
        maxWidth: "100%",
        fontSize,
      }}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <Box component="p" sx={{ margin: "0 0 0.5em", lineHeight: 1.5 }}>{children}</Box>,
          h1: ({ children }) => (
            <Box component="h1" sx={{ fontSize: "1.15em", fontWeight: 700, margin: "0.75em 0 0.35em", color: MSQDX_NEUTRAL[900], lineHeight: 1.3 }}>{children}</Box>
          ),
          h2: ({ children }) => (
            <Box component="h2" sx={{ fontSize: "1.05em", fontWeight: 600, margin: "0.65em 0 0.3em", color: MSQDX_NEUTRAL[900], lineHeight: 1.35 }}>{children}</Box>
          ),
          h3: ({ children }) => (
            <Box component="h3" sx={{ fontSize: "1em", fontWeight: 600, margin: "0.5em 0 0.25em", color: MSQDX_NEUTRAL[900], lineHeight: 1.4 }}>{children}</Box>
          ),
          h4: ({ children }) => (
            <Box component="h4" sx={{ fontSize: "1em", fontWeight: 600, margin: "0.5em 0 0.25em", color: MSQDX_NEUTRAL[900], lineHeight: 1.4 }}>{children}</Box>
          ),
          ul: ({ children }) => <Box component="ul" sx={{ margin: "0.35em 0", paddingLeft: "1.25em" }}>{children}</Box>,
          ol: ({ children }) => <Box component="ol" sx={{ margin: "0.35em 0", paddingLeft: "1.25em" }}>{children}</Box>,
          li: ({ children }) => <Box component="li" sx={{ marginBottom: "0.2em", lineHeight: 1.45 }}>{children}</Box>,
          strong: ({ children }) => <Box component="strong" sx={{ fontWeight: 600, color: MSQDX_NEUTRAL[900] }}>{children}</Box>,
          code: ({ children }) => <Box component="code" sx={codeSx}>{children}</Box>,
          pre: ({ children }) => <Box component="pre" sx={preSx}>{children}</Box>,
          a: ({ href, children }) => (
            <Box component="a" href={href} target="_blank" rel="noreferrer" sx={{ color: MSQDX_NEUTRAL[700], textDecoration: "underline" }}>{children}</Box>
          ),
          blockquote: ({ children }) => (
            <Box component="blockquote" sx={{ margin: "0.5em 0", paddingLeft: "0.75em", borderLeft: `3px solid ${MSQDX_NEUTRAL[300]}`, color: MSQDX_NEUTRAL[700] }}>{children}</Box>
          ),
          hr: () => <Box component="hr" sx={{ border: "none", borderTop: `1px solid ${MSQDX_NEUTRAL[200]}`, margin: "0.75em 0" }} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
