import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MsqdxCornerTabCard } from "./MsqdxCornerTabCard";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MSQDX_COLORS } from "@msqdx/tokens";

const meta = {
  title: "Design System/Molecules/CornerTabCard",
  component: MsqdxCornerTabCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Card with a corner tab using `MsqdxCornerBox` cutdown geometry (BVik workflow nodes). Placement: top-left or top-right.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "radio",
      options: ["top-left", "top-right"],
    },
  },
} satisfies Meta<typeof MsqdxCornerTabCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabIcon = (
  <MsqdxIcon name="route" customSize={18} style={{ color: "#fff" }} />
);

export const TopLeft: Story = {
  args: {
    placement: "top-left",
    bodyColor: MSQDX_COLORS.brand.purple,
    tab: tabIcon,
    tabAriaLabel: "Workflow category",
  },
  render: (args) => (
    <Box sx={{ pt: 5, maxWidth: 320 }}>
      <MsqdxCornerTabCard {...args} sx={{ p: 2, color: "#fff" }}>
        <MsqdxTypography variant="body1" sx={{ color: "inherit" }}>
          Pain point or workflow step content.
        </MsqdxTypography>
      </MsqdxCornerTabCard>
    </Box>
  ),
};

export const TopRight: Story = {
  args: {
    placement: "top-right",
    bodyColor: MSQDX_COLORS.brand.green,
    tab: tabIcon,
    tabAriaLabel: "Workflow category",
  },
  render: (args) => (
    <Box sx={{ pt: 5, maxWidth: 320 }}>
      <MsqdxCornerTabCard {...args} sx={{ p: 2, color: "#fff" }}>
        <MsqdxTypography variant="body1" sx={{ color: "inherit" }}>
          Tab on the top-right corner.
        </MsqdxTypography>
      </MsqdxCornerTabCard>
    </Box>
  ),
};

export const SideBySide: Story = {
  render: () => (
    <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", pt: 5 }}>
      <Box sx={{ width: 280 }}>
        <MsqdxCornerTabCard
          placement="top-left"
          bodyColor={MSQDX_COLORS.brand.pink}
          tab={tabIcon}
          sx={{ p: 2, color: "#fff" }}
        >
          <MsqdxTypography variant="body2" sx={{ color: "inherit" }}>
            Top left
          </MsqdxTypography>
        </MsqdxCornerTabCard>
      </Box>
      <Box sx={{ width: 280 }}>
        <MsqdxCornerTabCard
          placement="top-right"
          bodyColor={MSQDX_COLORS.brand.orange}
          tab={tabIcon}
          sx={{ p: 2, color: "#fff" }}
        >
          <MsqdxTypography variant="body2" sx={{ color: "inherit" }}>
            Top right
          </MsqdxTypography>
        </MsqdxCornerTabCard>
      </Box>
    </Box>
  ),
};
