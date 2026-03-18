import React from "react";

type SectionHeaderProps = {
  command: string;
  className?: string;
  padding?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ command, className, padding }) => {
  return (
    <header
      className={`terminal-section-header${className ? ` ${className}` : ""}`}
      style={padding ? { padding } : undefined}
    >
      <div className="terminal-section-header__command">
        <span className="terminal-section-header__prompt" aria-hidden="true">
          &gt;
        </span>
        <span className="terminal-section-header__command-line" aria-label={command}>
          <span className="terminal-section-header__value">
            {command}
          </span>
          <span className="terminal-section-header__caret" aria-hidden="true"></span>
        </span>
      </div>
    </header>
  );
};

export default SectionHeader;
