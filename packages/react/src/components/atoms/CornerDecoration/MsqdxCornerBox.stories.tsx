import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { MsqdxCornerBox } from './MsqdxCornerBox';
import { MSQDX_COLORS, MSQDX_LAYOUT, MSQDX_SPACING } from '@msqdx/tokens';

const PADDING_OPTIONS = ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const;
const BRAND_COLORS = ['purple', 'yellow', 'pink', 'orange', 'green', 'black'] as const;
const WIDTH_OPTIONS = ['auto', '100%', '50%', '200px', '300px', 'min-content'] as const;
const ALIGN_OPTIONS = Object.keys(MSQDX_LAYOUT.alignment.align) as (keyof typeof MSQDX_LAYOUT.alignment.align)[];
const JUSTIFY_OPTIONS = Object.keys(MSQDX_LAYOUT.alignment.justify) as (keyof typeof MSQDX_LAYOUT.alignment.justify)[];

const meta = {
  title: 'Design System/Atoms/CornerBox',
  component: MsqdxCornerBox,
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'borderRadius',
        'padding',
        'paddingX',
        'paddingY',
        'width',
        'appName',
        'alignItems',
        'justifyContent',
        'headerAlign',
        'headerJustify',
        'brandColor',
      ],
    },
    docs: {
      description: {
        component: `
Box with per-corner control: **rounded**, **square**, or **cutdown** (concave scooped corner).

- **rounded**: normal border-radius
- **square**: no radius
- **cutdown-a** / **cutdown-b**: zwei Anheft-Varianten pro Ecke

Pro Ecke 8 Optionen: 4 Ecken × 2 Cutout-Varianten.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    topLeft: {
      control: 'select',
      options: ['rounded', 'square', 'cutdown-a', 'cutdown-b'],
      description: 'Top-left corner',
    },
    topRight: {
      control: 'select',
      options: ['rounded', 'square', 'cutdown-a', 'cutdown-b'],
    },
    bottomLeft: {
      control: 'select',
      options: ['rounded', 'square', 'cutdown-a', 'cutdown-b'],
      description: 'Bottom-left (zwei Cutout-Varianten)',
    },
    bottomRight: {
      control: 'select',
      options: ['rounded', 'square', 'cutdown-a', 'cutdown-b'],
      description: 'Bottom-right (zwei Cutout-Varianten)',
    },
    borderRadius: { control: 'number', description: 'Radius in px (rounded + cutdown curve)' },
    padding: {
      control: 'select',
      options: PADDING_OPTIONS,
      description: 'Innenabstand (Token)',
    },
    paddingX: {
      control: 'select',
      options: PADDING_OPTIONS,
      description: 'Innenabstand horizontal',
    },
    paddingY: {
      control: 'select',
      options: PADDING_OPTIONS,
      description: 'Innenabstand vertikal',
    },
    width: {
      control: 'select',
      options: WIDTH_OPTIONS,
      description: 'Breite der Box (CSS width)',
    },
    appName: {
      control: 'text',
      description: 'App-Name rechts neben dem Logo (mit Divider dazwischen)',
    },
    alignItems: {
      control: 'select',
      options: ALIGN_OPTIONS,
      description: 'align-items (Layout-Token)',
    },
    justifyContent: {
      control: 'select',
      options: JUSTIFY_OPTIONS,
      description: 'justify-content (Layout-Token)',
    },
    headerAlign: {
      control: 'select',
      options: ALIGN_OPTIONS,
      description: 'Header-Zeile: align-items (Layout-Token)',
    },
    headerJustify: {
      control: 'select',
      options: JUSTIFY_OPTIONS,
      description: 'Header-Zeile: justify-content (Layout-Token)',
    },
    brandColor: {
      control: 'select',
      options: BRAND_COLORS,
      description: 'Hintergrundfarbe der Box (nur in Story)',
    },
  },
} as Meta<typeof MsqdxCornerBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const boxSx = {
  width: 'auto',
  minWidth: 120,
  minHeight: 60,
  bgcolor: 'grey.200',
  border: '1px solid',
  borderColor: 'grey.400',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * All corners rounded (default)
 */
export const AllRounded: Story = {
  args: {
    topLeft: 'rounded',
    topRight: 'rounded',
    bottomLeft: 'rounded',
    bottomRight: 'rounded',
    borderRadius: MSQDX_SPACING.borderRadius.md,
  },
  render: (args) => {
    const { brandColor, width, ...rest } = args as typeof args & {
      brandColor?: (typeof BRAND_COLORS)[number];
      width?: (typeof WIDTH_OPTIONS)[number];
    };
    return (
      <MsqdxCornerBox
        {...rest}
        sx={{ ...boxSx, ...(width && { width }), ...(brandColor && { bgcolor: MSQDX_COLORS.brand[brandColor] }) }}
      >
        All rounded
      </MsqdxCornerBox>
    );
  },
};

/**
 * Only top corners rounded
 */
export const TopCornersRounded: Story = {
  args: {
    topLeft: 'rounded',
    topRight: 'rounded',
    bottomLeft: 'square',
    bottomRight: 'square',
  },
  render: (args) => {
    const { brandColor, width, ...rest } = args as typeof args & {
      brandColor?: (typeof BRAND_COLORS)[number];
      width?: (typeof WIDTH_OPTIONS)[number];
    };
    return (
      <MsqdxCornerBox
        {...rest}
        sx={{ ...boxSx, ...(width && { width }), ...(brandColor && { bgcolor: MSQDX_COLORS.brand[brandColor] }) }}
      >
        Top rounded
      </MsqdxCornerBox>
    );
  },
};

/**
 * Cutdown bottom-left Variante A (an unterer Kante + linker Seite)
 */
export const CutdownBottomLeftA: Story = {
  args: {
    topLeft: 'rounded',
    topRight: 'rounded',
    bottomLeft: 'cutdown-a',
    bottomRight: 'rounded',
    borderRadius: MSQDX_SPACING.borderRadius.md,
  },
  render: (args) => {
    const { brandColor, width, ...rest } = args as typeof args & {
      brandColor?: (typeof BRAND_COLORS)[number];
      width?: (typeof WIDTH_OPTIONS)[number];
    };
    return (
      <Box sx={{ position: 'relative', width: 200, height: 120, bgcolor: MSQDX_COLORS.brand.green, borderRadius: 1 }}>
        <MsqdxCornerBox
          {...rest}
          sx={{
            ...boxSx,
            position: 'absolute',
            inset: 0,
            ...(width ? { width } : { width: '100%' }),
            height: '100%',
            ...(brandColor ? { bgcolor: MSQDX_COLORS.brand[brandColor] } : { bgcolor: 'background.paper' }),
            border: 'none',
          }}
        >
          Cutdown BL (a)
        </MsqdxCornerBox>
      </Box>
    );
  },
};

/**
 * Cutdown bottom-right Variante A und B (zwei Anheft-Möglichkeiten)
 */
export const CutdownBottomRightVariants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Box sx={{ position: 'relative', width: 160, height: 100, bgcolor: MSQDX_COLORS.brand.green, borderRadius: 1 }}>
        <MsqdxCornerBox
          bottomRight="cutdown-a"
          borderRadius={20}
          sx={{
            ...boxSx,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'background.paper',
            border: 'none',
          }}
        >
          unten rechts (a)
        </MsqdxCornerBox>
      </Box>
      <Box sx={{ position: 'relative', width: 160, height: 100, bgcolor: MSQDX_COLORS.brand.green, borderRadius: 1 }}>
        <MsqdxCornerBox
          bottomRight="cutdown-b"
          borderRadius={20}
          sx={{
            ...boxSx,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'background.paper',
            border: 'none',
          }}
        >
          unten rechts (b)
        </MsqdxCornerBox>
      </Box>
    </Box>
  ),
};

/**
 * Only bottom corners rounded
 */
export const BottomCornersRounded: Story = {
  args: {
    topLeft: 'square',
    topRight: 'square',
    bottomLeft: 'rounded',
    bottomRight: 'rounded',
  },
  render: (args) => {
    const { brandColor, width, ...rest } = args as typeof args & {
      brandColor?: (typeof BRAND_COLORS)[number];
      width?: (typeof WIDTH_OPTIONS)[number];
    };
    return (
      <MsqdxCornerBox
        {...rest}
        sx={{ ...boxSx, ...(width && { width }), ...(brandColor && { bgcolor: MSQDX_COLORS.brand[brandColor] }) }}
      >
        Bottom rounded
      </MsqdxCornerBox>
    );
  },
};

/**
 * All square (no rounding)
 */
export const AllSquare: Story = {
  args: {
    topLeft: 'square',
    topRight: 'square',
    bottomLeft: 'square',
    bottomRight: 'square',
  },
  render: (args) => {
    const { brandColor, width, ...rest } = args as typeof args & {
      brandColor?: (typeof BRAND_COLORS)[number];
      width?: (typeof WIDTH_OPTIONS)[number];
    };
    return (
      <MsqdxCornerBox
        {...rest}
        sx={{ ...boxSx, ...(width && { width }), ...(brandColor && { bgcolor: MSQDX_COLORS.brand[brandColor] }) }}
      >
        All square
      </MsqdxCornerBox>
    );
  },
};

/**
 * Custom radius
 */
export const CustomRadius: Story = {
  args: {
    borderRadius: 32,
  },
  render: (args) => {
    const { brandColor, width, ...rest } = args as typeof args & {
      brandColor?: (typeof BRAND_COLORS)[number];
      width?: (typeof WIDTH_OPTIONS)[number];
    };
    return (
      <MsqdxCornerBox
        {...rest}
        sx={{ ...boxSx, ...(width && { width }), ...(brandColor && { bgcolor: MSQDX_COLORS.brand[brandColor] }) }}
      >
        Radius 32px
      </MsqdxCornerBox>
    );
  },
};

/**
 * Mit Logo (MsqdxLogo) und App-Name (Typo-Tokens), Divider dazwischen
 */
export const WithLogoAndAppName: Story = {
  args: {
    appName: 'My App',
    padding: 'md',
  },
  render: (args) => {
    const { brandColor, width, ...rest } = args as typeof args & {
      brandColor?: (typeof BRAND_COLORS)[number];
      width?: (typeof WIDTH_OPTIONS)[number];
    };
    return (
      <MsqdxCornerBox
        {...rest}
        logo={{ size: 'small', color: 'black' }}
        sx={{ ...boxSx, ...(width && { width }), ...(brandColor && { bgcolor: MSQDX_COLORS.brand[brandColor] }) }}
      />
    );
  },
};

/**
 * Playground: Ecken, Radius, Padding, Brand-Farbe
 */
export const Playground: Story = {
  args: {
    topLeft: 'rounded',
    topRight: 'rounded',
    bottomLeft: 'rounded',
    bottomRight: 'rounded',
    borderRadius: MSQDX_SPACING.borderRadius.md,
    padding: 'md',
  },
  render: (args) => {
    const { brandColor, width, ...rest } = args as typeof args & {
      brandColor?: (typeof BRAND_COLORS)[number];
      width?: (typeof WIDTH_OPTIONS)[number];
    };
    return (
      <MsqdxCornerBox
        {...rest}
        sx={{ ...boxSx, ...(width && { width }), ...(brandColor && { bgcolor: MSQDX_COLORS.brand[brandColor] }) }}
      >
        Toggle in controls
      </MsqdxCornerBox>
    );
  },
};
