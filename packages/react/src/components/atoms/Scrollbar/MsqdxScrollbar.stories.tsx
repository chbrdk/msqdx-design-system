import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Box } from "@mui/material";
import { MsqdxScrollbar } from "./MsqdxScrollbar";
import { MsqdxLabel } from "../Label/MsqdxLabel";

const meta = {
  title: "Design System/Atoms/Scrollbar",
  component: MsqdxScrollbar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Scrollbar-Atom: scrollbarer Bereich mit Token-Styling (\`MSQDX_SCROLLBAR\`).
- **size**: thin (6px), medium (10px), thick (14px) – Breite/Höhe der Scrollbar
- **brandColor**: default, purple, yellow, pink, orange, green, black – Track/Thumb-Farben
- **horizontal** / **vertical**: Scrollrichtung
- **overflow**: auto (bei Bedarf) oder scroll (Track immer sichtbar)
- Border-Radius und Transition kommen aus den Tokens
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["thin", "medium", "thick"],
    },
    brandColor: {
      control: "select",
      options: ["default", "purple", "yellow", "pink", "orange", "green", "black"],
    },
    horizontal: { control: "boolean" },
    vertical: { control: "boolean" },
    overflow: {
      control: "select",
      options: ["auto", "scroll"],
    },
  },
} satisfies Meta<typeof MsqdxScrollbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const longContent = (
  <Stack spacing={1} sx={{ p: 2 }}>
    {Array.from({ length: 24 }, (_, i) => (
      <Box key={i} sx={{ py: 0.5, borderBottom: "1px solid #eee" }}>
        Zeile {i + 1} – Inhalt für Scroll-Demo.
      </Box>
    ))}
  </Stack>
);

const wideContent = (
  <Box sx={{ display: "flex", gap: 2, p: 2, minWidth: 800 }}>
    {["A", "B", "C", "D", "E"].map((letter) => (
      <Box
        key={letter}
        sx={{
          width: 140,
          height: 80,
          borderRadius: 2,
          bgcolor: "grey.200",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
        }}
      >
        Block {letter}
      </Box>
    ))}
  </Box>
);

export const Default: Story = {
  args: {
    size: "medium",
    brandColor: "default",
    maxHeight: 200,
    vertical: true,
    horizontal: false,
    overflow: "auto",
  },
  render: (args) => (
    <Box sx={{ maxWidth: 360 }}>
      <MsqdxLabel sx={{ mb: 1 }}>Vertikal scrollen</MsqdxLabel>
      <MsqdxScrollbar {...args}>{longContent}</MsqdxScrollbar>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3} direction="row" sx={{ flexWrap: "wrap" }}>
      <Box>
        <MsqdxLabel size="small" sx={{ mb: 1, display: "block" }}>thin</MsqdxLabel>
        <MsqdxScrollbar size="thin" maxHeight={180} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
          {longContent}
        </MsqdxScrollbar>
      </Box>
      <Box>
        <MsqdxLabel size="small" sx={{ mb: 1, display: "block" }}>medium</MsqdxLabel>
        <MsqdxScrollbar size="medium" maxHeight={180} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
          {longContent}
        </MsqdxScrollbar>
      </Box>
      <Box>
        <MsqdxLabel size="small" sx={{ mb: 1, display: "block" }}>thick</MsqdxLabel>
        <MsqdxScrollbar size="thick" maxHeight={180} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
          {longContent}
        </MsqdxScrollbar>
      </Box>
    </Stack>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 360 }}>
      {(["default", "green", "purple", "orange", "pink", "yellow", "black"] as const).map((c) => (
        <Box key={c}>
          <MsqdxLabel size="small" sx={{ mb: 0.5, display: "block" }}>{c}</MsqdxLabel>
          <MsqdxScrollbar
            brandColor={c}
            size="medium"
            maxHeight={120}
            sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
          >
            {longContent}
          </MsqdxScrollbar>
        </Box>
      ))}
    </Stack>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Box sx={{ maxWidth: "100%" }}>
      <MsqdxLabel sx={{ mb: 1 }}>Horizontal scrollen</MsqdxLabel>
      <MsqdxScrollbar
        horizontal
        vertical={false}
        maxHeight={120}
        size="medium"
        brandColor="green"
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
      >
        {wideContent}
      </MsqdxScrollbar>
    </Box>
  ),
};

export const Both: Story = {
  render: () => (
    <Box>
      <MsqdxLabel sx={{ mb: 1 }}>Vertikal + horizontal</MsqdxLabel>
      <MsqdxScrollbar
        horizontal
        vertical
        maxHeight={200}
        maxWidth={400}
        size="thin"
        brandColor="purple"
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
      >
        <Box sx={{ minWidth: 600, minHeight: 400, p: 2 }}>
          Großer Inhalt – in beide Richtungen scrollbar. Zeile für Zeile und Block für Block.
        </Box>
      </MsqdxScrollbar>
    </Box>
  ),
};

export const OverflowScroll: Story = {
  render: () => (
    <Box sx={{ maxWidth: 360 }}>
      <MsqdxLabel sx={{ mb: 1 }}>overflow="scroll" (Track immer sichtbar)</MsqdxLabel>
      <MsqdxScrollbar
        overflow="scroll"
        maxHeight={160}
        brandColor="green"
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}
      >
        {longContent}
      </MsqdxScrollbar>
    </Box>
  ),
};
