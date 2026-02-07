import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Box } from "@mui/material";
import { MsqdxButton } from "../../atoms/Button";
import { MsqdxSnackbar } from "./MsqdxSnackbar";

const meta = {
  title: "Design System/Molecules/Snackbar",
  component: MsqdxSnackbar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Snackbar mit Token-Styling: MSQDX_EFFECTS, MSQDX_SPACING, MSQDX_TYPOGRAPHY (mono/secondary font),
brandColor. zIndex.fixed, shadows.lg, borderRadius (lg), transitions.
- **Mono-Font**: Message nutzt \`MSQDX_TYPOGRAPHY.fontFamily.secondary\` (IBM Plex Mono)
- **anchorOrigin**: vertical (top/bottom), horizontal (left/center/right)
- **autoHideDuration**, **resumeHideDuration**, **disableWindowBlurListener**
- **variant**: \`outlined\` (Rahmen + heller BG) oder \`filled\` (ganze Bar in brandColor)
- **borderRadius**, **brandColor** (Rahmen + Action / oder Fläche bei filled)
- Action-Buttons: Token-Radius, keine Elevation; bei filled: weiße Kontrast-Optik
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled"],
    },
    anchorOrigin: {
      control: "object",
      description: "vertical: top | bottom, horizontal: left | center | right",
    },
    borderRadius: {
      control: "select",
      options: ["none", "xxs", "xs", "badge", "sm", "md", "lg", "button", "full"],
    },
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    role: {
      control: "select",
      options: ["alert", "status", "none"],
    },
    disableWindowBlurListener: { control: "boolean" },
  },
} satisfies Meta<typeof MsqdxSnackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function SnackbarDemo(
  props: Partial<React.ComponentProps<typeof MsqdxSnackbar>> & {
    triggerLabel?: string;
  }
) {
  const { triggerLabel = "Snackbar öffnen", ...snackbarProps } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <MsqdxButton
        variant="outlined"
        size="small"
        disableElevation
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </MsqdxButton>
      <MsqdxSnackbar
        {...snackbarProps}
        open={open}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          setOpen(false);
        }}
      />
    </>
  );
}

export const Default: Story = {
  args: {
    open: false,
    message: "Snackbar-Nachricht (mono font).",
    anchorOrigin: { vertical: "bottom", horizontal: "left" },
    autoHideDuration: 6000,
    borderRadius: "lg",
    brandColor: "black",
    role: "alert",
  },
  render: (args) => (
    <Box sx={{ p: 4, minHeight: 120, bgcolor: "background.default" }}>
      <SnackbarDemo {...args} message="Snackbar-Nachricht (mono font)." />
    </Box>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <SnackbarDemo
        message="Aktion ausgeführt."
        action={
          <MsqdxButton
            size="small"
            disableElevation
            variant="outlined"
            onClick={() => {}}
          >
            Rückgängig
          </MsqdxButton>
        }
      />
    </Box>
  ),
};

export const AnchorOrigins: Story = {
  render: () => (
    <Stack spacing={3} sx={{ p: 4 }}>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <SnackbarDemo
          triggerLabel="bottom-left"
          message="bottom-left"
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
        <SnackbarDemo
          triggerLabel="bottom-center"
          message="bottom-center"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
        <SnackbarDemo
          triggerLabel="bottom-right"
          message="bottom-right"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
        <SnackbarDemo
          triggerLabel="top-left"
          message="top-left"
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        />
        <SnackbarDemo
          triggerLabel="top-center"
          message="top-center"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <SnackbarDemo
          triggerLabel="top-right"
          message="top-right"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />
      </Stack>
    </Stack>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ p: 4 }}>
      <SnackbarDemo
        triggerLabel="xs"
        message="borderRadius xs"
        borderRadius="xs"
      />
      <SnackbarDemo
        triggerLabel="sm"
        message="borderRadius sm"
        borderRadius="sm"
      />
      <SnackbarDemo
        triggerLabel="md"
        message="borderRadius md"
        borderRadius="md"
      />
      <SnackbarDemo
        triggerLabel="lg"
        message="borderRadius lg"
        borderRadius="lg"
      />
    </Stack>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ p: 4 }}>
      {(["green", "purple", "orange", "pink", "yellow", "black"] as const).map(
        (c) => (
          <SnackbarDemo
            key={c}
            triggerLabel={c}
            message={`Brand ${c}`}
            brandColor={c}
            action={
              <MsqdxButton size="small" disableElevation variant="outlined">
                Action
              </MsqdxButton>
            }
          />
        )
      )}
    </Stack>
  ),
};

export const Filled: Story = {
  render: () => (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ p: 4 }}>
      <SnackbarDemo
        triggerLabel="Filled green"
        message="Ganze Bar in Brand-Farbe."
        variant="filled"
        brandColor="green"
        action={
          <MsqdxButton size="small" disableElevation variant="outlined">
            Rückgängig
          </MsqdxButton>
        }
      />
      <SnackbarDemo
        triggerLabel="Filled black"
        message="Filled mit black."
        variant="filled"
        brandColor="black"
        action={
          <MsqdxButton size="small" disableElevation variant="contained">
            OK
          </MsqdxButton>
        }
      />
      {(["purple", "pink", "orange", "yellow"] as const).map((c) => (
        <SnackbarDemo
          key={c}
          triggerLabel={`Filled ${c}`}
          message={`Brand ${c} filled`}
          variant="filled"
          brandColor={c}
          action={
            <MsqdxButton size="small" disableElevation variant="outlined">
              Action
            </MsqdxButton>
          }
        />
      ))}
    </Stack>
  ),
};

export const AutoHideDuration: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ p: 4 }}>
      <SnackbarDemo
        triggerLabel="3s"
        message="Schließt nach 3 Sekunden."
        autoHideDuration={3000}
      />
      <SnackbarDemo
        triggerLabel="10s"
        message="Schließt nach 10 Sekunden."
        autoHideDuration={10000}
      />
    </Stack>
  ),
};

export const NoAutoHide: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <SnackbarDemo
        triggerLabel="Bleibt offen"
        message="Nur per Klick außerhalb oder Escape schließen."
        autoHideDuration={null}
        action={
          <MsqdxButton size="small" disableElevation variant="outlined" onClick={() => {}}>
            Schließen
          </MsqdxButton>
        }
      />
    </Box>
  ),
};

export const LongMessage: Story = {
  render: () => (
    <Box sx={{ p: 4 }}>
      <SnackbarDemo
        triggerLabel="Langer Text"
        message="Dies ist eine längere Snackbar-Nachricht, die den Zeilenumbruch und die Lesbarkeit in der Mono-Schrift zeigt."
        action={
          <MsqdxButton size="small" disableElevation variant="outlined">
            OK
          </MsqdxButton>
        }
      />
    </Box>
  ),
};
