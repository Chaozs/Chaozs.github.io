import React, { useState } from "react";

const WorkBox = ({ title, logo, date, role, skills, details }) => {
  const [showMore, setShowMore] = useState(false);

  const handleIconClick = () => {
    setShowMore((prevState) => !prevState);
  };

  return (
    <div className="col-md-12" onClick={handleIconClick} style={{ cursor: "pointer", marginBottom: "-35px"}}>
        <div className="work-box">
        <div className="work-content" style={{ backgroundColor: "#1E1E1E", marginTop: "15px"}}>
            <div className="row">
            <div className="col-sm-10">
                <div style={{ display: "flex", justifyContent: "left" }}>
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        maxWidth: "200px",
                        height: "auto", // Maintain aspect ratio
                        marginBottom: "20px",
                        borderRadius: "2%",
                        marginLeft: "-15px",
                    }}
                />
                </div>
                {/* <h2 className="w-title" style={{ fontSize: "1.5rem", color: "#E4E4E4" }}>{title}</h2> */}
                <h2 className="w-title" style={{ fontSize: ".8rem", color: "#9A9A9A" }}>{date}</h2>
                <h2 className="w-title" style={{color: "#E4E4E4"}}>{role}</h2>
                <div className="w-more" style={{ marginLeft: "1rem", color: "#9A9A9A" }}>
                <span>{skills}</span>
                </div>
                {showMore && (
                <div className="extra-text" style={{ marginTop: "1rem", color: "#E4E4E4" }}>
                    {details.map((item, index) => (
                        <li key={index} style={{ marginBottom: "0.5rem", marginLeft: /^\s{3}/.test(item) ? "20px" : "0px" }}>
                            <p dangerouslySetInnerHTML={{ __html: item.replace('-', '') }} style={{ display: "inline"}}></p>
                        </li>
                    ))}
                </div>
                )}
            </div>
            <div className="col-sm-2">
                <div className="w-like">
                {!showMore ? <span className="ion-ios-plus-outline"></span> : <span className="ion-ios-minus-outline"> </span>}
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default WorkBox;