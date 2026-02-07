import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, Typography, Box, Stack } from "@mui/material";
import { MsqdxToolbar } from "./MsqdxToolbar";
import { MsqdxIcon } from "../../atoms/Icon";

const meta = {
  title: "Design System/Molecules/Toolbar",
  component: MsqdxToolbar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Toolbar in allen Ausprägungen, token-basiert (MSQDX_SPACING, MSQDX_EFFECTS, MSQDX_COLORS).
- **appearance**: flat | outlined | elevated | filled
- **variant**: regular | dense (MUI)
- **gap**: xxs, xs, sm, md, lg, xl, xxl, xxxl
- **divider**, **orientation** (horizontal | vertical), **disableGutters**
- **brandColor** für outlined/filled
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: "select",
      options: ["flat", "outlined", "elevated", "filled"],
    },
    variant: { control: "radio", options: ["regular", "dense"] },
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    gap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"],
    },
    divider: { control: "boolean" },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    disableGutters: { control: "boolean" },
    collapsible: { control: "boolean" },
    floating: { control: "boolean" },
    slideOut: { control: "boolean" },
    slideOutPosition: { control: "radio", options: ["left", "right"] },
  },
} satisfies Meta<typeof MsqdxToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Vertikaler Strich als Trennzeichen zwischen Tool-Gruppen. */
const ToolbarDivider = () => (
  <Box
    sx={{
      width: "1px",
      height: 20,
      backgroundColor: "divider",
      alignSelf: "center",
      flexShrink: 0,
    }}
  />
);

/** Mehrere Tools (kleine Icon-Buttons) wie in einer typischen Editor-Toolbar. */
const toolbarContent = (
  <>
    <IconButton size="small" aria-label="Fett">
      <MsqdxIcon name="FormatBold" size="sm" decorative />
    </IconButton>
    <IconButton size="small" aria-label="Kursiv">
      <MsqdxIcon name="FormatItalic" size="sm" decorative />
    </IconButton>
    <IconButton size="small" aria-label="Unterstrichen">
      <MsqdxIcon name="FormatUnderlined" size="sm" decorative />
    </IconButton>
    <ToolbarDivider />
    <IconButton size="small" aria-label="Aufzählung">
      <MsqdxIcon name="FormatListBulleted" size="sm" decorative />
    </IconButton>
    <IconButton size="small" aria-label="Nummerierte Liste">
      <MsqdxIcon name="FormatListNumbered" size="sm" decorative />
    </IconButton>
    <ToolbarDivider />
    <IconButton size="small" aria-label="Linksbündig">
      <MsqdxIcon name="FormatAlignLeft" size="sm" decorative />
    </IconButton>
    <IconButton size="small" aria-label="Zentriert">
      <MsqdxIcon name="FormatAlignCenter" size="sm" decorative />
    </IconButton>
    <IconButton size="small" aria-label="Rechtsbündig">
      <MsqdxIcon name="FormatAlignRight" size="sm" decorative />
    </IconButton>
    <ToolbarDivider />
    <IconButton size="small" aria-label="Link">
      <MsqdxIcon name="Link" size="sm" decorative />
    </IconButton>
    <IconButton size="small" aria-label="Mehr">
      <MsqdxIcon name="MoreVert" size="sm" decorative />
    </IconButton>
  </>
);

export const Flat: Story = {
  args: {
    appearance: "flat",
    children: toolbarContent,
  },
};

export const Outlined: Story = {
  args: {
    appearance: "outlined",
    brandColor: "green",
    children: toolbarContent,
  },
};

export const Elevated: Story = {
  args: {
    appearance: "elevated",
    children: toolbarContent,
  },
};

export const Filled: Story = {
  args: {
    appearance: "filled",
    brandColor: "green",
    children: toolbarContent,
  },
};

export const FilledPurple: Story = {
  args: {
    appearance: "filled",
    brandColor: "purple",
    children: toolbarContent,
  },
};

export const Dense: Story = {
  args: {
    variant: "dense",
    appearance: "outlined",
    brandColor: "green",
    children: toolbarContent,
  },
};

export const WithDivider: Story = {
  args: {
    appearance: "flat",
    divider: true,
    children: toolbarContent,
  },
};

export const NoGutters: Story = {
  args: {
    appearance: "outlined",
    disableGutters: true,
    gap: "xs",
    children: toolbarContent,
  },
};

export const LargeGap: Story = {
  args: {
    appearance: "outlined",
    gap: "lg",
    children: toolbarContent,
  },
};

const verticalToolContent = (
  <>
    <IconButton size="small" aria-label="Hoch">
      <MsqdxIcon name="ArrowUpward" size="sm" decorative />
    </IconButton>
    <IconButton size="small" aria-label="Runter">
      <MsqdxIcon name="ArrowDownward" size="sm" decorative />
    </IconButton>
    <Box sx={{ flex: 1 }} />
    <IconButton size="small" aria-label="Einstellungen">
      <MsqdxIcon name="Settings" size="sm" decorative />
    </IconButton>
  </>
);

export const Vertical: Story = {
  args: {
    appearance: "outlined",
    orientation: "vertical",
    brandColor: "green",
    children: verticalToolContent,
  },
  render: (args) => (
    <Box sx={{ display: "flex", height: 200 }}>
      <MsqdxToolbar {...args} />
    </Box>
  ),
};

export const VerticalCollapsible: Story = {
  args: {
    appearance: "outlined",
    orientation: "vertical",
    brandColor: "green",
    collapsible: true,
    defaultCollapsed: false,
    children: verticalToolContent,
  },
  render: (args) => (
    <Box sx={{ display: "flex", height: 200 }}>
      <MsqdxToolbar {...args} />
    </Box>
  ),
};

export const VerticalCollapsibleDefaultClosed: Story = {
  args: {
    appearance: "outlined",
    orientation: "vertical",
    brandColor: "green",
    collapsible: true,
    defaultCollapsed: true,
    children: verticalToolContent,
  },
  render: (args) => (
    <Box sx={{ display: "flex", height: 200 }}>
      <MsqdxToolbar {...args} />
    </Box>
  ),
};

export const Floating: Story = {
  args: {
    appearance: "elevated",
    floating: true,
    children: toolbarContent,
  },
  render: (args) => (
    <Box sx={{ position: "relative", height: 120 }}>
      <MsqdxToolbar {...args} />
    </Box>
  ),
};

export const SlideOutLeft: Story = {
  args: {
    appearance: "outlined",
    orientation: "vertical",
    brandColor: "green",
    slideOut: true,
    defaultSlideOutOpen: false,
    slideOutPosition: "left",
    children: verticalToolContent,
  },
  render: (args) => (
    <Box sx={{ position: "relative", height: 200 }}>
      <MsqdxToolbar {...args} />
    </Box>
  ),
};

export const SlideOutRight: Story = {
  args: {
    appearance: "outlined",
    orientation: "vertical",
    brandColor: "green",
    slideOut: true,
    defaultSlideOutOpen: false,
    slideOutPosition: "right",
    children: verticalToolContent,
  },
  render: (args) => (
    <Box sx={{ position: "relative", height: 200, display: "flex", justifyContent: "flex-end" }}>
      <MsqdxToolbar {...args} />
    </Box>
  ),
};

export const AllAppearances: Story = {
  render: () => (
    <Stack spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="caption" color="text.secondary">
          flat
        </Typography>
        <MsqdxToolbar appearance="flat">{toolbarContent}</MsqdxToolbar>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="caption" color="text.secondary">
          outlined (green)
        </Typography>
        <MsqdxToolbar appearance="outlined" brandColor="green">
          {toolbarContent}
        </MsqdxToolbar>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="caption" color="text.secondary">
          elevated
        </Typography>
        <MsqdxToolbar appearance="elevated">{toolbarContent}</MsqdxToolbar>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="caption" color="text.secondary">
          filled (green)
        </Typography>
        <MsqdxToolbar appearance="filled" brandColor="green">
          {toolbarContent}
        </MsqdxToolbar>
      </Stack>
    </Stack>
  ),
};
