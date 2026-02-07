import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Box } from "@mui/material";
import {
  MsqdxAccordion,
  MsqdxAccordionItem,
} from "./MsqdxAccordion";

const meta = {
  title: "Design System/Molecules/Accordion",
  component: MsqdxAccordion,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Accordion mit vertikaler oder horizontaler Ausrichtung. Baut auf Tokens auf:
- **MSQDX_EFFECTS**: Transitions (slow für Expand, standard für Chevron), Easing
- **MSQDX_SPACING**: Padding, Gap, Border-Radius
- **MSQDX_TYPOGRAPHY**: Schrift für Summary und Details
- **MSQDX_NEUTRAL**: Rahmen und Hover

- **orientation**: \`vertical\` (gestapelt) oder \`horizontal\` (nebeneinander)
- **size**: small, medium, large (Padding + MsqdxLabel-Größe)
- **borderRadius**: Token aus \`MSQDX_SPACING.borderRadius\` (none, xxs, xs, badge, sm, md, lg, button, full, …)
- **allowMultiple**: mehrere Panels gleichzeitig offen
- **brandColor**: Rahmen (Accordion + runder Expand-Icon-Button) in Brand-Farbe
- Summary-Labels nutzen \`MsqdxLabel\`, Pfeil in rundem Outline-Icon-Button
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    borderRadius: {
      control: "select",
      options: ["none", "xxs", "xs", "badge", "sm", "md", "lg", "button", "full"],
    },
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    allowMultiple: { control: "boolean" },
  },
} satisfies Meta<typeof MsqdxAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const verticalItems = (
  <>
    <MsqdxAccordionItem id="a" summary="Erster Eintrag">
      Inhalt des ersten Panels. Hier kann beliebiger Inhalt stehen – Text, Listen, Buttons.
    </MsqdxAccordionItem>
    <MsqdxAccordionItem id="b" summary="Zweiter Eintrag">
      Zweiter Inhalt. Animationen nutzen die Token (slow für Expand/Collapse, standard für Chevron).
    </MsqdxAccordionItem>
    <MsqdxAccordionItem id="c" summary="Dritter Eintrag">
      Dritter Block. Vertikal wird die Höhe mit MUI Collapse animiert; horizontal die Breite per CSS-Transition.
    </MsqdxAccordionItem>
  </>
);

export const Default: Story = {
  args: {
    orientation: "vertical",
    defaultExpanded: ["a"],
    borderRadius: "button",
    brandColor: "black"
  },
  render: (args) => (
    <Box sx={{ maxWidth: 480 }}>
      <MsqdxAccordion {...args}>{verticalItems}</MsqdxAccordion>
    </Box>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ maxWidth: 480 }}>
      <MsqdxAccordion orientation="vertical" defaultExpanded={["b"]}>
        {verticalItems}
      </MsqdxAccordion>
    </Box>
  ),
};

export const VerticalMultiple: Story = {
  render: () => (
    <Box sx={{ maxWidth: 480 }}>
      <MsqdxAccordion orientation="vertical" allowMultiple defaultExpanded={["a", "c"]}>
        {verticalItems}
      </MsqdxAccordion>
    </Box>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Box sx={{ width: "100%", minHeight: 200 }}>
      <MsqdxAccordion orientation="horizontal" defaultExpanded={[]}>
        <MsqdxAccordionItem id="h1" summary="Eins">
          Inhalt Panel 1. Horizontal: Summary links, Inhalt öffnet sich nach rechts.
        </MsqdxAccordionItem>
        <MsqdxAccordionItem id="h2" summary="Zwei">
          Inhalt Panel 2. Breite und Opacity sind mit Token-Transition animiert.
        </MsqdxAccordionItem>
        <MsqdxAccordionItem id="h3" summary="Drei">
          Inhalt Panel 3.
        </MsqdxAccordionItem>
      </MsqdxAccordion>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 480 }}>
      <MsqdxAccordion size="small" defaultExpanded={["s-a"]}>
        <MsqdxAccordionItem id="s-a" summary="Small">Inhalt small.</MsqdxAccordionItem>
        <MsqdxAccordionItem id="s-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
      <MsqdxAccordion size="medium" defaultExpanded={["m-a"]}>
        <MsqdxAccordionItem id="m-a" summary="Medium">Inhalt medium.</MsqdxAccordionItem>
        <MsqdxAccordionItem id="m-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
      <MsqdxAccordion size="large" defaultExpanded={["l-a"]}>
        <MsqdxAccordionItem id="l-a" summary="Large">Inhalt large.</MsqdxAccordionItem>
        <MsqdxAccordionItem id="l-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
    </Stack>
  ),
};

export const BrandColors: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 480 }}>
      {(["green", "purple", "orange", "pink", "yellow", "black"] as const).map((c) => (
        <MsqdxAccordion key={c} brandColor={c} defaultExpanded={[`${c}-a`]}>
          <MsqdxAccordionItem id={`${c}-a`} summary={`Brand ${c}`}>Inhalt mit Rahmen und rundem Icon-Button in {c}.</MsqdxAccordionItem>
          <MsqdxAccordionItem id={`${c}-b`} summary="Zweiter">Inhalt.</MsqdxAccordionItem>
        </MsqdxAccordion>
      ))}
    </Stack>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 480 }}>
      <MsqdxAccordion borderRadius="none" defaultExpanded={["br0-a"]}>
        <MsqdxAccordionItem id="br0-a" summary="none (0)">Token: borderRadius.none</MsqdxAccordionItem>
        <MsqdxAccordionItem id="br0-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
      <MsqdxAccordion borderRadius="xs" defaultExpanded={["brxs-a"]}>
        <MsqdxAccordionItem id="brxs-a" summary="xs (4px)">Token: borderRadius.xs</MsqdxAccordionItem>
        <MsqdxAccordionItem id="brxs-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
      <MsqdxAccordion borderRadius="sm" defaultExpanded={["brsm-a"]}>
        <MsqdxAccordionItem id="brsm-a" summary="sm (8px)">Token: borderRadius.sm</MsqdxAccordionItem>
        <MsqdxAccordionItem id="brsm-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
      <MsqdxAccordion borderRadius="md" defaultExpanded={["brmd-a"]}>
        <MsqdxAccordionItem id="brmd-a" summary="md (20px)">Token: borderRadius.md</MsqdxAccordionItem>
        <MsqdxAccordionItem id="brmd-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
      <MsqdxAccordion borderRadius="lg" defaultExpanded={["brlg-a"]}>
        <MsqdxAccordionItem id="brlg-a" summary="lg (40px)">Token: borderRadius.lg</MsqdxAccordionItem>
        <MsqdxAccordionItem id="brlg-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
      <MsqdxAccordion borderRadius="full" defaultExpanded={["brfull-a"]}>
        <MsqdxAccordionItem id="brfull-a" summary="full (999px)">Token: borderRadius.full</MsqdxAccordionItem>
        <MsqdxAccordionItem id="brfull-b" summary="Zweiter">Inhalt.</MsqdxAccordionItem>
      </MsqdxAccordion>
    </Stack>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [expanded, setExpanded] = React.useState<string[]>(["a"]);
    return (
      <Stack spacing={2} sx={{ maxWidth: 480 }}>
        <MsqdxAccordion
          orientation="vertical"
          expanded={expanded}
          onChange={setExpanded}
        >
          {verticalItems}
        </MsqdxAccordion>
        <Box sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
          Offen: {expanded.length ? expanded.join(", ") : "—"}
        </Box>
      </Stack>
    );
  },
};
