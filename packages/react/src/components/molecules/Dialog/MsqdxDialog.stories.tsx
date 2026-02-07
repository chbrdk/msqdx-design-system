import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack } from "@mui/material";
import { MsqdxButton } from "../../atoms/Button";
import { MsqdxDialog } from "./MsqdxDialog";

const meta = {
  title: "Design System/Molecules/Dialog",
  component: MsqdxDialog,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Modal/Dialog mit Token-Styling (MSQDX_EFFECTS, MSQDX_SPACING, MSQDX_TYPOGRAPHY, brandColor).
- **zIndex.modal / modalBackdrop**, **backdrop.opacity / blur**, **shadows.xl**, **transitions**
- **borderRadius**: Keys aus \`MSQDX_SPACING.borderRadius\`
- **size**: sm, md, lg, full (max-width)
- **brandColor**: Rahmen und Akzent für Titel/Actions
- **showCloseButton**, **closeOnBackdropClick**, **fullScreen**, **disableScrollLock**
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
    },
    borderRadius: {
      control: "select",
      options: ["none", "xxs", "xs", "badge", "sm", "md", "lg", "button", "full"],
    },
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    showCloseButton: { control: "boolean" },
    closeOnBackdropClick: { control: "boolean" },
    fullScreen: { control: "boolean" },
    disableScrollLock: { control: "boolean" },
  },
} as Meta<typeof MsqdxDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogDemo({
  children: childrenProp,
  ...args
}: Partial<React.ComponentProps<typeof MsqdxDialog>> & { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const children = childrenProp ?? args.children;
  return (
    <>
      <MsqdxButton variant="contained" size="small" disableElevation onClick={() => setOpen(true)}>
        Dialog öffnen
      </MsqdxButton>
      <MsqdxDialog
        open={open}
        onClose={() => setOpen(false)}
        {...args}
        children={children}
      />
    </>
  );
}

export const Default: Story = {
  args: {
    open: false,
    title: "Dialog-Titel",
    children: "Inhalt des Dialogs. Schließen per X, Backdrop-Klick oder Escape.",
    actions: (
      <Stack direction="row" spacing={1}>
        <MsqdxButton variant="outlined" size="small" disableElevation onClick={() => {}}>Abbrechen</MsqdxButton>
        <MsqdxButton variant="contained" size="small" disableElevation onClick={() => {}}>Speichern</MsqdxButton>
      </Stack>
    ),
    size: "md",
    borderRadius: "lg",
    brandColor: "black",
    showCloseButton: true,
    closeOnBackdropClick: true,
    fullScreen: false,
  },
  render: (args) => (
    <Box sx={{ minHeight: 200, bgcolor: "background.default", p: 2 }}>
      <DialogDemo {...args} />
    </Box>
  ),
};

export const WithTitleAndActions: Story = {
  render: () => (
    <DialogDemo
      title="Bestätigung"
      actions={
        <Stack direction="row" spacing={1}>
          <MsqdxButton variant="outlined" size="small" disableElevation>Nein</MsqdxButton>
          <MsqdxButton variant="contained" size="small" disableElevation>Ja</MsqdxButton>
        </Stack>
      }
    >
      Möchten Sie fortfahren?
    </DialogDemo>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <DialogDemo title={undefined} showCloseButton>
      Dialog ohne Titel – Schließen-Button oben rechts.
    </DialogDemo>
  ),
};

export const Sizes: Story = {
  args: {
    borderRadius: "button",
    brandColor: "pink"
  },

  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <DialogDemo title="Small (400px)" size="sm">
        Max-width 400px.
      </DialogDemo>
      <DialogDemo title="Medium (560px)" size="md">
        Max-width 560px (Standard).
      </DialogDemo>
      <DialogDemo title="Large (720px)" size="lg">
        Max-width 720px.
      </DialogDemo>
    </Stack>
  )
};

export const BorderRadius: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <DialogDemo title="borderRadius sm" borderRadius="sm">
        Token: borderRadius.sm
      </DialogDemo>
      <DialogDemo title="borderRadius md" borderRadius="md">
        Token: borderRadius.md
      </DialogDemo>
      <DialogDemo title="borderRadius lg" borderRadius="lg">
        Token: borderRadius.lg
      </DialogDemo>
    </Stack>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      {(["green", "purple", "orange", "pink", "yellow", "black"] as const).map((c) => (
        <DialogDemo key={c} title={`Brand ${c}`} brandColor={c}>
          Rahmen und Titel-Akzent in {c}.
        </DialogDemo>
      ))}
    </Stack>
  ),
};

export const FullScreen: Story = {
  render: () => (
    <DialogDemo title="Vollbild" fullScreen>
      Dialog im Vollbildmodus (borderRadius 0, volle Breite/Höhe).
    </DialogDemo>
  ),
};

export const NoBackdropClose: Story = {
  render: () => (
    <DialogDemo title="Nur per Button schließen" closeOnBackdropClick={false}>
      Klick außerhalb schließt nicht – nur X oder Escape.
    </DialogDemo>
  ),
};
