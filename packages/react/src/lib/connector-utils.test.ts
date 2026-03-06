import { describe, it, expect } from "vitest";
import {
  computeOrthogonalPath,
  getConnectorBounds,
  CONNECTOR_BOUNDS_PADDING,
  type Point,
} from "./connector-utils";

describe("computeOrthogonalPath", () => {
  it("returns 4 points for right port: from, corner1, corner2, to", () => {
    const from: Point = { x: 100, y: 50 };
    const to: Point = { x: 300, y: 150 };
    const path = computeOrthogonalPath(from, to, "right", "left");
    expect(path).toHaveLength(4);
    expect(path[0]).toEqual(from);
    expect(path[3]).toEqual(to);
    expect(path[1].y).toBe(from.y);
    expect(path[2].y).toBe(to.y);
    expect(path[1].x).toBe(path[2].x);
    expect(path[1].x).toBeGreaterThan(from.x);
  });

  it("returns 4 points for left port with first segment going left", () => {
    const from: Point = { x: 300, y: 50 };
    const to: Point = { x: 100, y: 150 };
    const path = computeOrthogonalPath(from, to, "left", "right");
    expect(path).toHaveLength(4);
    expect(path[0]).toEqual(from);
    expect(path[3]).toEqual(to);
    expect(path[1].y).toBe(from.y);
    expect(path[1].x).toBeLessThan(from.x);
    expect(path[2].x).toBe(path[1].x);
  });

  it("returns 4 points for top port with first segment going up", () => {
    const from: Point = { x: 200, y: 200 };
    const to: Point = { x: 250, y: 50 };
    const path = computeOrthogonalPath(from, to, "top", "bottom");
    expect(path).toHaveLength(4);
    expect(path[0]).toEqual(from);
    expect(path[3]).toEqual(to);
    expect(path[1].x).toBe(from.x);
    expect(path[1].y).toBeLessThan(from.y);
    expect(path[2].y).toBe(path[1].y);
  });

  it("returns 4 points for bottom port with first segment going down", () => {
    const from: Point = { x: 200, y: 50 };
    const to: Point = { x: 250, y: 200 };
    const path = computeOrthogonalPath(from, to, "bottom", "top");
    expect(path).toHaveLength(4);
    expect(path[0]).toEqual(from);
    expect(path[3]).toEqual(to);
    expect(path[1].x).toBe(from.x);
    expect(path[1].y).toBeGreaterThan(from.y);
  });

  it("produces only horizontal and vertical segments", () => {
    const from: Point = { x: 0, y: 0 };
    const to: Point = { x: 100, y: 80 };
    const path = computeOrthogonalPath(from, to, "right", "left");
    expect(path[1].y).toBe(path[0].y);
    expect(path[2].x).toBe(path[1].x);
    expect(path[2].y).toBe(path[3].y);
    expect(path[1].x).toBe(path[2].x);
  });
});

describe("getConnectorBounds", () => {
  it("returns bounds from path with default padding", () => {
    const path: Point[] = [
      { x: 10, y: 20 },
      { x: 100, y: 20 },
      { x: 100, y: 80 },
      { x: 200, y: 80 },
    ];
    const b = getConnectorBounds(path);
    expect(b.x).toBe(10 - CONNECTOR_BOUNDS_PADDING);
    expect(b.y).toBe(20 - CONNECTOR_BOUNDS_PADDING);
    expect(b.width).toBe(200 - 10 + CONNECTOR_BOUNDS_PADDING * 2);
    expect(b.height).toBe(80 - 20 + CONNECTOR_BOUNDS_PADDING * 2);
  });

  it("returns bounds with custom padding", () => {
    const path: Point[] = [{ x: 0, y: 0 }, { x: 50, y: 50 }];
    const b = getConnectorBounds(path, 8);
    expect(b.x).toBe(-8);
    expect(b.y).toBe(-8);
    expect(b.width).toBe(50 + 16);
    expect(b.height).toBe(50 + 16);
  });

  it("returns empty bounds for empty path", () => {
    const b = getConnectorBounds([], 16);
    expect(b.x).toBe(0);
    expect(b.y).toBe(0);
    expect(b.width).toBe(32);
    expect(b.height).toBe(32);
  });
});
