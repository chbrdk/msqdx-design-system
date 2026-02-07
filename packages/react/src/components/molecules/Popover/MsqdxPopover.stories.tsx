import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Typography } from "@mui/material";
import { MsqdxButton } from "../../atoms/Button";
import { MsqdxPopover } from "./MsqdxPopover";

const meta = {
  title: "Design System/Molecules/Popover",
  component: MsqdxPopover,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Popover/Popup mit Token-Styling (MSQDX_EFFECTS, MSQDX_SPACING, brandColor).
- **zIndex.popover**, **shadows.lg**, **transitions**
- **borderRadius**: Keys aus \`MSQDX_SPACING.borderRadius\`
- **anchorOrigin** / **transformOrigin**: Anker und Wachstumsrichtung
- **brandColor**: Rahmen der Paper
- **closeOnBackdropClick**, **disableScrollLock**
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    borderRadius: {
      control: "select",
      options: ["none", "xxs", "xs", "badge", "sm", "md", "lg", "button", "full"],
    },
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    closeOnBackdropClick: { control: "boolean" },
    disableScrollLock: { control: "boolean" },
  },
} as Meta<typeof MsqdxPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

function PopoverDemo({
  children: childrenProp,
  anchorOrigin,
  transformOrigin,
  ...popoverProps
}: Partial<React.ComponentProps<typeof MsqdxPopover>> & { children?: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const defaultContent = (
    <Stack sx={{ p: 2 }} spacing={1}>
      <Typography variant="body2">Inhalt des Popovers.</Typography>
      <MsqdxButton variant="outlined" size="small" disableElevation onClick={() => setAnchorEl(null)}>
        Schließen
      </MsqdxButton>
    </Stack>
  );
  const children = childrenProp ?? defaultContent;
  return (
    <>
      <MsqdxButton
        variant="outlined"
        size="small"
        disableElevation
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-describedby={open ? "popover-desc" : undefined}
      >
        Popover öffnen
      </MsqdxButton>
      <MsqdxPopover
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        id="popover-demo"
        aria-describedby="popover-desc"
        {...popoverProps}
      >
        {children}
      </MsqdxPopover>
    </>
  );
}

export const Default: Story = {
  args: {
    open: false,
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    transformOrigin: { vertical: "top", horizontal: "left" },
    borderRadius: "lg",
    brandColor: "black",
    closeOnBackdropClick: true,
  },
  render: (args) => (
    <Box sx={{ minHeight: 200, bgcolor: "background.default", p: 4 }}>
      <PopoverDemo {...args} />
    </Box>
  ),
};

export const AnchorPositions: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ pt: 6, pb: 6 }}>
      <PopoverDemo
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      />
      <PopoverDemo
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <PopoverDemo
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      />
      <PopoverDemo
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </Stack>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <PopoverDemo borderRadius="xs">
        <Stack sx={{ p: 2 }}><Typography variant="body2">borderRadius xs</Typography></Stack>
      </PopoverDemo>
      <PopoverDemo borderRadius="sm">
        <Stack sx={{ p: 2 }}><Typography variant="body2">borderRadius sm</Typography></Stack>
      </PopoverDemo>
      <PopoverDemo borderRadius="md">
        <Stack sx={{ p: 2 }}><Typography variant="body2">borderRadius md</Typography></Stack>
      </PopoverDemo>
      <PopoverDemo borderRadius="lg">
        <Stack sx={{ p: 2 }}><Typography variant="body2">borderRadius lg</Typography></Stack>
      </PopoverDemo>
    </Stack>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      {(["green", "purple", "orange", "pink", "yellow", "black"] as const).map((c) => (
        <PopoverDemo key={c} brandColor={c}>
          <Stack sx={{ p: 2 }}><Typography variant="body2">Rahmen in {c}.</Typography></Stack>
        </PopoverDemo>
      ))}
    </Stack>
  ),
};

export const MinMaxWidth: Story = {
  render: () => (
    <PopoverDemo minWidth={280} maxWidth={400}>
      <Stack sx={{ p: 2 }} spacing={1}>
        <Typography variant="body2">Popover mit minWidth 280px und maxWidth 400px.</Typography>
        <MsqdxButton variant="outlined" size="small" disableElevation onClick={() => {}}>Schließen</MsqdxButton>
      </Stack>
    </PopoverDemo>
  ),
};
