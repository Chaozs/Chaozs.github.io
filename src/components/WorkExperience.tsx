import React, { useState } from "react";

type WorkBoxProps = {
  title: string;
  logo: string;
  date: string;
  role: string;
  skills: string;
  details: string[];
  logoStyle?: React.CSSProperties;
};

const WorkBox: React.FC<WorkBoxProps> = ({ title, logo, date, role, skills, details, logoStyle }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

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
        <div className="work-content" style={{ backgroundColor: "#1E1E1E", marginTop: "15px"}}>
            <div className="row">
            <div className="col-sm-10">
                <div style={{ display: "flex", justifyContent: "left", marginLeft: "15px" }}>
                <img
                    src={logo}
                    alt="logo"
                    onClick={handleToggleClick}
                    style={{
                        width: "200px",
                        maxWidth: "200px",
                        height: "auto", // Maintain aspect ratio
                        marginBottom: "20px",
                        borderRadius: "2%",
                        marginLeft: "10px",
                        ...logoStyle,
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
                  <h2 className="w-title" style={{ fontSize: ".8rem", color: "#9A9A9A" }}>{date}</h2>
                  <h2 className="w-title" style={{color: "#E4E4E4"}}>{role}</h2>
                  <div className="w-more" style={{ marginLeft: "1rem", color: "#9A9A9A" }}>
                  <span>{skills}</span>
                  </div>
                  {showMore && (
                  <div className="extra-text" style={{ marginTop: "1rem", color: "#E4E4E4" }}>
                      {details.map((item: string, index: number) => (
                          <li key={index} style={{ marginBottom: "0.5rem", marginLeft: /^\s{3}/.test(item) ? "20px" : "0px" }}>
                              <p dangerouslySetInnerHTML={{ __html: item }} style={{ display: "inline"}}></p>
                          </li>
                      ))}
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
