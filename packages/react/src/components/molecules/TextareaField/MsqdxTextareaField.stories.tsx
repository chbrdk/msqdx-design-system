import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@mui/material";
import { MsqdxTextareaField } from "./MsqdxTextareaField";

const meta = {
  title: "Design System/Molecules/TextareaField",
  component: MsqdxTextareaField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Multiline textarea with label, optional icon, and error/success states.
- **Size**: small, medium, large (font/padding from \`MSQDX_INPUT.size\`)
- **Tokens**: label, helper, textarea (minRows, lineHeight, resize) from \`MSQDX_INPUT\`
- Animated transitions (border, background, box-shadow).
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
      description: "Textarea size (font + padding)",
    },
    rows: { control: "number" },
    minRows: { control: "number" },
    error: { control: "boolean" },
    success: { control: "boolean" },
    required: { control: "boolean" },
  },
} satisfies Meta<typeof MsqdxTextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description…",
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <MsqdxTextareaField label="Small" size="small" placeholder="Small (12px)" minRows={3} />
      <MsqdxTextareaField label="Medium" size="medium" placeholder="Medium (14px)" minRows={3} />
      <MsqdxTextareaField label="Large" size="large" placeholder="Large (16px)" minRows={3} />
    </Stack>
  ),
};

export const WithIcon: Story = {
  args: {
    label: "Notes",
    placeholder: "Add notes…",
    icon: "Note",
    minRows: 3,
  },
};

export const FixedRows: Story = {
  args: {
    label: "Short message",
    placeholder: "2 rows",
    rows: 2,
  },
};

export const Error: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    error: true,
    errorText: "Maximum 500 characters.",
    minRows: 4,
  },
};

export const Success: Story = {
  args: {
    label: "Summary",
    placeholder: "Summary",
    success: true,
    minRows: 3,
  },
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <MsqdxTextareaField label="Default" placeholder="Default" minRows={3} />
      <MsqdxTextareaField
        label="Error"
        error
        errorText="Required."
        placeholder="Error"
        minRows={3}
      />
      <MsqdxTextareaField label="Success" success placeholder="Success" minRows={3} />
    </Stack>
  ),
};
