import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const panelSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "MsqdxCollapsiblePanel.tsx"),
  "utf8",
);

describe("MsqdxCollapsiblePanel flicker guards", () => {
  it("uses hydration-safe client detection instead of mounted gate", () => {
    expect(panelSource).toContain("useSyncExternalStore");
    expect(panelSource).not.toContain("setMounted");
  });

  it("defers sidebar width transitions until after first paint", () => {
    expect(panelSource).toContain("transitionsEnabled");
    expect(panelSource).toContain("requestAnimationFrame");
  });

  it("uses stable desktop defaults for useMediaQuery before hydration", () => {
    expect(panelSource).toContain("defaultMatches: false");
    expect(panelSource).not.toMatch(/mounted && !isMobile/);
  });
});
