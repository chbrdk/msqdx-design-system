import type { Meta, StoryObj } from "@storybook/react";
import { MsqdxBoardHeader } from "./MsqdxBoardHeader";
import type { Board, BoardParticipant } from "../../../types/prismion";

const meta: Meta<typeof MsqdxBoardHeader> = {
  title: "Prismion/BoardHeader",
  component: MsqdxBoardHeader,
  parameters: { layout: "fullscreen" },
};

export default meta;

const sampleBoard: Board = {
  id: "board-1",
  title: "Mein PRISMORA Board",
  shareId: "abc123",
  isPublic: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const sampleParticipants: BoardParticipant[] = [
  { id: "u1", boardId: "board-1", userName: "Alice", userColor: "#6366f1", isActive: true, lastActiveAt: new Date().toISOString(), role: "EDITOR", joinedAt: new Date().toISOString() },
  { id: "u2", boardId: "board-1", userName: "Bob", userColor: "#22c55e", isActive: true, lastActiveAt: new Date().toISOString(), role: "EDITOR", joinedAt: new Date().toISOString() },
];

export const Default: StoryObj<typeof MsqdxBoardHeader> = {
  args: {
    board: sampleBoard,
    participants: sampleParticipants,
    boardShareUrl: "https://app.example.com/board/abc123",
  },
};

export const NoShareUrl: StoryObj<typeof MsqdxBoardHeader> = {
  args: {
    board: sampleBoard,
    participants: [],
    boardShareUrl: undefined,
  },
};
