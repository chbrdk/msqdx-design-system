import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { ADMIN_NAV_ROOT_Z_INDEX } from "./admin-nav-layout";

const navSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "MsqdxAdminNav.tsx"),
  "utf8"
);

describe("admin-nav-layout", () => {
  it("uses a high z-index for drawer overlay and a low z-index when docked", () => {
    expect(ADMIN_NAV_ROOT_Z_INDEX.xs).toBe(100_002);
    expect(ADMIN_NAV_ROOT_Z_INDEX.md).toBe(2);
  });

  it("renders drawer nav in a portal and docks from md breakpoint", () => {
    expect(navSource).toContain("Portal");
    expect(navSource).toContain('breakpoints.down("md")');
  });

  it("defers sidebar width transitions until after first paint", () => {
    expect(navSource).toContain("transitionsEnabled");
    expect(navSource).toContain('requestAnimationFrame');
  });

  it("uses stable desktop defaults for useMediaQuery before hydration", () => {
    expect(navSource).toContain("defaultMatches: false");
    expect(navSource).not.toMatch(/mounted && !isDrawerMode/);
  });
});
