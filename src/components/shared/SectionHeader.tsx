import React, { useRef } from "react";

type SectionHeaderProps = {
  command: string;
  className?: string;
  padding?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ command, className, padding }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <header
      className={`terminal-section-header${className ? ` ${className}` : ""}`}
      style={padding ? { padding } : undefined}
    >
      <div
        className="terminal-section-header__command"
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <span className="terminal-section-header__prompt" aria-hidden="true">
          &gt;
        </span>
        <span className="terminal-section-header__input-shell">
          <span className="terminal-section-header__measure" aria-hidden="true">
            {command}
          </span>
          <input
            ref={inputRef}
            className="terminal-section-header__input"
            type="text"
            value={command}
            readOnly
            spellCheck={false}
            aria-label={command}
          />
        </span>
        <span className="terminal-section-header__caret" aria-hidden="true"></span>
      </div>
    </header>
  );
};

export default SectionHeader;
