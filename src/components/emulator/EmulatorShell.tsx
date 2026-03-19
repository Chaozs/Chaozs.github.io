import React from "react";
import ControlsOverlay from "../js-dos/ControlsOverlay";
import type { ControlSection } from "../js-dos/controls";

type EmulatorShellProps = {
  statusText?: string;
  onStart?: () => void;
  isIdle?: boolean;
  isStarting?: boolean;
  isRunning?: boolean;
  showControls?: boolean;
  controls?: ControlSection[];
  onToggleControls?: () => void;
  showControlsOverlay?: boolean;
  showMobileNote?: boolean;
  mouseSensitivity?: number;
  onSensitivityChange?: (value: number) => void;
  children: React.ReactNode;
};

const EmulatorShell: React.FC<EmulatorShellProps> = ({
  statusText,
  onStart,
  isIdle,
  isStarting,
  isRunning,
  showControls,
  controls,
  onToggleControls,
  showControlsOverlay,
  showMobileNote = true,
  mouseSensitivity,
  onSensitivityChange,
  children,
}) => {
  const handleOverlayKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onStart) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onStart();
    }
  };

  return (
    <>
      <div
        className={`emulator-frame-wrap${isIdle ? " is-idle" : ""}${isStarting ? " is-starting" : ""}${isRunning ? " is-running" : ""}`}
        onClick={onStart}
      >
        {statusText ? (
          <div
            className={`emulator-start-overlay${isStarting ? " is-starting" : ""}`}
            role="button"
            tabIndex={0}
            onClick={onStart}
            onKeyDown={handleOverlayKeyDown}
            aria-label={statusText}
          >
            <div className="emulator-start-text" aria-live="polite">
              {statusText}
            </div>
          </div>
        ) : null}
        {children}
        {showControlsOverlay && controls && onToggleControls ? (
          <ControlsOverlay
            sections={controls}
            showControls={showControls ?? true}
            onToggle={onToggleControls}
            mouseSensitivity={mouseSensitivity}
            onSensitivityChange={onSensitivityChange}
          />
        ) : null}
      </div>
      {showMobileNote ? <p className="emulator-mobile-note">Mission controls only work on desktop.</p> : null}
    </>
  );
};

export default EmulatorShell;
