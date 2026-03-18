import React, { useState } from "react";
import JSDosEmulator from "../js-dos/js-dos-emulator";
import NesEmulator from "../nes/nes-emulator";
import type { GameId } from "../js-dos/types";
import SectionHeader from "../shared/SectionHeader";
import SectionShell from "../shared/SectionShell";
import SurfaceCard from "../shared/SurfaceCard";

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
    <SectionShell id="emulator" className="sect-pt4">
      <div className="row">
        <div className="col-sm-12">
          <SectionHeader command="initialize mission select" />
          <p className="emulator-briefing">
            Select a target from the roster and deploy into the sim.
          </p>
        </div>
      </div>
      <SurfaceCard padding="16px">
        <div className="emulator-roster-label">Mission Roster</div>
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
      </SurfaceCard>
    </SectionShell>
  );
};

export default EmulatorSection;
