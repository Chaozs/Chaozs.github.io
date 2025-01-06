import React, { useState } from "react";

const WorkBox = ({ title, date, role, skills, details }) => {
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
                <h2 className="w-title" style={{ fontSize: "1.5rem", color: "#E4E4E4" }}>{title}</h2>
                <h2 className="w-title" style={{ fontSize: ".8rem", color: "#9A9A9A" }}>{date}</h2>
                <h2 className="w-title" style={{color: "#E4E4E4"}}>{role}</h2>
                <div className="w-more" style={{ marginLeft: "1rem", color: "#9A9A9A" }}>
                <span>{skills}</span>
                </div>
                {showMore && (
                <div className="extra-text" style={{ marginTop: "1rem", color: "#E4E4E4" }}>
                    {details.map((item, index) => (
                        <li key={index} style={{ marginBottom: "0.5rem" }}>
                            {item}
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