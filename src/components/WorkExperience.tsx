import React, { useEffect, useRef, useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import AppIcon from "./shared/AppIcon";
import SurfaceCard from "./shared/SurfaceCard";

const DECRYPT_HEADER_TEXT = "Decrypted Notes";
const SUMMARY_REVEAL_DURATION = 360;
const HIGHLIGHT_TYPE_INTERVAL = 2;

type WorkBoxProps = {
  title: string;
  logo?: string;
  date?: string;
  role?: string;
  categories: string;
  skills: string;
  summary?: string;
  highlights?: string[];
  details?: string[];
  logoStyle?: React.CSSProperties;
  iframeUrl?: string;
  eyebrow?: string;
  liveUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
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
  categories,
  skills,
  summary,
  highlights,
  details = [],
  logoStyle,
  iframeUrl,
  eyebrow,
  liveUrl,
  repoUrl,
  demoUrl,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isEmbedActivated, setIsEmbedActivated] = useState<boolean>(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [typedHighlightsText, setTypedHighlightsText] = useState("");
  const highlightsTimerRef = useRef<number | null>(null);
  const highlightTypeTimerRef = useRef<number | null>(null);
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
  const summaryText = summary ?? details[0] ?? "";
  const highlightItems = highlights ?? [];
  const highlightTerminalText = highlightItems
    .map((item, index) => `${(index + 1).toString().padStart(2, "0")} ${item}`)
    .join("\n");
  const typedHighlightLines = typedHighlightsText.length > 0
    ? typedHighlightsText.replace(/\n$/, "").split("\n")
    : [];
  const useStructuredDetails = Boolean(summary && highlights && highlights.length > 0);
  const detailBaseDelay = 70;
  const summaryStartDelay = detailBaseDelay + 50;
  const detailStartDelay = summaryStartDelay + SUMMARY_REVEAL_DURATION;
  const embedDelay = Math.min(
    detailStartDelay + 180 + ((useStructuredDetails ? highlightItems.length + 2 : details.length) * 45),
    1400,
  );
  const closeDossier = () => {
    setShowMore(false);
    setIsEmbedActivated(false);
  };

  useEffect(() => {
    if (highlightsTimerRef.current !== null) {
      window.clearTimeout(highlightsTimerRef.current);
      highlightsTimerRef.current = null;
    }
    if (highlightTypeTimerRef.current !== null) {
      window.clearTimeout(highlightTypeTimerRef.current);
      highlightTypeTimerRef.current = null;
    }

    if (!showMore) {
      setShowHighlights(false);
      setTypedHighlightsText("");
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setTypedHighlightsText(highlightTerminalText);
      setShowHighlights(true);
      return;
    }

    setShowHighlights(false);
    setTypedHighlightsText("");
    if (useStructuredDetails) {
      highlightsTimerRef.current = window.setTimeout(() => {
        setTypedHighlightsText("");
        setShowHighlights(true);
        highlightsTimerRef.current = null;
      }, summaryStartDelay);
    }

    return () => {
      if (highlightsTimerRef.current !== null) {
        window.clearTimeout(highlightsTimerRef.current);
        highlightsTimerRef.current = null;
      }
      if (highlightTypeTimerRef.current !== null) {
        window.clearTimeout(highlightTypeTimerRef.current);
        highlightTypeTimerRef.current = null;
      }
    };
  }, [highlightTerminalText, showMore, useStructuredDetails]);

  useEffect(() => {
    window.addEventListener("collapse-experiences", closeDossier);

    return () => {
      window.removeEventListener("collapse-experiences", closeDossier);
    };
  }, []);

  useEffect(() => {
    if (highlightTypeTimerRef.current !== null) {
      window.clearTimeout(highlightTypeTimerRef.current);
      highlightTypeTimerRef.current = null;
    }

    if (!showHighlights || !useStructuredDetails) {
      setTypedHighlightsText("");
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setTypedHighlightsText(highlightTerminalText);
      return;
    }

    setTypedHighlightsText("");
    let charIndex = 0;

    const typeNext = () => {
      if (charIndex >= highlightTerminalText.length) {
        highlightTypeTimerRef.current = null;
        return;
      }

      charIndex += 1;
      setTypedHighlightsText(highlightTerminalText.slice(0, charIndex));
      highlightTypeTimerRef.current = window.setTimeout(typeNext, HIGHLIGHT_TYPE_INTERVAL);
    };

    highlightTypeTimerRef.current = window.setTimeout(typeNext, 80);

    return () => {
      if (highlightTypeTimerRef.current !== null) {
        window.clearTimeout(highlightTypeTimerRef.current);
        highlightTypeTimerRef.current = null;
      }
    };
  }, [highlightTerminalText, showHighlights, useStructuredDetails]);

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

  const handleHeaderClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    handleToggle();
  };

  const handleEmbedLaunch = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setIsEmbedActivated(true);
  };

  const handleCardClick = (): void => {
    if (!showMore) {
      handleToggle();
    }
  };

  return (
    <article className="col-md-12 experience-entry">
      <div
        className={`work-box ${showMore ? "is-expanded" : "is-collapsed"}`}
        onClick={handleCardClick}
      >
        <SurfaceCard className="work-dossier">
          <div className="work-dossier__header" onClick={handleHeaderClick}>
            <div className="work-dossier__identity">
              <div className="work-dossier__eyebrow">{eyebrow ?? "Classified Dossier"}</div>
              <h2 className="work-dossier__title">{title}</h2>
              <div className="work-dossier__status-group work-dossier__status-group--inline">
                <span className={`work-status-chip ${showMore ? "work-status-chip--open" : "work-status-chip--locked"}`}>
                  {showMore ? "Decrypted" : "Restricted"}
                </span>
                {role && <span className="work-status-chip work-status-chip--role">{role}</span>}
                {date && <span className="work-date">{date}</span>}
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
            <>
            <div className="row work-dossier__body">
              <div className="col-sm-4 work-dossier__sidebar-col">
                <div className="work-dossier__sidebar">
                  {logo && (
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
                  )}
                  {!logo && (
                    <div className={`work-dossier__stamp work-dossier__stamp--sidebar${showMore ? " is-visible" : ""}`}>Access Granted</div>
                  )}
                  <div className="work-dossier__sidebar-meta">
                    {date && (
                      <div className="work-meta-row work-meta-row--sidebar">
                        <span className="work-meta-row__label">Period</span>
                        <span className="work-meta-row__value">{date}</span>
                      </div>
                    )}
                    {role && (
                      <div className="work-meta-row work-meta-row--sidebar">
                        <span className="work-meta-row__label">Role</span>
                        <span className="work-meta-row__value">{role}</span>
                      </div>
                    )}
                    <div className="work-meta-row work-meta-row--sidebar">
                      <span className="work-meta-row__label">Skills</span>
                      <span className="work-meta-row__value">{skills}</span>
                    </div>
                    <div className="work-meta-row work-meta-row--sidebar">
                      <span className="work-meta-row__label">Domain</span>
                      <span className="work-meta-row__value">{categories}</span>
                    </div>
                    {liveUrl && (
                      <div className="work-meta-row work-meta-row--sidebar">
                        <span className="work-meta-row__label">Live</span>
                        <span className="work-meta-row__value">
                          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="work-meta-link">Visit ↗</a>
                        </span>
                      </div>
                    )}
                    {repoUrl && (
                      <div className="work-meta-row work-meta-row--sidebar">
                        <span className="work-meta-row__label">Repo</span>
                        <span className="work-meta-row__value">
                          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="work-meta-link">View Repository ↗</a>
                        </span>
                      </div>
                    )}
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
                  <div className="work-dossier__details">
                    {logo && (
                      <div className={`work-dossier__stamp${showMore ? " is-visible" : ""}`}>Access Granted</div>
                    )}

                    <div className="work-decrypt-header work-detail-item" style={getDelayStyle(detailBaseDelay)}>
                      {DECRYPT_HEADER_TEXT}
                    </div>

                    {useStructuredDetails ? (
                      <>
                        <div
                          className="work-detail-item"
                          style={getDelayStyle(summaryStartDelay)}
                        >
                          <p className="work-detail-copy work-detail-copy--summary">
                            <span dangerouslySetInnerHTML={{ __html: summaryText }}></span>
                          </p>
                        </div>
                        {showHighlights ? (
                          <div
                            className="work-detail-item work-highlights-terminal"
                            style={getDelayStyle(0)}
                          >
                            <div className="work-highlights-terminal__header">
                              <span className="work-highlights-terminal__prompt" aria-hidden="true">
                                &gt;
                              </span>
                              <span className="work-highlights-terminal__title">Highlights.log</span>
                            </div>
                            <div className="work-highlights-terminal__body">
                              <div className="work-highlights-terminal__measure" aria-hidden="true">
                                {highlightItems.map((item, index) => {
                                  const lineIndex = (index + 1).toString().padStart(2, "0");

                                  return (
                                    <div key={`measure-${lineIndex}`} className="work-highlights-terminal__line">
                                      <span className="work-highlights-terminal__index">{lineIndex}</span>
                                      <span className="work-highlights-terminal__text">{item}</span>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="work-highlights-terminal__typed">
                                {highlightItems.map((item, index) => {
                                  const line = typedHighlightLines[index] ?? "";
                                  const match = line.match(/^(\d{2})\s?(.*)$/);
                                  const lineIndex = match?.[1] ?? (index + 1).toString().padStart(2, "0");
                                  const lineText = match?.[2] ?? "";
                                  const isLineVisible = index < typedHighlightLines.length;
                                  const isLastVisibleLine = index === typedHighlightLines.length - 1;
                                  const isTypingActive =
                                    typedHighlightsText.length > 0 &&
                                    typedHighlightsText.length < highlightTerminalText.length;

                                  return (
                                    <div
                                      key={`${lineIndex}-${index}`}
                                      className={`work-highlights-terminal__line${isLineVisible ? " is-visible" : ""}`}
                                      aria-hidden={!isLineVisible}
                                    >
                                      <span className="work-highlights-terminal__index">{lineIndex}</span>
                                      <span className="work-highlights-terminal__text">
                                        {isLineVisible ? lineText : item}
                                        {isTypingActive && isLastVisibleLine ? (
                                          <span className="work-highlights-terminal__cursor" aria-hidden="true"></span>
                                        ) : null}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ) : null}
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
                              ...getDelayStyle(Math.min((index === 0 ? summaryStartDelay : detailStartDelay + (index * 45)), 1400)),
                            }}
                          >
                            {index === 0 ? (
                              <p className="work-detail-copy work-detail-copy--summary">
                                <span dangerouslySetInnerHTML={{ __html: item }}></span>
                              </p>
                            ) : (
                              <p className="work-detail-copy" dangerouslySetInnerHTML={{ __html: item }}></p>
                            )}
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

                    {(!demoUrl || !!logo) && (
                      <div className="work-dossier__footer work-detail-item" style={getDelayStyle(Math.min(embedDelay + 80, 1480))}>
                        <button
                          type="button"
                          className="work-dossier__toggle work-dossier__toggle--footer"
                          onClick={handleToggleClick}
                          aria-label={`Collapse ${title} dossier`}
                        >
                          <span className="work-dossier__toggle-label">Seal File</span>
                          <span className="work-dossier__toggle-icon is-open" aria-hidden="true">
                            <AppIcon name="chevron-down" />
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {demoUrl && !logo && (
              <>
                <div className="row work-dossier__demo-row">
                  <div className="col-12">
                    <div className="work-dossier__demo work-dossier__demo--banner">
                      <img
                        src={demoUrl}
                        alt={`${title} demo`}
                        className="work-dossier__demo-gif"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="work-dossier__footer work-dossier__footer--fullwidth work-detail-item" style={getDelayStyle(Math.min(embedDelay + 80, 1480))}>
                      <button
                        type="button"
                        className="work-dossier__toggle work-dossier__toggle--footer"
                        onClick={handleToggleClick}
                        aria-label={`Collapse ${title} dossier`}
                      >
                        <span className="work-dossier__toggle-label">Seal File</span>
                        <span className="work-dossier__toggle-icon is-open" aria-hidden="true">
                          <AppIcon name="chevron-down" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            </>
          ) : null}
        </SurfaceCard>
      </div>
    </article>
  );
};

export default WorkBox;
