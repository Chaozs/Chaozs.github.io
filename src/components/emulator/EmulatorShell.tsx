import React from "react";
import ControlsOverlay from "../js-dos/ControlsOverlay";
import type { ControlSection } from "../js-dos/controls";

type EmulatorShellProps = {
  statusText?: string;
  onStart?: () => void;
  isIdle?: boolean;
  showControls?: boolean;
  controls?: ControlSection[];
  onToggleControls?: () => void;
  showControlsOverlay?: boolean;
  showMobileNote?: boolean;
  children: React.ReactNode;
};

const EmulatorShell: React.FC<EmulatorShellProps> = ({
  statusText,
  onStart,
  isIdle,
  showControls,
  controls,
  onToggleControls,
  showControlsOverlay,
  showMobileNote = true,
  children,
}) => (
  <>
    <div className={`emulator-frame-wrap${isIdle ? " is-idle" : ""}`} onClick={onStart}>
      {statusText ? (
        <div className="emulator-start-overlay" role="button" tabIndex={0} onClick={onStart}>
          <div className="emulator-start-text">{statusText}</div>
        </div>
      ) : null}
      {children}
      {showControlsOverlay && controls && onToggleControls ? (
        <ControlsOverlay
          sections={controls}
          showControls={showControls ?? true}
          onToggle={onToggleControls}
        />
      ) : null}
    </div>
    {showMobileNote ? <p className="emulator-mobile-note">Controls only work on desktop.</p> : null}
  </>
);

export default EmulatorShell;
