import { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@mui/material";
import { MsqdxFormField } from "./MsqdxFormField";

const meta = {
  title: "Design System/Molecules/FormField",
  component: MsqdxFormField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Form field (single-line text input) with label, optional icon, and error/success states.
Uses MSQDX input tokens for border, background, focus ring, and **animated transitions** (border, background, box-shadow).
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "boolean" },
    success: { control: "boolean" },
    required: { control: "boolean" },
  },
} as Meta<typeof MsqdxFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Field",
    placeholder: "Placeholder",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    icon: "Mail",
  },
};

export const Error: Story = {
  args: {
    label: "Required field",
    placeholder: "Enter value",
    error: true,
    errorText: "This field is required.",
    required: true,
  },
};

export const Success: Story = {
  args: {
    label: "Username",
    placeholder: "username",
    success: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Disabled",
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <MsqdxFormField label="Default" placeholder="Default" />
      <MsqdxFormField label="Error" error errorText="Invalid value." placeholder="Error" />
      <MsqdxFormField label="Success" success placeholder="Success" />
      <MsqdxFormField label="Disabled" disabled placeholder="Disabled" />
    </Stack>
  ),
};
