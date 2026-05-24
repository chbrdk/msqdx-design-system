import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const sectionDir = dirname(fileURLToPath(import.meta.url));

describe("MsqdxCornerTabSection", () => {
  it("composes MsqdxCornerTabCard without slider", () => {
    const source = readFileSync(join(sectionDir, "MsqdxCornerTabSection.tsx"), "utf8");
    expect(source).toContain("MsqdxCornerTabCard");
    expect(source).toContain("msqdx-corner-tab-section");
    expect(source).toContain("tabToolbar");
    expect(source).not.toContain("HorizontalCardSlider");
  });

  it("exports from components index", () => {
    const componentsIndex = readFileSync(
      join(sectionDir, "../../index.ts"),
      "utf8"
    );
    expect(componentsIndex).toContain("./molecules/CornerTabSection");
  });
});
