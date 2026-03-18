import React, { useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import AppIcon from "./shared/AppIcon";
import SurfaceCard from "./shared/SurfaceCard";

type WorkBoxProps = {
  title: string;
  logo: string;
  date: string;
  role: string;
  skills: string;
  summary?: string;
  highlights?: string[];
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

const getDelayStyle = (delay: number): React.CSSProperties => ({
  transitionDelay: `${delay}ms`,
});

const WorkBox: React.FC<WorkBoxProps> = ({
  title,
  logo,
  date,
  role,
  skills,
  summary,
  highlights,
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
  const summaryText = summary ?? details[0];
  const highlightItems = highlights ?? [];
  const useStructuredDetails = Boolean(summary && highlights && highlights.length > 0);
  const detailBaseDelay = 70;
  const embedDelay = Math.min(
    detailBaseDelay + 180 + ((useStructuredDetails ? highlightItems.length + 2 : details.length) * 45),
    520,
  );

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
                <span className="work-date">{date}</span>
                <span className="work-status-chip work-status-chip--role">{role}</span>
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
                <AppIcon name="chevron-down" />
              </span>
            </button>
          </div>

          {showMore ? (
            <div className="row work-dossier__body">
              <div className="col-sm-4 work-dossier__sidebar-col">
                <div className="work-dossier__sidebar" onClick={handleToggleClick}>
                  <div className="work-dossier__media">
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
                  <div className="work-dossier__sidebar-meta">
                    <div className="work-meta-row work-meta-row--sidebar">
                      <span className="work-meta-row__label">Period</span>
                      <span className="work-meta-row__value">{date}</span>
                    </div>
                    <div className="work-meta-row work-meta-row--sidebar">
                      <span className="work-meta-row__label">Role</span>
                      <span className="work-meta-row__value">{role}</span>
                    </div>
                    <div className="work-meta-row work-meta-row--sidebar">
                      <span className="work-meta-row__label">Skills</span>
                      <span className="work-meta-row__value">{skills}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-8 work-dossier__main-col">
                <div
                  className="work-text"
                  onClick={(event) => {
                    if (showMore) {
                      event.stopPropagation();
                    }
                  }}
                >
                  <div className="extra-text">
                    <div className={`work-dossier__stamp${showMore ? " is-visible" : ""}`}>Access Granted</div>

                    <div className="work-decrypt-header work-detail-item" style={getDelayStyle(detailBaseDelay)}>
                      Decrypted Notes
                    </div>

                    {useStructuredDetails ? (
                      <>
                        <div
                          className="work-detail-item"
                          style={getDelayStyle(detailBaseDelay + 50)}
                        >
                          <p className="work-detail-copy work-detail-copy--summary" dangerouslySetInnerHTML={{ __html: summaryText }}></p>
                        </div>
                        <div
                          className="work-detail-item work-detail-highlights"
                          style={getDelayStyle(detailBaseDelay + 100)}
                        >
                          Highlights:
                        </div>
                        <ul className="work-detail-list work-detail-list--highlights">
                          {highlightItems.map((item: string, index: number) => (
                            <li
                              key={index}
                              className="work-detail-item work-detail-item--highlight"
                              style={{
                                marginBottom: "0.5rem",
                                ...getDelayStyle(Math.min(detailBaseDelay + 150 + (index * 45), 420)),
                              }}
                            >
                              <p className="work-detail-copy" dangerouslySetInnerHTML={{ __html: item }}></p>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <ul className="work-detail-list">
                        {details.map((item: string, index: number) => (
                          <li
                            key={index}
                            className="work-detail-item"
                            style={{
                              marginBottom: "0.5rem",
                              marginLeft: /^\s{3}/.test(item) ? "20px" : "0px",
                              ...getDelayStyle(Math.min(detailBaseDelay + 50 + (index * 45), 420)),
                            }}
                          >
                            <p className="work-detail-copy" dangerouslySetInnerHTML={{ __html: item }}></p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {iframeUrl ? (
                      <div className="work-embed work-detail-item" style={getDelayStyle(embedDelay)}>
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
          ) : null}
        </SurfaceCard>
      </div>
    </article>
  );
};

export default WorkBox;
