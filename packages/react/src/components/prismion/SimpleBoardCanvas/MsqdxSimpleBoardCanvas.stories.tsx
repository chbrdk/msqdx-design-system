import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MsqdxSimpleBoardCanvas } from "./MsqdxSimpleBoardCanvas";
import type { Board, Prismion, Connection } from "../../../types/prismion";

const meta: Meta<typeof MsqdxSimpleBoardCanvas> = {
  title: "Prismion/SimpleBoardCanvas",
  component: MsqdxSimpleBoardCanvas,
  parameters: { layout: "fullscreen" },
};

export default meta;

const sampleBoard: Board = {
  id: "board-1",
  title: "Demo Board",
  shareId: "abc123",
  isPublic: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const initialPrismions: Prismion[] = [
  {
    id: "p1",
    boardId: "board-1",
    title: "Start",
    prompt: "First Prismion",
    colorToken: "#0ea5e9",
    tags: [],
    position: { x: 100, y: 100, zIndex: 10 },
    size: { w: 300, h: 200, minW: 200, minH: 100 },
    ports: {
      top: { id: "top", side: "top", capacity: "multi" },
      right: { id: "right", side: "right", capacity: "multi" },
      bottom: { id: "bottom", side: "bottom", capacity: "multi" },
      left: { id: "left", side: "left", capacity: "multi" },
    },
    state: "active",
    createdBy: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revision: 1,
  },
  {
    id: "p2",
    boardId: "board-1",
    title: "Second",
    prompt: "Another card",
    colorToken: "#22c55e",
    tags: [],
    position: { x: 500, y: 120, zIndex: 10 },
    size: { w: 300, h: 200, minW: 200, minH: 100 },
    ports: {
      top: { id: "top", side: "top", capacity: "multi" },
      right: { id: "right", side: "right", capacity: "multi" },
      bottom: { id: "bottom", side: "bottom", capacity: "multi" },
      left: { id: "left", side: "left", capacity: "multi" },
    },
    state: "active",
    createdBy: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revision: 1,
  },
];

const initialConnections: Connection[] = [
  {
    id: "c1",
    boardId: "board-1",
    fromPrismionId: "p1",
    toPrismionId: "p2",
    fromPort: "right",
    toPort: "left",
    strokeWidth: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const WithContent: StoryObj<typeof MsqdxSimpleBoardCanvas> = {
  render: function Render() {
    const [prismions, setPrismions] = useState<Prismion[]>(initialPrismions);
    const [connections, setConnections] = useState<Connection[]>(initialConnections);
    const handleCreated = (p: Prismion) => {
      setPrismions((prev) => [...prev, p]);
    };
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <MsqdxSimpleBoardCanvas
          board={sampleBoard}
          prismions={prismions}
          connections={connections}
          onPrismionCreated={handleCreated}
        />
      </div>
    );
  },
};

export const Empty: StoryObj<typeof MsqdxSimpleBoardCanvas> = {
  args: {
    board: sampleBoard,
    prismions: [],
    connections: [],
  },
};
