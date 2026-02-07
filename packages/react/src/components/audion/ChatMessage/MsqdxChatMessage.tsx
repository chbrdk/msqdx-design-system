"use client";

import type { ReactNode } from "react";
import { Box } from "@mui/material";
import {
  MSQDX_SPACING,
  MSQDX_LAYOUT,
  MSQDX_EFFECTS,
  MSQDX_TYPOGRAPHY,
} from "@msqdx/tokens";
import type { BrandColor, CardVariant } from "../../atoms/Card/MsqdxCard";
import { MsqdxCard } from "../../atoms/Card/MsqdxCard";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";

export type ChatMessageRole = "user" | "assistant" | "system";

export type ChatMessageStatus = "sending" | "sent" | "read" | "error";

/** Image attached to the message (src + optional alt). */
export type ChatMessageImage = { src: string; alt?: string };

export interface MsqdxChatMessageProps {
  /** Who sent the message: user (right), assistant (left), system (center). */
  role: ChatMessageRole;
  /** Message body (text or custom ReactNode). */
  content: ReactNode;
  /** Optional images attached to the message (rendered above content with token styling). */
  images?: ChatMessageImage[];
  /** Optional timestamp (rendered as caption). */
  timestamp?: Date | string;
  /** Optional sender label above content (e.g. "You", "Assistant"). */
  senderLabel?: string;
  /** Optional avatar: ReactNode (e.g. MsqdxAvatar) or Material icon name. */
  avatar?: ReactNode | string;
  /** Optional status for user messages (sending/sent/read/error). */
  status?: ChatMessageStatus;
  /** Card surface: flat, glass, elevated. @default 'flat' */
  variant?: CardVariant;
  /** Brand color for border/hover (e.g. for user bubble). */
  brandColor?: BrandColor;
  /** Hover lift + shadow. @default false */
  hoverable?: boolean;
  /** Border radius from MSQDX_SPACING.borderRadius. @default 'button' */
  borderRadius?: keyof typeof MSQDX_SPACING.borderRadius;
  /** Max width of the bubble in px or CSS value. @default 320 */
  maxWidth?: number | string;
}

function formatTimestamp(value: Date | string): string {
  if (typeof value === "string") return value;
  return value.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getBorderRadiusCss(key: keyof typeof MSQDX_SPACING.borderRadius): string {
  const v = MSQDX_SPACING.borderRadius[key];
  return typeof v === "number" ? `${v}px` : String(v);
}

export function MsqdxChatMessage({
  role,
  content,
  images,
  timestamp,
  senderLabel,
  avatar,
  status,
  variant = "flat",
  brandColor,
  hoverable = false,
  borderRadius = "button",
  maxWidth = 320,
}: MsqdxChatMessageProps) {
  const isUser = role === "user";
  const isSystem = role === "system";

  const rowJustify =
    isSystem
      ? MSQDX_LAYOUT.alignment.justify.center
      : isUser
        ? MSQDX_LAYOUT.alignment.justify.end
        : MSQDX_LAYOUT.alignment.justify.start;

  const defaultIconName = isUser ? "person" : "smart_toy";
  const avatarNode = (() => {
    if (avatar !== undefined && avatar !== null) {
      return typeof avatar === "string" ? (
        <MsqdxIcon name={avatar as any} size="sm" />
      ) : (
        avatar
      );
    }
    if (!isSystem) {
      return <MsqdxIcon name={defaultIconName as any} size="sm" />;
    }
    return null;
  })();

  const maxWidthCss = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const imageRadiusCss = getBorderRadiusCss("xs");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: MSQDX_LAYOUT.direction.row,
        alignItems: MSQDX_LAYOUT.alignment.align.end,
        justifyContent: rowJustify,
        gap: `${MSQDX_SPACING.gap.sm}px`,
        width: "100%",
      }}
    >
      {!isUser && avatarNode && (
        <Box flexShrink={0} sx={{ marginBottom: `${MSQDX_SPACING.scale.xxs}px` }}>
          {avatarNode}
        </Box>
      )}
      <MsqdxCard
        variant={variant}
        brandColor={brandColor}
        hoverable={hoverable}
        borderRadius={borderRadius}
        sx={{
          maxWidth: maxWidthCss,
          minWidth: 0,
          transition: MSQDX_EFFECTS.transitions.standard,
          "& > div:last-of-type": { padding: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: MSQDX_LAYOUT.direction.column,
            gap: `${MSQDX_SPACING.gap.xxs}px`,
            padding: `${MSQDX_SPACING.scale.sm}px ${MSQDX_SPACING.scale.md}px`,
            textAlign: isSystem
              ? MSQDX_LAYOUT.alignment.text.center
              : MSQDX_LAYOUT.alignment.text.left,
          }}
        >
          {senderLabel && (
            <MsqdxTypography
              variant="caption"
              color="text.secondary"
              sx={{
                fontFamily: MSQDX_TYPOGRAPHY.fontFamily.mono,
                fontWeight: MSQDX_TYPOGRAPHY.fontWeight.medium,
              }}
            >
              {senderLabel}
            </MsqdxTypography>
          )}
          {images && images.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: MSQDX_LAYOUT.direction.column,
                gap: `${MSQDX_SPACING.gap.xs}px`,
                width: "100%",
                marginTop: senderLabel ? 0 : undefined,
              }}
            >
              {images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img.src}
                  alt={img.alt ?? ""}
                  loading="lazy"
                  sx={{
                    display: "block",
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: imageRadiusCss,
                    objectFit: MSQDX_LAYOUT.objectFit.contain,
                  }}
                />
              ))}
            </Box>
          )}
          {content != null && content !== "" && (
            <MsqdxTypography
              variant="body2"
              sx={{
                fontFamily: MSQDX_TYPOGRAPHY.fontFamily.primary,
                lineHeight: MSQDX_TYPOGRAPHY.lineHeight.relaxed,
              }}
            >
              {content}
            </MsqdxTypography>
          )}
          {(timestamp !== undefined || status) && (
            <Box
              sx={{
                display: "flex",
                flexDirection: MSQDX_LAYOUT.direction.row,
                alignItems: MSQDX_LAYOUT.alignment.align.center,
                justifyContent: isUser
                  ? MSQDX_LAYOUT.alignment.justify.end
                  : MSQDX_LAYOUT.alignment.justify.start,
                gap: `${MSQDX_SPACING.gap.xxs}px`,
              }}
            >
              {timestamp !== undefined && (
                <MsqdxTypography variant="caption" color="text.secondary">
                  {formatTimestamp(timestamp)}
                </MsqdxTypography>
              )}
              {status === "sending" && (
                <MsqdxIcon name="schedule" size="xs" style={{ opacity: 0.7 }} />
              )}
              {status === "error" && (
                <MsqdxIcon name="error_outline" size="xs" sx={{ color: "error.main" }} />
              )}
            </Box>
          )}
        </Box>
      </MsqdxCard>
      {isUser && avatarNode && (
        <Box flexShrink={0} sx={{ marginBottom: `${MSQDX_SPACING.scale.xxs}px` }}>
          {avatarNode}
        </Box>
      )}
    </Box>
  );
}
