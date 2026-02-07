/**
 * MSQDX Layout Tokens
 * 
 * Grid system, aspect ratios, and layout-related tokens.
 */

export const MSQDX_LAYOUT = {
  // Grid System
  grid: {
    columns: {
      xs: 4,   // Mobile: 4 columns
      sm: 8,   // Tablet: 8 columns
      md: 12,  // Desktop: 12 columns
      lg: 12,  // Large Desktop: 12 columns
      xl: 12,  // Extra Large: 12 columns
    },
    gutter: {
      xs: 16,  // 16px on mobile
      md: 24,  // 24px on desktop
    },
    container: {
      xs: "100%",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },
  },
  
  // Aspect Ratios (for cards, media, thumbnails)
  aspectRatio: {
    square: "1 / 1",
    video: "16 / 9",
    photo: "4 / 3",
    portrait: "3 / 4",
    wide: "21 / 9",
    ultrawide: "32 / 9",
  },

  // Object fit for images inside aspect-ratio containers
  objectFit: {
    cover: "cover",
    contain: "contain",
    fill: "fill",
    none: "none",
  },
  
  // Max Widths
  maxWidth: {
    xs: "20rem",    // 320px
    sm: "24rem",    // 384px
    md: "28rem",    // 448px
    lg: "32rem",    // 512px
    xl: "36rem",    // 576px
    "2xl": "42rem", // 672px
    "3xl": "48rem", // 768px
    "4xl": "56rem", // 896px
    "5xl": "64rem", // 1024px
    "6xl": "72rem", // 1152px
    "7xl": "80rem", // 1280px
    full: "100%",
  },
  
  // Min Heights
  minHeight: {
    screen: "100vh",
    full: "100%",
    xs: "2rem",     // 32px
    sm: "4rem",     // 64px
    md: "8rem",     // 128px
    lg: "12rem",    // 192px
    xl: "16rem",    // 256px
  },

  // Alignment (Grid / Flex / Text)
  alignment: {
    // justify-content (Hauptachse)
    justify: {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    },
    // align-items (Querachse)
    align: {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      stretch: "stretch",
      baseline: "baseline",
    },
    // align-self / justify-self (einzelnes Item)
    self: {
      auto: "auto",
      start: "flex-start",
      center: "center",
      end: "flex-end",
      stretch: "stretch",
      baseline: "baseline",
    },
    // text-align
    text: {
      left: "left",
      center: "center",
      right: "right",
      justify: "justify",
    },
    // place-content (align + justify für Grid)
    placeContent: {
      start: "start",
      center: "center",
      end: "end",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
      stretch: "stretch",
    },
    // place-items (align-items + justify-items für Grid)
    placeItems: {
      start: "start",
      center: "center",
      end: "end",
      stretch: "stretch",
    },
  },

  // Flex/Grid direction & flow
  direction: {
    row: "row",
    rowReverse: "row-reverse",
    column: "column",
    columnReverse: "column-reverse",
  },
  gridFlow: {
    row: "row",
    column: "column",
    rowDense: "row dense",
    columnDense: "column dense",
  },

  // Overflow (scrollbare Bereiche, clipping)
  overflow: {
    visible: "visible",
    hidden: "hidden",
    clip: "clip",
    scroll: "scroll",
    auto: "auto",
  },
  overflowX: {
    visible: "visible",
    hidden: "hidden",
    clip: "clip",
    scroll: "scroll",
    auto: "auto",
  },
  overflowY: {
    visible: "visible",
    hidden: "hidden",
    clip: "clip",
    scroll: "scroll",
    auto: "auto",
  },

  // Cursor (Interaktionszustand)
  cursor: {
    auto: "auto",
    default: "default",
    pointer: "pointer",
    wait: "wait",
    text: "text",
    move: "move",
    notAllowed: "not-allowed",
    grab: "grab",
    grabbing: "grabbing",
    none: "none",
  },
};
