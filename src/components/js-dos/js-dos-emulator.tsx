import React, { useRef, useState } from "react";
import ControlsOverlay from "./ControlsOverlay";
import { GAME_CONTROLS } from "./controls";
import GameToggle from "./GameToggle";
import type { GameId } from "./types";
import { useDosPlayer } from "./use-dos-player";
import { useHideDosMessages } from "./use-hide-dos-messages";
import { usePointerLock } from "./use-pointer-lock";
import { useWolf3dKeyRemap } from "./use-wolf3d-key-remap";

const GAME_BUNDLE_URLS: Record<GameId, string> = {
  doom: `${import.meta.env.BASE_URL}doom/doom.jsdos?v=20260213m`,
  civ: `${import.meta.env.BASE_URL}civ/civ.jsdos?v=20260214a`,
  wolf3d: `${import.meta.env.BASE_URL}wolf3d/wolf3d.jsdos?v=20260214c`,
};

const GAME_CONFIG: Record<GameId, { label: string; bundleUrl: string }> = {
  doom: {
    label: "DOOM",
    bundleUrl: GAME_BUNDLE_URLS.doom,
  },
  civ: {
    label: "Civilization",
    bundleUrl: GAME_BUNDLE_URLS.civ,
  },
  wolf3d: {
    label: "Wolfenstein 3D",
    bundleUrl: GAME_BUNDLE_URLS.wolf3d,
  },
};

const JSDosEmulator: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameId>("doom");
  const [showControls, setShowControls] = useState(true);
  const dosboxContainerRef = useRef<HTMLDivElement | null>(null);
  const { isReady, isRunning, hasClickedStart, mouseEnabled, handleStart, stopAndReset } =
    useDosPlayer({
      bundleUrl: GAME_CONFIG[activeGame].bundleUrl,
      containerRef: dosboxContainerRef,
    });
  const isPointerLocked = usePointerLock(dosboxContainerRef);

  const handleGameSwitch = (nextGame: GameId) => {
    if (nextGame === activeGame) {
      return;
    }
    if (document.pointerLockElement && document.exitPointerLock) {
      document.exitPointerLock();
    }
    stopAndReset();
    setActiveGame(nextGame);
  };

  useWolf3dKeyRemap(activeGame === "wolf3d" && isRunning, dosboxContainerRef);
  useHideDosMessages(isRunning, dosboxContainerRef);

  const handleGamePointerDown = () => {
    const container = dosboxContainerRef.current;
    if (!container) {
      return;
    }
    container.focus();
    requestAnimationFrame(() => {
      container.focus();
    });
  };

  const activeGameLabel = GAME_CONFIG[activeGame].label;
  const statusText = isRunning
    ? ""
    : (hasClickedStart
        ? (isReady ? `Loading ${activeGameLabel}...` : "Loading emulator...")
        : "Click to start");

  return (
    <section id="emulator" className="emulator-mf sect-pt4 route" style={{ backgroundColor: "var(--section-bg)" }}>
      <div className="container" style={{ backgroundColor: "var(--surface-1)", borderRadius: "1%", padding: "20px" }}>
        <div className="row">
          <div className="col-sm-12">
            <div className="title-box text-center">
              <h3 className="title-a" style={{ color: "var(--text-heading)", marginTop: "25px" }}> Play DOS Classics</h3>
              <div className="line-mf"></div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "var(--surface-2)", borderRadius: "2%", padding: "16px" }}>
          <GameToggle
            activeGame={activeGame}
            games={[
              { id: "doom", label: "DOOM" },
              { id: "civ", label: "Civilization" },
              { id: "wolf3d", label: "Wolfenstein 3D" },
            ]}
            onSwitch={handleGameSwitch}
          />
          <p className="lead" style={{ color: "var(--text-primary)", textAlign: "center", marginBottom: "16px" }}>
            Yes, this website CAN run {activeGameLabel}!
          </p>
          <div className="emulator-frame-wrap" onClick={handleStart}>
            {statusText ? (
              <div className="emulator-start-overlay" role="button" tabIndex={0} onClick={handleStart}>
                <div className="emulator-start-text">{statusText}</div>
              </div>
            ) : null}
            <div
              id="dosbox"
              className={`emulator-dosbox${mouseEnabled && isRunning ? " is-mouse-enabled" : ""}${isPointerLocked ? " is-pointer-locked" : ""}`}
              ref={dosboxContainerRef}
              tabIndex={0}
              onMouseDown={handleGamePointerDown}
            ></div>
            {isPointerLocked ? (
              <div className="emulator-esc-hint">
                Press <span className="emulator-key">Esc</span> to release mouse
              </div>
            ) : null}
            {hasClickedStart ? (
              <ControlsOverlay
                sections={GAME_CONTROLS[activeGame]}
                showControls={showControls}
                onToggle={() => setShowControls((current) => !current)}
              />
            ) : null}
          </div>
          {isReady && activeGame === "doom" ? (
            <p className="emulator-instructions">
              When the main menu loads, press <span className="emulator-key">Enter</span> to start the game.
            </p>
          ) : null}
          <p className="emulator-mobile-note">Controls only work on desktop.</p>
          <p className="emulator-source">
            Powered by{" "}
            <a href="https://v8.js-dos.com/" target="_blank" rel="noopener noreferrer">
              js-dos v8 Player API
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default JSDosEmulator;
