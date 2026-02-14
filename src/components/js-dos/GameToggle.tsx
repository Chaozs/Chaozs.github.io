import React from "react";
import type { GameId } from "./types";

type GameOption = {
  id: GameId;
  label: string;
};

type GameToggleProps = {
  activeGame: GameId;
  games: GameOption[];
  onSwitch: (gameId: GameId) => void;
};

const GameToggle: React.FC<GameToggleProps> = ({ activeGame, games, onSwitch }) => (
  <div className="emulator-game-toggle">
    {games.map((game) => (
      <button
        key={game.id}
        type="button"
        className={`emulator-game-button${activeGame === game.id ? " is-active" : ""}`}
        onClick={() => onSwitch(game.id)}
      >
        {game.label}
      </button>
    ))}
  </div>
);

export default GameToggle;
