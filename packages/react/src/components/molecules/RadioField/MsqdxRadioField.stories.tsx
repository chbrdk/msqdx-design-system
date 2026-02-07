import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stack } from "@mui/material";
import { MsqdxRadioField } from "./MsqdxRadioField";

const meta = {
  title: "Design System/Molecules/RadioField",
  component: MsqdxRadioField,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Radio button group with label and optional error text. Uses \`MSQDX_INPUT\` tokens for label, helper, and icon colors/transitions.
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
} as Meta<typeof MsqdxRadioField>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

export const Default: Story = {
  args: {
    label: "Choose one",
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState<string | number>("");
    return (
      <MsqdxRadioField
        {...args}
        value={value}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
      />
    );
  },
};

export const WithPreselection: Story = {
  args: {
    label: "Choice",
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState<string | number>("b");
    return (
      <MsqdxRadioField
        {...args}
        value={value}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
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
    const [value, setValue] = useState<string | number>("");
    return (
      <MsqdxRadioField
        {...args}
        value={value}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
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
    const [value, setValue] = useState<string | number>("");
    return (
      <MsqdxRadioField
        {...args}
        value={value}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
      />
    );
  },
};

export const Error: Story = {
  args: {
    label: "Choose one",
    options: defaultOptions,
    errorText: "Please select an option.",
  },
  render: (args) => {
    const [value, setValue] = useState<string | number>("");
    return (
      <MsqdxRadioField
        {...args}
        value={value}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
      />
    );
  },
};

export const LabelColors: Story = {
  render: () => {
    const [v1, setV1] = useState<string | number>("");
    const [v2, setV2] = useState<string | number>("");
    return (
      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        <MsqdxRadioField
          label="Green (default)"
          options={defaultOptions}
          value={v1}
          onChange={(e) => setV1((e.target as HTMLInputElement).value)}
        />
        <MsqdxRadioField
          label="Orange label"
          labelColor="orange"
          options={defaultOptions}
          value={v2}
          onChange={(e) => setV2((e.target as HTMLInputElement).value)}
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
    const [value, setValue] = useState<string | number>("a");
    return (
      <MsqdxRadioField
        {...args}
        value={value}
        onChange={(e) => setValue((e.target as HTMLInputElement).value)}
      />
    );
  },
};
