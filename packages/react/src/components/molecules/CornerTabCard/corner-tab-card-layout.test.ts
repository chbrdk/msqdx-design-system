import { describe, expect, it } from "vitest";
import {
  CORNER_TAB_CARD_DEFAULTS,
  getCornerTabCardLayout,
} from "./corner-tab-card-layout";

describe("getCornerTabCardLayout", () => {
  it("uses BVik-aligned defaults", () => {
    expect(CORNER_TAB_CARD_DEFAULTS.tabWidthPx).toBe(48);
    expect(CORNER_TAB_CARD_DEFAULTS.tabHeightPx).toBe(32);
    expect(CORNER_TAB_CARD_DEFAULTS.cornerBoxWidthExtraPx).toBe(14);
  });

  it("top-left: flat top-left on body, cutdown on tab bottom-right", () => {
    const layout = getCornerTabCardLayout({ placement: "top-left" });
    expect(layout.bodyBorderRadius).toBe("0 14px 14px 14px");
    expect(layout.tabContainerBorderRadius).toBe("16px 0 0 0");
    expect(layout.cornerStyles.bottomRight).toBe("cutdown-a");
    expect(layout.cornerStyles.bottomLeft).toBe("square");
    expect(layout.tabContainerSx).toMatchObject({ left: 0, top: -32 });
  });

  it("top-right: flat top-right on body, cutdown on tab bottom-left", () => {
    const layout = getCornerTabCardLayout({ placement: "top-right" });
    expect(layout.bodyBorderRadius).toBe("14px 0 14px 14px");
    expect(layout.tabContainerBorderRadius).toBe("0 16px 0 0");
    expect(layout.cornerStyles.bottomLeft).toBe("cutdown-a");
    expect(layout.cornerStyles.bottomRight).toBe("square");
    expect(layout.tabContainerSx).toMatchObject({ right: 0, top: -32 });
    expect(layout.cornerBoxSx).toMatchObject({ right: 0 });
    expect(layout.cornerBoxSx).not.toHaveProperty("borderRadius");
  });

  it("extends corner box width for cutdown alignment", () => {
    const layout = getCornerTabCardLayout({
      placement: "top-left",
      cornerBoxWidthExtraPx: 20,
    });
    expect(layout.cornerBoxSx).toMatchObject({ width: "calc(100% + 20px)" });
  });

  it("auto-width tab grows for toolbar content", () => {
    const layout = getCornerTabCardLayout({
      placement: "top-right",
      tabWidthAuto: true,
    });
    expect(layout.tabContainerSx).toMatchObject({
      width: "max-content",
      top: `-${CORNER_TAB_CARD_DEFAULTS.tabContainerTopOffsetAutoPx}px`,
      pointerEvents: "auto",
    });
    expect(layout.cornerBoxSx).toMatchObject({
      width: "fit-content",
      position: "relative",
    });
  });
});
