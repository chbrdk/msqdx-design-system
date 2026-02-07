import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stack } from "@mui/material";
import { MsqdxCheckboxField } from "./MsqdxCheckboxField";

const meta = {
  title: "Design System/Molecules/CheckboxField",
  component: MsqdxCheckboxField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Checkbox group with label and optional error text. Uses \`MSQDX_INPUT\` tokens for label, helper, and icon colors/transitions.
- **labelColor**: optional brand color for the label
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    errorText: { control: "text" },
    required: { control: "boolean" },
    row: { control: "boolean" },
    labelColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
  },
} as Meta<typeof MsqdxCheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

export const Default: Story = {
  args: {
    label: "Choose options",
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>([]);
    return (
      <MsqdxCheckboxField
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithPreselection: Story = {
  args: {
    label: "Preferences",
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>(["a"]);
    return (
      <MsqdxCheckboxField
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Row: Story = {
  args: {
    label: "Inline options",
    options: defaultOptions,
    row: true,
  },
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>([]);
    return (
      <MsqdxCheckboxField
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Required: Story = {
  args: {
    label: "Required field",
    options: defaultOptions,
    required: true,
  },
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>([]);
    return (
      <MsqdxCheckboxField
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Error: Story = {
  args: {
    label: "Choose at least one",
    options: defaultOptions,
    errorText: "Please select at least one option.",
  },
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>([]);
    return (
      <MsqdxCheckboxField
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const LabelColors: Story = {
  render: () => {
    const [v1, setV1] = useState<(string | number)[]>([]);
    const [v2, setV2] = useState<(string | number)[]>([]);
    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <MsqdxCheckboxField
          label="Green (default)"
          options={defaultOptions}
          value={v1}
          onChange={setV1}
        />
        <MsqdxCheckboxField
          label="Purple label"
          labelColor="purple"
          options={defaultOptions}
          value={v2}
          onChange={setV2}
        />
      </Stack>
    );
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "Options",
    options: [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B (disabled)", disabled: true },
      { value: "c", label: "Option C" },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState<(string | number)[]>(["b"]);
    return (
      <MsqdxCheckboxField
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};
