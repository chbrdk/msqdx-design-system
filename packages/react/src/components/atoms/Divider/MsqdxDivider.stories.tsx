import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Box } from "@mui/material";
import { MsqdxDivider } from "./MsqdxDivider";
import { MsqdxLabel } from "../Label/MsqdxLabel";

const meta = {
  title: "Design System/Atoms/Divider",
  component: MsqdxDivider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Flexible divider for separating content. Uses \`MSQDX_EFFECTS.borderWidth\`, \`MSQDX_NEUTRAL\` / brand colors, \`MSQDX_SPACING\` for margins.
- **Orientation**: horizontal (default) or vertical
- **Variant**: solid, dashed, dotted
- **Thickness**: thin, medium, thick
- **Color**: default (neutral) or brand (purple, yellow, pink, orange, green, black)
- **Label**: optional text in the middle (horizontal) or top (vertical)
- **Spacing**: margin around the line
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["solid", "dashed", "dotted"],
    },
    thickness: {
      control: "select",
      options: ["thin", "medium", "thick"],
    },
    color: {
      control: "select",
      options: ["default", "purple", "yellow", "pink", "orange", "green", "black"],
    },
    spacing: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg"],
    },
    flex: { control: "boolean" },
  },
} as Meta<typeof MsqdxDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    variant: "solid",
    spacing: "sm",
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: "100%", maxWidth: 400 }}>
      <MsqdxDivider variant="solid" />
      <MsqdxDivider variant="dashed" />
      <MsqdxDivider variant="dotted" />
    </Stack>
  ),
};

export const Thickness: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: "100%", maxWidth: 400 }}>
      <MsqdxDivider thickness="thin" />
      <MsqdxDivider thickness="medium" />
      <MsqdxDivider thickness="thick" />
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
      <MsqdxDivider color="default" />
      <MsqdxDivider color="green" />
      <MsqdxDivider color="purple" />
      <MsqdxDivider color="orange" />
      <MsqdxDivider color="pink" />
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "or",
    spacing: "md",
  },
};

export const WithLabelVariants: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: "100%", maxWidth: 400 }}>
      <MsqdxDivider label="Section" />
      <MsqdxDivider label="or" color="green" />
      <MsqdxDivider label="—" variant="dashed" />
    </Stack>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Stack spacing={0} sx={{ width: "100%", maxWidth: 400 }}>
      <Box sx={{ py: 1, border: "1px dashed #ccc", borderRadius: 1 }}>
        <MsqdxDivider spacing="none" />
      </Box>
      <Box sx={{ py: 1, border: "1px dashed #ccc", borderRadius: 1 }}>
        <MsqdxDivider spacing="xs" />
      </Box>
      <Box sx={{ py: 1, border: "1px dashed #ccc", borderRadius: 1 }}>
        <MsqdxDivider spacing="sm" />
      </Box>
      <Box sx={{ py: 1, border: "1px dashed #ccc", borderRadius: 1 }}>
        <MsqdxDivider spacing="md" />
      </Box>
      <Box sx={{ py: 1, border: "1px dashed #ccc", borderRadius: 1 }}>
        <MsqdxDivider spacing="lg" />
      </Box>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ display: "flex", height: 80, alignItems: "stretch" }}>
      <Box sx={{ px: 2, display: "flex", alignItems: "center" }}>A</Box>
      <MsqdxDivider orientation="vertical" spacing="sm" />
      <Box sx={{ px: 2, display: "flex", alignItems: "center" }}>B</Box>
      <MsqdxDivider orientation="vertical" variant="dashed" spacing="sm" />
      <Box sx={{ px: 2, display: "flex", alignItems: "center" }}>C</Box>
    </Box>
  ),
};

export const InContext: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 360, p: 2, border: "1px solid #eee", borderRadius: 2 }}>
      <MsqdxLabel>Section one</MsqdxLabel>
      <Box sx={{ fontSize: "0.875rem" }}>Content for the first block.</Box>
      <MsqdxDivider spacing="md" />
      <MsqdxLabel>Section two</MsqdxLabel>
      <Box sx={{ fontSize: "0.875rem" }}>Content for the second block.</Box>
      <MsqdxDivider label="or" color="green" spacing="md" />
      <MsqdxLabel>Section three</MsqdxLabel>
      <Box sx={{ fontSize: "0.875rem" }}>Content for the third block.</Box>
    </Stack>
  ),
};
