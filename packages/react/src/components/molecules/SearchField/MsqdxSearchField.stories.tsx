import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MsqdxSearchField } from "./MsqdxSearchField";

const meta = {
  title: "Design System/Molecules/SearchField",
  component: MsqdxSearchField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Search input with search icon. Wraps \`MsqdxInput\` with \`type="search"\` and \`startIcon="Search"\`.
Uses the same token-based styling and transitions as other inputs.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
  },
} as Meta<typeof MsqdxSearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
    fullWidth: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
      <MsqdxSearchField label="Small" size="small" fullWidth />
      <MsqdxSearchField label="Medium" size="medium" fullWidth />
      <MsqdxSearchField label="Large" size="large" fullWidth />
    </Box>
  ),
};

export const WithoutLabel: Story = {
  args: {
    placeholder: "Search…",
    fullWidth: true,
  },
};
