import React, { useState } from "react";
import JSDosEmulator from "../js-dos/js-dos-emulator";
import NesEmulator from "../nes/nes-emulator";
import type { GameId } from "../js-dos/types";

type CombinedGameId = GameId | "final-fantasy" | "dragon-quest";

type GameOption = {
  id: CombinedGameId;
  label: string;
  type: "dos" | "nes";
};

const GAME_OPTIONS: GameOption[] = [
  { id: "doom", label: "DOOM", type: "dos" },
  { id: "civ", label: "Civilization", type: "dos" },
  { id: "wolf3d", label: "Wolfenstein 3D", type: "dos" },
  { id: "final-fantasy", label: "Final Fantasy", type: "nes" },
  { id: "dragon-quest", label: "Dragon Quest", type: "nes" },
];

const isDosGame = (gameId: CombinedGameId): gameId is GameId =>
  GAME_OPTIONS.some((option) => option.id === gameId && option.type === "dos");

const EmulatorSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<CombinedGameId>("doom");

  return (
    <section id="emulator" className="emulator-mf sect-pt4 route" style={{ backgroundColor: "var(--section-bg)" }}>
      <div className="container" style={{ backgroundColor: "var(--surface-1)", borderRadius: "1%", padding: "20px" }}>
        <div className="row">
          <div className="col-sm-12">
            <div className="title-box text-center">
              <h3 className="title-a" style={{ color: "var(--text-heading)", marginTop: "25px" }}>
                Play Retro Classics
              </h3>
              <div className="line-mf"></div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "var(--surface-2)", borderRadius: "2%", padding: "16px" }}>
          <div className="emulator-game-toggle">
            {GAME_OPTIONS.map((game) => (
              <button
                key={game.id}
                type="button"
                className={`emulator-game-button${activeGame === game.id ? " is-active" : ""}`}
                onClick={() => setActiveGame(game.id)}
              >
                {game.label}
              </button>
            ))}
          </div>
          {isDosGame(activeGame) ? (
            <JSDosEmulator activeGame={activeGame} />
          ) : (
            <NesEmulator activePresetId={activeGame} />
          )}
          <p className="emulator-source">
            Powered by{" "}
            <a href="https://v8.js-dos.com/" target="_blank" rel="noopener noreferrer">
              js-dos v8 Player API
            </a>{" "}
            and{" "}
            <a href="https://github.com/bfirsh/jsnes" target="_blank" rel="noopener noreferrer">
              jsnes
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmulatorSection;
