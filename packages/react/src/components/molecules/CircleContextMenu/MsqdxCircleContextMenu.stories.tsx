import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Box } from "@mui/material";
import { MsqdxCircleContextMenu } from "./MsqdxCircleContextMenu";

const meta = {
  title: "Design System/Molecules/CircleContextMenu",
  component: MsqdxCircleContextMenu,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Radiales Kontextmenü: öffnet sich als Kreis um einen Icon-Button (Trigger).
Items werden gleichmäßig auf dem Kreis angeordnet. Token-basiert (MSQDX_EFFECTS, MSQDX_SPACING, brandColor).
- **radius**: Abstand Mitte–Trigger zu den Items (px)
- **itemSize**, **itemBorderRadius** (z. B. full für runde Buttons)
- **startAngleDeg**: Startwinkel (270 = oben)
- **brandColor**, **borderRadius** (Paper)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: { control: false },
    radius: { control: { type: "number", min: 40, max: 120 } },
    itemSize: { control: { type: "number", min: 32, max: 56 } },
    startAngleDeg: { control: { type: "number", min: 0, max: 360 } },
    itemBorderRadius: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "button", "full"],
    },
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    closeOnBackdropClick: { control: "boolean" },
  },
} satisfies Meta<typeof MsqdxCircleContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: "edit", icon: "Edit", label: "Bearbeiten", onClick: () => {} },
  { id: "copy", icon: "ContentCopy", label: "Kopieren", onClick: () => {} },
  { id: "share", icon: "Share", label: "Teilen", onClick: () => {} },
  { id: "delete", icon: "Delete", label: "Löschen", onClick: () => {} },
];

export const Default: Story = {
  args: {
    triggerIcon: "MoreVert",
    triggerLabel: "Menü öffnen",
    radius: 56,
    itemSize: 40,
    startAngleDeg: 270,
    itemBorderRadius: "full",
    brandColor: "black",
    borderRadius: "full",
    closeOnBackdropClick: true,
  },
  render: (args) => (
    <Box sx={{ p: 8, minHeight: 240, bgcolor: "background.default", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <MsqdxCircleContextMenu {...args} items={defaultItems} />
    </Box>
  ),
};

export const FiveItems: Story = {
  args: {
    brandColor: "pink"
  },

  render: () => (
    <Box sx={{ p: 8, display: "flex", justifyContent: "center" }}>
      <MsqdxCircleContextMenu
        items={[
          { id: "a", icon: "Add", label: "Hinzufügen", onClick: () => {} },
          { id: "b", icon: "Edit", label: "Bearbeiten", onClick: () => {} },
          { id: "c", icon: "ContentCopy", label: "Kopieren", onClick: () => {} },
          { id: "d", icon: "Share", label: "Teilen", onClick: () => {} },
          { id: "e", icon: "Delete", label: "Löschen", onClick: () => {} },
        ]}
        triggerLabel="Aktionen"
        brandColor="black"
      />
    </Box>
  )
};

export const BrandColors: Story = {
  render: () => (
    <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap sx={{ p: 8, justifyContent: "center" }}>
      {(["green", "purple", "orange", "pink", "yellow", "black"] as const).map((c) => (
        <MsqdxCircleContextMenu
          key={c}
          items={defaultItems}
          triggerLabel={`Menü ${c}`}
          brandColor={c}
        />
      ))}
    </Stack>
  ),
};

export const LargerRadius: Story = {
  render: () => (
    <Box sx={{ p: 8, display: "flex", justifyContent: "center" }}>
      <MsqdxCircleContextMenu
        items={defaultItems}
        triggerLabel="Größerer Kreis"
        radius={80}
        itemSize={44}
        brandColor="purple"
      />
    </Box>
  ),
};

export const StartAngleRight: Story = {
  render: () => (
    <Box sx={{ p: 8, display: "flex", justifyContent: "center" }}>
      <MsqdxCircleContextMenu
        items={defaultItems}
        triggerLabel="Start rechts (0°)"
        startAngleDeg={0}
        brandColor="green"
      />
    </Box>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Box sx={{ p: 8, display: "flex", justifyContent: "center" }}>
      <MsqdxCircleContextMenu
        items={[
          { id: "edit", icon: "Edit", label: "Bearbeiten", onClick: () => {} },
          { id: "copy", icon: "ContentCopy", label: "Kopieren", onClick: () => {}, disabled: true },
          { id: "delete", icon: "Delete", label: "Löschen", onClick: () => {} },
        ]}
        triggerLabel="Mit deaktiviertem Eintrag"
        brandColor="black"
      />
    </Box>
  ),
};
