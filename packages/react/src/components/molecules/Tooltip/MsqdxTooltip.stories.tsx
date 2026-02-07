import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Box } from "@mui/material";
import { MsqdxButton } from "../../atoms/Button";
import { MsqdxTooltip } from "./MsqdxTooltip";

const meta = {
  title: "Design System/Molecules/Tooltip",
  component: MsqdxTooltip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Tooltip mit Token-Styling (MSQDX_EFFECTS, MSQDX_SPACING, MSQDX_TYPOGRAPHY, brandColor).
- **zIndex.tooltip**, **shadows.lg**, **transitions.standard**
- **borderRadius**: Keys aus \`MSQDX_SPACING.borderRadius\` (Default: lg)
- **placement**: top, bottom, left, right, top-start, etc.
- **brandColor**: Rahmen und Pfeil
- **arrow**, **enterDelay**, **leaveDelay**
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top", "top-start", "top-end",
        "bottom", "bottom-start", "bottom-end",
        "left", "left-start", "left-end",
        "right", "right-start", "right-end",
      ],
    },
    borderRadius: {
      control: "select",
      options: ["none", "xxs", "xs", "badge", "sm", "md", "lg", "button", "full"],
    },
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    arrow: { control: "boolean" },
  },
} satisfies Meta<typeof MsqdxTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Tooltip-Text",
    placement: "top",
    borderRadius: "lg",
    brandColor: "black",
    arrow: false,
    enterDelay: 100,
    leaveDelay: 0,
  },
  render: (args) => (
    <Box sx={{ p: 6, minHeight: 160, bgcolor: "background.default", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <MsqdxTooltip {...args}>
        <span>
          <MsqdxButton variant="outlined" size="small" disableElevation>
            Hover me
          </MsqdxButton>
        </span>
      </MsqdxTooltip>
    </Box>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Box sx={{ p: 6, display: "flex", justifyContent: "center" }}>
      <MsqdxTooltip title="Mit Pfeil zum Trigger" arrow placement="top">
        <span>
          <MsqdxButton variant="outlined" size="small" disableElevation>
            Hover me
          </MsqdxButton>
        </span>
      </MsqdxTooltip>
    </Box>
  ),
};

export const Placements: Story = {
  render: () => (
    <Stack spacing={4} alignItems="center" sx={{ p: 6 }}>
      <Stack direction="row" spacing={2} justifyContent="center">
        <MsqdxTooltip title="top-start" placement="top-start">
          <span><MsqdxButton size="small" disableElevation variant="outlined">top-start</MsqdxButton></span>
        </MsqdxTooltip>
        <MsqdxTooltip title="top" placement="top">
          <span><MsqdxButton size="small" disableElevation variant="outlined">top</MsqdxButton></span>
        </MsqdxTooltip>
        <MsqdxTooltip title="top-end" placement="top-end">
          <span><MsqdxButton size="small" disableElevation variant="outlined">top-end</MsqdxButton></span>
        </MsqdxTooltip>
      </Stack>
      <Stack direction="row" spacing={4} alignItems="center">
        <Stack spacing={2}>
          <MsqdxTooltip title="left-start" placement="left-start">
            <span><MsqdxButton size="small" disableElevation variant="outlined">left-start</MsqdxButton></span>
          </MsqdxTooltip>
          <MsqdxTooltip title="left" placement="left">
            <span><MsqdxButton size="small" disableElevation variant="outlined">left</MsqdxButton></span>
          </MsqdxTooltip>
          <MsqdxTooltip title="left-end" placement="left-end">
            <span><MsqdxButton size="small" disableElevation variant="outlined">left-end</MsqdxButton></span>
          </MsqdxTooltip>
        </Stack>
        <Stack direction="row" spacing={2}>
          <MsqdxTooltip title="bottom-start" placement="bottom-start">
            <span><MsqdxButton size="small" disableElevation variant="outlined">bottom-start</MsqdxButton></span>
          </MsqdxTooltip>
          <MsqdxTooltip title="bottom" placement="bottom">
            <span><MsqdxButton size="small" disableElevation variant="outlined">bottom</MsqdxButton></span>
          </MsqdxTooltip>
          <MsqdxTooltip title="bottom-end" placement="bottom-end">
            <span><MsqdxButton size="small" disableElevation variant="outlined">bottom-end</MsqdxButton></span>
          </MsqdxTooltip>
        </Stack>
        <Stack spacing={2}>
          <MsqdxTooltip title="right-start" placement="right-start">
            <span><MsqdxButton size="small" disableElevation variant="outlined">right-start</MsqdxButton></span>
          </MsqdxTooltip>
          <MsqdxTooltip title="right" placement="right">
            <span><MsqdxButton size="small" disableElevation variant="outlined">right</MsqdxButton></span>
          </MsqdxTooltip>
          <MsqdxTooltip title="right-end" placement="right-end">
            <span><MsqdxButton size="small" disableElevation variant="outlined">right-end</MsqdxButton></span>
          </MsqdxTooltip>
        </Stack>
      </Stack>
    </Stack>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ p: 6, justifyContent: "center" }}>
      <MsqdxTooltip title="borderRadius xs" borderRadius="xs">
        <span><MsqdxButton size="small" disableElevation variant="outlined">xs</MsqdxButton></span>
      </MsqdxTooltip>
      <MsqdxTooltip title="borderRadius sm" borderRadius="sm">
        <span><MsqdxButton size="small" disableElevation variant="outlined">sm</MsqdxButton></span>
      </MsqdxTooltip>
      <MsqdxTooltip title="borderRadius md" borderRadius="md">
        <span><MsqdxButton size="small" disableElevation variant="outlined">md</MsqdxButton></span>
      </MsqdxTooltip>
      <MsqdxTooltip title="borderRadius lg" borderRadius="lg">
        <span><MsqdxButton size="small" disableElevation variant="outlined">lg</MsqdxButton></span>
      </MsqdxTooltip>
    </Stack>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ p: 6, justifyContent: "center" }}>
      {(["green", "purple", "orange", "pink", "yellow", "black"] as const).map((c) => (
        <MsqdxTooltip key={c} title={`Brand ${c}`} brandColor={c}>
          <span>
            <MsqdxButton size="small" disableElevation variant="outlined">{c}</MsqdxButton>
          </span>
        </MsqdxTooltip>
      ))}
    </Stack>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Box sx={{ p: 6, display: "flex", justifyContent: "center" }}>
      <MsqdxTooltip
        title="Dies ist ein längerer Tooltip-Text, der vielleicht über mehrere Zeilen geht und die Lesbarkeit zeigt."
        placement="top"
        arrow
      >
        <span>
          <MsqdxButton size="small" disableElevation variant="outlined">
            Langer Tooltip
          </MsqdxButton>
        </span>
      </MsqdxTooltip>
    </Box>
  ),
};
