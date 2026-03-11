import React, { useEffect, useRef, useState } from "react";
import EmulatorShell from "../emulator/EmulatorShell";
import { GAME_CONTROLS } from "./controls";
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

type JSDosEmulatorProps = {
  activeGame: GameId;
};

const JSDosEmulator: React.FC<JSDosEmulatorProps> = ({ activeGame }) => {
  const [showControls, setShowControls] = useState(true);
  const dosboxContainerRef = useRef<HTMLDivElement | null>(null);
  const { isReady, isRunning, hasClickedStart, mouseEnabled, handleStart, stopAndReset } =
    useDosPlayer({
      bundleUrl: GAME_CONFIG[activeGame].bundleUrl,
      containerRef: dosboxContainerRef,
    });
  const isPointerLocked = usePointerLock(dosboxContainerRef);
  const previousGameRef = useRef<GameId>(activeGame);

  useWolf3dKeyRemap(activeGame === "wolf3d" && isRunning, dosboxContainerRef);
  useHideDosMessages(isRunning, dosboxContainerRef);

  useEffect(() => {
    if (previousGameRef.current === activeGame) {
      return;
    }
    if (document.pointerLockElement && document.exitPointerLock) {
      document.exitPointerLock();
    }
    stopAndReset();
    previousGameRef.current = activeGame;
  }, [activeGame, stopAndReset]);

  useEffect(() => {
    const container = dosboxContainerRef.current;
    if (!container || !isRunning || !isPointerLocked) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!event.isTrusted || event.movementY === 0) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      const target = event.target instanceof Element ? event.target : container;
      const synthetic = new MouseEvent(event.type, {
        bubbles: true,
        cancelable: true,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
        movementX: event.movementX,
        movementY: 0,
        buttons: event.buttons,
        button: event.button,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
        relatedTarget: event.relatedTarget,
      });
      target.dispatchEvent(synthetic);
    };

    container.addEventListener("mousemove", handleMouseMove, true);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove, true);
    };
  }, [isPointerLocked, isRunning]);

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
    <>
      {activeGame === "doom" ? (
        <p className="lead" style={{ color: "var(--text-primary)", textAlign: "center", marginBottom: "16px" }}>
          Yes, this website CAN run {activeGameLabel}!
        </p>
      ) : null}
      <EmulatorShell
        statusText={statusText}
        onStart={handleStart}
        isIdle={!hasClickedStart}
        showControls={showControls}
        controls={GAME_CONTROLS[activeGame]}
        onToggleControls={() => setShowControls((current) => !current)}
        showControlsOverlay={hasClickedStart}
      >
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
      </EmulatorShell>
      {isReady && activeGame === "doom" ? (
        <p className="emulator-instructions">
          When the main menu loads, press <span className="emulator-key">Enter</span> to start the game.
        </p>
      ) : null}
      <p className="emulator-hint">Tip: Click the game to focus input. Controls live in the top-right overlay.</p>
    </>
  );
};

export default JSDosEmulator;
