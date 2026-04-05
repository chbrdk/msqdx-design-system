import { describe, it, expect } from "vitest";
import { ADMIN_NAV_ROOT_Z_INDEX } from "./admin-nav-layout";

/** CHECKION AppShell header bar z-index — mobile nav must stack above it when open. */
const CHECKION_HEADER_Z_INDEX = 100_001;

describe("ADMIN_NAV_ROOT_Z_INDEX", () => {
  it("mobile overlay stacks above CHECKION header chrome", () => {
    expect(ADMIN_NAV_ROOT_Z_INDEX.xs).toBeGreaterThan(CHECKION_HEADER_Z_INDEX);
  });

  it("desktop uses a small positive stacking value", () => {
    expect(ADMIN_NAV_ROOT_Z_INDEX.md).toBeGreaterThan(0);
    expect(ADMIN_NAV_ROOT_Z_INDEX.md).toBeLessThan(1300);
  });
});
