import type { Meta, StoryObj } from "@storybook/react";
import { Stack, Box } from "@mui/material";
import { MsqdxLogoMark } from "./MsqdxLogoMark";

const meta = {
  title: "Design System/Atoms/LogoMark",
  component: MsqdxLogoMark,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
MSQDX Logo-Mark (reines Symbol ohne Wortmarke).

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
} as Meta<typeof MsqdxLogoMark>;

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
      <MsqdxLogoMark {...args} />
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
    width: 64,
    height: 65,
    color: "black",
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="flex-end" flexWrap="wrap">
      <Stack spacing={0.5} alignItems="center">
        <span style={{ fontSize: 12, color: "#666" }}>small</span>
        <MsqdxLogoMark size="small" color="black" />
      </Stack>
      <Stack spacing={0.5} alignItems="center">
        <span style={{ fontSize: 12, color: "#666" }}>medium</span>
        <MsqdxLogoMark size="medium" color="black" />
      </Stack>
      <Stack spacing={0.5} alignItems="center">
        <span style={{ fontSize: 12, color: "#666" }}>large</span>
        <MsqdxLogoMark size="large" color="black" />
      </Stack>
      <Stack spacing={0.5} alignItems="center">
        <span style={{ fontSize: 12, color: "#666" }}>xlarge</span>
        <MsqdxLogoMark size="xlarge" color="black" />
      </Stack>
    </Stack>
  ),
};
