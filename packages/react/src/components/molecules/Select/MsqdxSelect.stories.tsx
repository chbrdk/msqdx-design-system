import { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@mui/material";
import { MsqdxSelect } from "./MsqdxSelect";

const meta = {
  title: "Design System/Molecules/Select",
  component: MsqdxSelect,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Select dropdown with label, optional helper/error text. Uses \`MSQDX_INPUT\` tokens (border, background, focus ring, label, helper, size).
- **labelColor** / **borderColor**: optional brand colors
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Visual size (default: small)",
    },
    helperText: { control: "text" },
    errorText: { control: "text" },
    required: { control: "boolean" },
    success: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    labelColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    borderColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
  },
} as Meta<typeof MsqdxSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

export const Default: Story = {
  args: {
    label: "Select",
    options: defaultOptions,
    size: "small",
    fullWidth: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <MsqdxSelect
        label="Small (default)"
        options={defaultOptions}
        size="small"
        fullWidth
      />
      <MsqdxSelect
        label="Medium"
        options={defaultOptions}
        size="medium"
        fullWidth
      />
      <MsqdxSelect
        label="Large"
        options={defaultOptions}
        size="large"
        fullWidth
      />
    </Stack>
  ),
};

export const WithHelper: Story = {
  args: {
    label: "Country",
    options: [
      { value: "de", label: "Germany" },
      { value: "at", label: "Austria" },
      { value: "ch", label: "Switzerland" },
    ],
    helperText: "Choose your country.",
    fullWidth: true,
  },
};

export const Required: Story = {
  args: {
    label: "Required field",
    options: defaultOptions,
    required: true,
    fullWidth: true,
  },
};

export const Error: Story = {
  args: {
    label: "Select",
    options: defaultOptions,
    error: true,
    errorText: "Please select an option.",
    fullWidth: true,
  },
};

export const Success: Story = {
  args: {
    label: "Select",
    options: defaultOptions,
    success: true,
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    options: defaultOptions,
    disabled: true,
    fullWidth: true,
  },
};

export const BrandColors: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 400 }}>
      <MsqdxSelect
        label="Purple"
        options={defaultOptions}
        borderColor="purple"
        labelColor="purple"
        fullWidth
      />
      <MsqdxSelect
        label="Green (default)"
        options={defaultOptions}
        fullWidth
      />
      <MsqdxSelect
        label="Orange"
        options={defaultOptions}
        borderColor="orange"
        labelColor="orange"
        fullWidth
      />
    </Stack>
  ),
};

export const ManyOptions: Story = {
  args: {
    label: "Country",
    options: [
      { value: "de", label: "Germany" },
      { value: "at", label: "Austria" },
      { value: "ch", label: "Switzerland" },
      { value: "fr", label: "France" },
      { value: "it", label: "Italy" },
      { value: "es", label: "Spain" },
      { value: "nl", label: "Netherlands" },
      { value: "be", label: "Belgium" },
    ],
    fullWidth: true,
  },
};
