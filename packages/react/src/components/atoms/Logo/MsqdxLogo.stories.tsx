import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Box } from "@mui/material";
import { MsqdxLogo } from "./MsqdxLogo";

const meta = {
  title: "Design System/Atoms/Logo",
  component: MsqdxLogo,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
MSQDX Brand Logo (vollständiges Logo mit Wortmarke).

- **size**: small, medium, large, xlarge
- **color**: black, white oder beliebige Farbe (z. B. Brand-Farben)
- **width** / **height**: eigene Maße (überschreiben size)
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large", "xlarge"],
    },
    color: {
      control: "text",
      description: "black, white oder beliebiger Farbwert",
    },
    width: { control: "number" },
    height: { control: "number" },
  },
} satisfies Meta<typeof MsqdxLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "medium",
    color: "black",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    color: "black",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    color: "black",
  },
};

export const XLarge: Story = {
  args: {
    size: "xlarge",
    color: "black",
  },
};

export const White: Story = {
  args: {
    size: "medium",
    color: "white",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: (args) => (
    <Box sx={{ padding: 2, backgroundColor: "#171717" }}>
      <MsqdxLogo {...args} />
    </Box>
  ),
};

export const BrandColorGreen: Story = {
  args: {
    size: "medium",
    color: "#00ca55",
  },
};

export const CustomSize: Story = {
  args: {
    width: 200,
    height: 48,
    color: "black",
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing={3} alignItems="flex-start">
      <Stack spacing={0.5} alignItems="flex-start">
        <span style={{ fontSize: 12, color: "#666" }}>small</span>
        <MsqdxLogo size="small" color="black" />
      </Stack>
      <Stack spacing={0.5} alignItems="flex-start">
        <span style={{ fontSize: 12, color: "#666" }}>medium</span>
        <MsqdxLogo size="medium" color="black" />
      </Stack>
      <Stack spacing={0.5} alignItems="flex-start">
        <span style={{ fontSize: 12, color: "#666" }}>large</span>
        <MsqdxLogo size="large" color="black" />
      </Stack>
      <Stack spacing={0.5} alignItems="flex-start">
        <span style={{ fontSize: 12, color: "#666" }}>xlarge</span>
        <MsqdxLogo size="xlarge" color="black" />
      </Stack>
    </Stack>
  ),
};
