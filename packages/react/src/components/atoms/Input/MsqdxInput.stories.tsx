import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack } from "@mui/material";
import { MsqdxInput } from "./MsqdxInput";
import { MsqdxSearchField } from "../../molecules/SearchField/MsqdxSearchField";

const meta = {
  title: "Design System/Atoms/Input",
  component: MsqdxInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Text input for the MSQDX Glass Design System. Token-based styling with animated focus, hover, and state transitions.

## Features
- **Sizes**: small, medium, large
- **States**: default, error, success, disabled
- **Icons**: start and end (Material Symbols)
- **Types**: text, email, password, search, etc.
- **Transitions**: border, background, box-shadow use \`MSQDX_INPUT.transition\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Input size",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "number", "tel", "url"],
      description: "Input type",
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "boolean" },
    success: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof MsqdxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    fullWidth: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <MsqdxInput label="Small" size="small" placeholder="Small input" fullWidth />
      <MsqdxInput label="Medium" size="medium" placeholder="Medium (default)" fullWidth />
      <MsqdxInput label="Large" size="large" placeholder="Large input" fullWidth />
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <MsqdxInput
        label="Email"
        type="email"
        startIcon="Mail"
        placeholder="you@example.com"
        fullWidth
      />
      <MsqdxInput
        label="Password"
        type="password"
        startIcon="Lock"
        placeholder="••••••••"
        fullWidth
      />
      <MsqdxInput
        label="Website"
        type="url"
        startIcon="Link"
        placeholder="https://"
        fullWidth
      />
    </Stack>
  ),
};

export const Search: Story = {
  render: () => (
    <Box sx={{ maxWidth: 400 }}>
      <MsqdxSearchField label="Search" placeholder="Search…" fullWidth />
    </Box>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <MsqdxInput label="Default" placeholder="Default state" fullWidth />
      <MsqdxInput
        label="Error"
        error
        errorText="This field is required."
        placeholder="Error state"
        fullWidth
      />
      <MsqdxInput
        label="Success"
        success
        helperText="Looks good."
        placeholder="Success state"
        fullWidth
      />
      <MsqdxInput label="Disabled" disabled placeholder="Disabled" fullWidth />
    </Stack>
  ),
};

export const WithoutLabel: Story = {
  args: {
    placeholder: "No label",
    fullWidth: true,
  },
};

export const BrandColors: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <MsqdxInput label="Purple" borderColor="purple" labelColor="purple" placeholder="Border + label" fullWidth />
      <MsqdxInput label="Green" borderColor="green" labelColor="green" placeholder="Default brand" fullWidth />
      <MsqdxInput label="Orange" borderColor="orange" labelColor="orange" placeholder="Orange" fullWidth />
    </Stack>
  ),
};
