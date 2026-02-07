import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Box } from "@mui/material";
import { MsqdxDashboardCard } from "./MsqdxDashboardCard";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";

const meta: Meta<typeof MsqdxDashboardCard> = {
  title: "Design System/AUDION/DashboardCard",
  component: MsqdxDashboardCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: "select",
      description: "Accordion size (padding + density)",
    },
    brandColor: {
      options: ["purple", "yellow", "pink", "orange", "green", "black"],
      control: "select",
      description: "Brand color for border and expand icon",
    },
    borderRadius: {
      options: ["none", "sm", "button", "full"],
      control: "select",
      description: "Border radius from tokens",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MsqdxDashboardCard>;

function Demo({
  expanded: initial = true,
  ...cardProps
}: { expanded?: boolean } & Partial<React.ComponentProps<typeof MsqdxDashboardCard>>) {
  const [expanded, setExpanded] = useState(initial);
  return (
    <div style={{ width: 360 }}>
      <MsqdxDashboardCard
        id="card1"
        title="Basics"
        icon="person"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        {...cardProps}
      >
        <MsqdxTypography variant="body2">Persona basics and demographics.</MsqdxTypography>
      </MsqdxDashboardCard>
    </div>
  );
}

export const Expanded: Story = {
  render: () => <Demo expanded={true} />,
};

export const Collapsed: Story = {
  render: () => <Demo expanded={false} />,
};

export const Sizes: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<string | null>("medium");
    return (
      <Box display="flex" flexDirection="column" gap={2} width={360}>
        {(["small", "medium", "large"] as const).map((size) => (
          <MsqdxDashboardCard
            key={size}
            id={size}
            title={size}
            icon="dashboard"
            size={size}
            expanded={expanded === size}
            onToggle={(id) => setExpanded(expanded === id ? null : id)}
          >
            <MsqdxTypography variant="body2">Size: {size}</MsqdxTypography>
          </MsqdxDashboardCard>
        ))}
      </Box>
    );
  },
};

export const BrandColors: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<string | null>("purple");
    const colors = ["purple", "yellow", "pink", "orange", "green"] as const;
    return (
      <Box display="flex" flexDirection="column" gap={2} width={360}>
        {colors.map((brandColor) => (
          <MsqdxDashboardCard
            key={brandColor}
            id={brandColor}
            title={brandColor}
            icon="palette"
            brandColor={brandColor}
            expanded={expanded === brandColor}
            onToggle={(id) => setExpanded(expanded === id ? null : id)}
          >
            <MsqdxTypography variant="body2">Brand: {brandColor}</MsqdxTypography>
          </MsqdxDashboardCard>
        ))}
      </Box>
    );
  },
};

export const WithOptions: Story = {
  args: {
    size: "medium",
    brandColor: "purple",
    borderRadius: "button",
  },
  render: (args) => <Demo expanded={true} {...args} />,
};
