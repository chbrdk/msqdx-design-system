import { describe, it, expect } from "vitest";
import { ADMIN_NAV_ROOT_Z_INDEX } from "./admin-nav-layout";

describe("admin-nav-layout", () => {
  it("uses a high z-index for drawer overlay and a low z-index when docked", () => {
    expect(ADMIN_NAV_ROOT_Z_INDEX.xs).toBe(100_002);
    expect(ADMIN_NAV_ROOT_Z_INDEX.md).toBe(2);
  });
});
