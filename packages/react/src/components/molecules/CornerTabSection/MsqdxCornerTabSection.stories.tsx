import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { MSQDX_COLORS } from "@msqdx/tokens";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";
import { MsqdxTypography } from "../../atoms/Typography/MsqdxTypography";
import { MsqdxCornerTabSection } from "./MsqdxCornerTabSection";
import { MsqdxCornerTabSectionTab } from "./MsqdxCornerTabSectionTab";

const meta = {
  title: "Design System/Molecules/CornerTabSection",
  component: MsqdxCornerTabSection,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Section shell with cutout corner tab and body region. No slider — use for static panels or custom content.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MsqdxCornerTabSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconOnlyTopRight: Story = {
  args: {
    placement: "top-right",
    tabAriaLabel: "Pain points",
    tab: <MsqdxIcon name="sentiment_dissatisfied" customSize={18} />,
  },
  render: (args) => (
    <Box sx={{ pt: 6, maxWidth: 420, bgcolor: MSQDX_COLORS.light.surfaceMuted, p: 2, borderRadius: 3 }}>
      <MsqdxCornerTabSection {...args}>
        <MsqdxTypography variant="body2">
          Section body content without slider or chip editor.
        </MsqdxTypography>
      </MsqdxCornerTabSection>
    </Box>
  ),
};

export const WithToolbar: Story = {
  render: () => (
    <Box sx={{ pt: 6, maxWidth: 480 }}>
      <MsqdxCornerTabSection
        placement="top-right"
        tabAriaLabel="Pain points"
        tabToolbar
        tab={
          <MsqdxCornerTabSectionTab
            heading={
              <MsqdxTypography variant="subtitle2" component="span">
                Pain Points (12)
              </MsqdxTypography>
            }
          >
            <MsqdxIcon name="edit" customSize={18} />
          </MsqdxCornerTabSectionTab>
        }
      >
        <MsqdxTypography variant="body2">
          Toolbar in the corner tab; body accepts any React children.
        </MsqdxTypography>
      </MsqdxCornerTabSection>
    </Box>
  ),
};
