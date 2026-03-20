import React, { useEffect, useRef, useState } from "react";
import { ARCHIVE_VERSIONS } from "../archiveVersions";
import AppIcon from "./shared/AppIcon";

type Props = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

const VersionPicker: React.FC<Props> = ({ variant = "desktop", onNavigate }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (ARCHIVE_VERSIONS.length === 0) return null;

  if (variant === "mobile") {
    return (
      <>
        {ARCHIVE_VERSIONS.map((v) => (
          <a
            key={v.id}
            className="nav-link nav-mobile-action nav-mobile-action--archive"
            href={`/archive/${v.id}/`}
            onClick={onNavigate}
          >
            <span className="nav-mobile-action__icon" aria-hidden="true">
              <AppIcon name="history" />
            </span>
            <span className="nav-mobile-action__label">
              {v.label}
              {v.date ? <span className="nav-mobile-action__badge">{v.date}</span> : null}
            </span>
          </a>
        ))}
      </>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`version-picker${open ? " is-open" : ""}`}
    >
      <button
        type="button"
        className="version-picker__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="View a previous version of this site"
        title="View a previous version"
      >
        <AppIcon name="history" className="version-picker__icon" />
        <span className="version-picker__label">Versions</span>
        <AppIcon name="chevron-down" className="version-picker__chevron" />
      </button>
      {open && (
        <ul
          className="version-picker__menu"
          role="listbox"
          aria-label="Site versions"
        >
          <li className="version-picker__heading" role="presentation">
            Past versions
          </li>
          {ARCHIVE_VERSIONS.map((v) => (
            <li key={v.id} role="option" aria-selected={false}>
              <a
                className="version-picker__item"
                href={`/archive/${v.id}/`}
                onClick={() => setOpen(false)}
              >
                <span className="version-picker__item-label">{v.label}</span>
                {v.date && (
                  <span className="version-picker__item-date">{v.date}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VersionPicker;
