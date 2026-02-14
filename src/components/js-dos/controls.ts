import type { GameId } from "./types";

export type ControlItem = {
  key: string;
  label: string;
};

export type ControlSection = {
  title?: string;
  items: ControlItem[];
};

export const GAME_CONTROLS: Record<GameId, ControlSection[]> = {
  doom: [
    {
      items: [
        { key: "W / S", label: "Move" },
        { key: "A / D", label: "Strafe" },
        { key: "\u2190 / \u2192", label: "Turn" },
        { key: "\u2191", label: "Fire" },
        { key: "\u2193", label: "Use/Open" },
        { key: "Shift", label: "Run" },
        { key: "Tab", label: "Automap" },
        { key: "1-7", label: "Weapons" },
      ],
    },
    {
      title: "Mouse Controls",
      items: [
        { key: "Mouse X", label: "Turn" },
        { key: "Mouse Y", label: "Disabled" },
        { key: "Mouse L", label: "Fire" },
      ],
    },
    {
      title: "Menu Controls",
      items: [
        { key: "\u2191 / \u2193", label: "Navigate" },
        { key: "Enter", label: "Select" },
      ],
    },
  ],
  civ: [
    {
      items: [
        { key: "Mouse", label: "Select / Interact" },
        { key: "Mouse R", label: "Cancel / Back" },
        { key: "Enter", label: "Confirm" },
        { key: "Esc", label: "Cancel" },
      ],
    },
  ],
  wolf3d: [
    {
      items: [
        { key: "W / S", label: "Move" },
        { key: "A / D", label: "Turn" },
        { key: "Ctrl", label: "Fire" },
        { key: "Alt", label: "Strafe" },
        { key: "Space", label: "Use/Open" },
        { key: "Shift", label: "Run" },
      ],
    },
    {
      title: "Mouse Controls",
      items: [
        { key: "Mouse X", label: "Turn" },
        { key: "Mouse Y", label: "Disabled" },
        { key: "Mouse L", label: "Fire" },
      ],
    },
  ],
};
