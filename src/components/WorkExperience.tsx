import React, { useMemo, useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import SurfaceCard from "./shared/SurfaceCard";

type WorkBoxProps = {
  title: string;
  logo: string;
  date: string;
  role: string;
  skills: string;
  details: string[];
  logoStyle?: React.CSSProperties;
  iframeUrl?: string;
};

const resolveDimension = (value?: React.CSSProperties["width"]): number | undefined => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
};

const getDossierCode = (title: string, date: string): string => {
  const initials = title
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();
  const years = date.match(/\d{4}/g) ?? [];
  const compactYears = years
    .slice(0, 2)
    .map((year) => year.slice(-2))
    .join("");

  return `${initials || "FILE"}-${compactYears || "XX"}`;
};

const WorkBox: React.FC<WorkBoxProps> = ({
  title,
  logo,
  date,
  role,
  skills,
  details,
  logoStyle,
  iframeUrl,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isEmbedActivated, setIsEmbedActivated] = useState<boolean>(false);
  const logoWidth = resolveDimension(logoStyle?.width) ?? 200;
  const logoHeight = resolveDimension(logoStyle?.height) ?? 120;
  const minLogoWidth = Math.min(140, Math.round(logoWidth * 0.6));
  const responsiveLogoWidth = `clamp(${minLogoWidth}px, 28vw, ${logoWidth}px)`;
  const logoAspectRatio = `${logoWidth} / ${logoHeight}`;
  const {
    width: _logoWidth,
    height: _logoHeight,
    marginLeft: _logoMarginLeft,
    marginRight: _logoMarginRight,
    marginTop: _logoMarginTop,
    marginBottom: _logoMarginBottom,
    ...logoStyleRest
  } = logoStyle ?? {};
  const dossierCode = useMemo(() => getDossierCode(title, date), [title, date]);

  const metadataRows = [
    { label: "File", value: dossierCode },
    { label: "Period", value: date },
    { label: "Role", value: role },
    { label: "Stack", value: skills },
  ];

  const handleToggle = (): void => {
    setShowMore((prevState) => {
      const nextState = !prevState;
      if (!nextState) {
        setIsEmbedActivated(false);
      }
      return nextState;
    });
  };

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    handleToggle();
  };

  const handleEmbedLaunch = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setIsEmbedActivated(true);
  };

  return (
    <article className="col-md-12 experience-entry">
      <div
        className={`work-box ${showMore ? "is-expanded" : "is-collapsed"}`}
        onClick={handleToggle}
      >
        <SurfaceCard className="work-dossier">
          <div className="work-dossier__header">
            <div className="work-dossier__identity">
              <div className="work-dossier__eyebrow">Classified Dossier</div>
              <h2 className="work-dossier__title">{title}</h2>
              <div className="work-dossier__status-group work-dossier__status-group--inline">
                <span className={`work-status-chip ${showMore ? "work-status-chip--open" : "work-status-chip--locked"}`}>
                  {showMore ? "Decrypted" : "Restricted"}
                </span>
                <span className="work-status-chip work-status-chip--code">{dossierCode}</span>
              </div>
            </div>
            <button
              type="button"
              className="work-dossier__toggle"
              onClick={handleToggleClick}
              aria-expanded={showMore}
              aria-label={showMore ? `Collapse ${title} dossier` : `Expand ${title} dossier`}
            >
              <span className="work-dossier__toggle-label">{showMore ? "Seal File" : "Open File"}</span>
              <span className={`work-dossier__toggle-icon ${showMore ? "is-open" : ""}`} aria-hidden="true">
                <span className="ion-ios-arrow-down"></span>
              </span>
            </button>
          </div>

          <div className="row work-dossier__body">
            <div className="col-sm-4">
              <div className="work-dossier__media" onClick={handleToggleClick}>
                <ImageWithSkeleton
                  src={logo}
                  alt={`${title} logo`}
                  style={{
                    width: responsiveLogoWidth,
                    maxWidth: "100%",
                    aspectRatio: logoAspectRatio,
                  }}
                  imgStyle={{
                    marginBottom: "0",
                    borderRadius: "var(--radius-md)",
                    marginLeft: "0",
                    ...logoStyleRest,
                  }}
                />
              </div>
            </div>
            <div className="col-sm-8">
              <div
                className="work-text"
                onClick={(event) => {
                  if (showMore) {
                    event.stopPropagation();
                  }
                }}
              >
                <div className="work-dossier__lead-row">
                  <span className="work-date">{date}</span>
                  <span className="work-dossier__role">{role}</span>
                </div>
                <div className="work-dossier__skills">
                  <span>{skills}</span>
                </div>

                <div className="extra-text">
                  <div className={`work-dossier__stamp${showMore ? " is-visible" : ""}`}>Access Granted</div>

                  <div className="work-meta-grid">
                    {metadataRows.map((row, index) => (
                      <div
                        key={row.label}
                        className="work-meta-row work-detail-item"
                        style={{ transitionDelay: `${Math.min(index * 55, 180)}ms` }}
                      >
                        <span className="work-meta-row__label">{row.label}</span>
                        <span className="work-meta-row__value">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="work-decrypt-header work-detail-item" style={{ transitionDelay: `${Math.min(metadataRows.length * 55, 220)}ms` }}>
                    Decrypted Notes
                  </div>

                  <ul className="work-detail-list">
                    {details.map((item: string, index: number) => (
                      <li
                        key={index}
                        className="work-detail-item"
                        style={{
                          marginBottom: "0.5rem",
                          marginLeft: /^\s{3}/.test(item) ? "20px" : "0px",
                          transitionDelay: `${Math.min((index + metadataRows.length + 1) * 45, 420)}ms`,
                        }}
                      >
                        <p className="work-detail-copy" dangerouslySetInnerHTML={{ __html: item }}></p>
                      </li>
                    ))}
                  </ul>

                  {showMore && iframeUrl ? (
                    <div className="work-embed work-detail-item" style={{ transitionDelay: `${Math.min((details.length + metadataRows.length + 2) * 45, 520)}ms` }}>
                      <div className="work-embed-label">Field Footage: skillfite.io</div>
                      {isEmbedActivated ? (
                        <iframe
                          src={iframeUrl}
                          title={`${title} demo`}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        ></iframe>
                      ) : (
                        <button
                          type="button"
                          className="work-embed__launcher"
                          onClick={handleEmbedLaunch}
                          aria-label={`Load ${title} live demo`}
                        >
                          <span className="work-embed__launcher-title">Launch Field Footage</span>
                          <span className="work-embed__launcher-copy">Click to load skillfite.io inside the dossier.</span>
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </SurfaceCard>
      </div>
    </article>
  );
};

export default WorkBox;
