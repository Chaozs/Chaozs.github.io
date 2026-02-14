import React from "react";
import type { ControlSection } from "./controls";

type ControlsOverlayProps = {
  sections: ControlSection[];
  showControls: boolean;
  onToggle: () => void;
};

const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  sections,
  showControls,
  onToggle,
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
      </>
    ) : null}
  </div>
);

export default ControlsOverlay;
