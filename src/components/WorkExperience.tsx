import React, { useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";

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

const WorkBox: React.FC<WorkBoxProps> = ({ title, logo, date, role, skills, details, logoStyle, iframeUrl }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const logoWidth = resolveDimension(logoStyle?.width) ?? 200;
  const logoHeight = resolveDimension(logoStyle?.height) ?? 120;
  const minLogoWidth = Math.min(140, Math.round(logoWidth * 0.6));
  const responsiveLogoWidth = `clamp(${minLogoWidth}px, 28vw, ${logoWidth}px)`;
  const logoAspectRatio = `${logoWidth} / ${logoHeight}`;
  const { width: _logoWidth, height: _logoHeight, ...logoStyleRest } = logoStyle ?? {};

  const handleIconClick = (): void => {
    setShowMore((prevState) => !prevState);
  };

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    handleIconClick();
  };

  const handleContainerClick = (): void => {
    handleIconClick();
  };

  return (
    <div className="col-md-12" onClick={handleContainerClick} style={{ cursor: "pointer", marginBottom: "-35px"}}>
        <div className={`work-box ${showMore ? "is-expanded" : "is-collapsed"}`}>
        <div className="work-content" style={{ backgroundColor: "var(--surface-2)", marginTop: "15px"}}>
            <div className="row">
            <div className="col-sm-10">
                <div style={{ display: "flex", justifyContent: "left", marginLeft: "15px" }}>
                <ImageWithSkeleton
                    src={logo}
                    alt="logo"
                    onClick={handleToggleClick}
                    style={{
                        width: responsiveLogoWidth,
                        maxWidth: "100%",
                        aspectRatio: logoAspectRatio,
                    }}
                    imgStyle={{
                        marginBottom: "20px",
                        borderRadius: "2%",
                        marginLeft: "10px",
                        ...logoStyleRest,
                    }}
                />
                </div>
                <div
                  className="work-text"
                  onClick={(event) => {
                    if (showMore) {
                      event.stopPropagation();
                    }
                  }}
                >
                  {/* <h2 className="w-title" style={{ fontSize: "1.5rem", color: "#E4E4E4" }}>{title}</h2> */}
                  <h2 className="w-title" style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>{date}</h2>
                  <h2 className="w-title" style={{color: "var(--text-primary)"}}>{role}</h2>
                  <div className="w-more" style={{ marginLeft: "1rem", color: "var(--text-muted)" }}>
                  <span>{skills}</span>
                  </div>
                  {showMore && (
                  <div className="extra-text" style={{ marginTop: "1rem", color: "var(--text-primary)" }}>
                      {details.map((item: string, index: number) => (
                          <li key={index} style={{ marginBottom: "0.5rem", marginLeft: /^\s{3}/.test(item) ? "20px" : "0px" }}>
                              <p dangerouslySetInnerHTML={{ __html: item }} style={{ display: "inline"}}></p>
                          </li>
                      ))}
                      {iframeUrl ? (
                        <div className="work-embed">
                          <div className="work-embed-label">Iframe of skillfite.io</div>
                          <iframe
                            src={iframeUrl}
                            title={`${title} demo`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          ></iframe>
                        </div>
                      ) : null}
                  </div>
                  )}
                </div>
            </div>
            <div className="col-sm-2">
                <div className="w-like" onClick={handleToggleClick}>
                {!showMore ? <span className="ion-ios-arrow-down"></span> : <span className="ion-ios-arrow-up"></span>}
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default WorkBox;
