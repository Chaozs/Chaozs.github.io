import React from "react";
import type { ControlSection } from "./controls";

type ControlsOverlayProps = {
  sections: ControlSection[];
  showControls: boolean;
  onToggle: () => void;
  mouseSensitivity?: number;
  onSensitivityChange?: (value: number) => void;
};

const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  sections,
  showControls,
  onToggle,
  mouseSensitivity,
  onSensitivityChange,
}) => (
  <div className={`emulator-controls emulator-controls-overlay${showControls ? "" : " is-collapsed"}`}>
    <div className="emulator-controls-header">
      <div className="emulator-controls-title">Controls</div>
      <button type="button" className="emulator-controls-toggle" onClick={onToggle}>
        {showControls ? "Hide" : "Show"}
      </button>
    </div>
    {showControls ? (
      <>
        {sections.map((section, sectionIndex) => (
          <React.Fragment key={`controls-section-${sectionIndex}`}>
            {section.title ? (
              <div className="emulator-controls-subtitle">{section.title}</div>
            ) : null}
            <ul className="emulator-controls-list">
              {section.items.map((item) => (
                <li key={`${item.key}-${item.label}`}>
                  <span className="emulator-key">{item.key}</span> {item.label}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
        {mouseSensitivity !== undefined && onSensitivityChange ? (
          <div className="emulator-sensitivity">
            <div className="emulator-sensitivity__header">
              <span className="emulator-sensitivity__label">Mouse Sens.</span>
              <span className="emulator-sensitivity__value">{mouseSensitivity.toFixed(2)}</span>
            </div>
            <input
              type="range"
              className="emulator-sensitivity__slider"
              min={0.1}
              max={2.0}
              step={0.05}
              value={mouseSensitivity}
              onChange={(e) => onSensitivityChange(parseFloat(e.target.value))}
            />
          </div>
        ) : null}
      </>
    ) : null}
  </div>
);

export default ControlsOverlay;
