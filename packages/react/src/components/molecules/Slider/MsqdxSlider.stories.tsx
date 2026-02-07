import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stack, Box } from "@mui/material";
import { MsqdxSlider } from "./MsqdxSlider";

const meta = {
  title: "Design System/Molecules/Slider",
  component: MsqdxSlider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Slider horizontal und vertikal, token-basiert (MSQDX_SPACING, MSQDX_EFFECTS, MSQDX_COLORS).
- **brandColor**: purple, yellow, pink, orange, green, black
- **orientation**: horizontal | vertical
- **track**: normal | inverted | false
- **size**: small | medium
- **marks**, **valueLabelDisplay**, **min**, **max**, **step**
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    brandColor: {
      control: "select",
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
    },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    track: {
      control: "select",
      options: ["normal", "inverted", false],
    },
    size: { control: "radio", options: ["small", "medium"] },
    valueLabelDisplay: {
      control: "select",
      options: ["on", "auto", "off"],
    },
    disabled: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
} as Meta<typeof MsqdxSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brandColor: "green",
    defaultValue: 50,
    valueLabelDisplay: "auto",
  },
};

export const WithMarks: Story = {
  args: {
    brandColor: "purple",
    defaultValue: 30,
    marks: true,
    step: 10,
    valueLabelDisplay: "on",
    min: 0,
    max: 100,
  },
};

export const CustomMarks: Story = {
  args: {
    brandColor: "orange",
    defaultValue: 20,
    marks: [
      { value: 0, label: "0" },
      { value: 25, label: "25" },
      { value: 50, label: "50" },
      { value: 75, label: "75" },
      { value: 100, label: "100" },
    ],
    valueLabelDisplay: "on",
  },
};

export const SmallSize: Story = {
  args: {
    brandColor: "green",
    size: "small",
    defaultValue: 40,
    valueLabelDisplay: "auto",
  },
};

export const InvertedTrack: Story = {
  args: {
    brandColor: "pink",
    track: "inverted",
    defaultValue: 70,
    valueLabelDisplay: "on",
  },
};

export const NoTrack: Story = {
  args: {
    brandColor: "green",
    track: false,
    defaultValue: 50,
    valueLabelDisplay: "on",
  },
};

export const Vertical: Story = {
  args: {
    brandColor: "green",
    orientation: "vertical",
    defaultValue: 50,
    valueLabelDisplay: "auto",
  },
  render: (args) => (
    <Box sx={{ height: 200, display: "flex", justifyContent: "center" }}>
      <MsqdxSlider {...args} />
    </Box>
  ),
};

export const VerticalWithMarks: Story = {
  args: {
    brandColor: "purple",
    orientation: "vertical",
    defaultValue: 50,
    marks: true,
    step: 25,
    valueLabelDisplay: "on",
    min: 0,
    max: 100,
  },
  render: (args) => (
    <Box sx={{ height: 220, display: "flex", justifyContent: "center" }}>
      <MsqdxSlider {...args} />
    </Box>
  ),
};

export const Range: Story = {
  args: {
    brandColor: "green",
    defaultValue: [20, 80],
    valueLabelDisplay: "on",
    min: 0,
    max: 100,
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState<number>(30);
    return (
      <Stack spacing={2} sx={{ maxWidth: 320 }}>
        <MsqdxSlider
          brandColor="green"
          value={value}
          onChange={(_, v) => setValue(v as number)}
          valueLabelDisplay="on"
        />
        <span>Value: {value}</span>
      </Stack>
    );
  },
};

export const AllBrandColors: Story = {
  render: () => (
    <Stack spacing={3} sx={{ maxWidth: 360 }}>
      {(["green", "purple", "yellow", "pink", "orange", "black"] as const).map(
        (brandColor) => (
          <Stack key={brandColor} spacing={0.5}>
            <span style={{ fontSize: 12, textTransform: "capitalize" }}>
              {brandColor}
            </span>
            <MsqdxSlider
              brandColor={brandColor}
              defaultValue={50}
              valueLabelDisplay="off"
            />
          </Stack>
        )
      )}
    </Stack>
  ),
};
